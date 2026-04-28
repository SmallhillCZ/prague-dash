import { DataSource, QueryFailedError, QueryRunner } from "typeorm";

// FIXME:
// watch for better way of cancelling query https://github.com/brianc/node-postgres/issues/2774
export async function runWithAbortableConnection<R>(
	dataSource: DataSource,
	abortSignal: AbortSignal | undefined,
	query: (queryRunner: QueryRunner) => Promise<R>,
): Promise<R | null> {
	// Creates a query runner used for perform queries on a single database connection.
	const queryRunner = dataSource.createQueryRunner();

	// get connection id of the query runner here, later runner will be blocked with query
	const connectionId = await queryRunner
		.query("SELECT pg_backend_pid() AS connection_pid")
		.then((res: [{ connection_pid: number }]) => res[0].connection_pid);

	let queryTermination: Promise<void> | null = null;

	// create listener function so that we can call removeEventListener later
	const queryTerminatorListener = () => {
		queryTermination = terminateActiveQuery(connectionId, dataSource);
	};

	if (abortSignal) abortSignal.addEventListener("abort", queryTerminatorListener);

	try {
		// run the provided query function
		// `await` to catch query errors here
		return await query(queryRunner);
	} catch (error) {
		if (error instanceof QueryFailedError && error.message.includes("canceling statement due to user request")) {
			return null;
		} else {
			throw error;
		}
	} finally {
		// remove listener, so that it does not affect next queries on this connection
		if (abortSignal) abortSignal.removeEventListener("abort", queryTerminatorListener);

		// run in next tick to allow response to be sent first
		process.nextTick(async () => {
			// await query termination to complete, otherwise it may terminate next query on the same connection
			// note: TypeScript is not able to infer that queryTermination may be Promise
			if (queryTermination) await queryTermination;

			// release the connection when everything is done
			await queryRunner.release();
		});
	}
}

export async function terminateActiveQuery(connectionId: number, dataSource: DataSource) {
	// get another connection as the current is busy running the query to be aborted
	const terminatorQueryRunner = dataSource.createQueryRunner();

	// cancel active query on the original connection
	await terminatorQueryRunner.query(`SELECT pg_cancel_backend(${connectionId})`);

	// release terminator connection
	await terminatorQueryRunner.release();
}
