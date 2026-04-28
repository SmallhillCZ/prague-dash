import { existsSync } from "fs";
import * as path from "path";

export function envLookup(options: { fileName?: string; rootDir?: string; debug?: boolean } = {}) {
	const envFiles: string[] = [];
	const envFilename = options.fileName ?? ".env";
	const rootDir = options.rootDir ? path.resolve(options.rootDir) : null;
	let currentDir = process.cwd();

	while (true) {
		const envPath = path.join(currentDir, envFilename);

		// add file to list if it exists
		if (existsSync(envPath)) envFiles.push(envPath);

		// Reached the root directory
		if (rootDir && rootDir === currentDir) break;

		// Reached filesystem root
		if (currentDir === path.parse(currentDir).root) break;

		currentDir = path.dirname(currentDir);
	}

	envFiles.reverse(); // Load from root to current directory

	if (options.debug) {
		console.debug("envLookup found the following .env files (in load order):");
		envFiles.forEach((file) => console.debug(`- ${file}`));
	}

	return envFiles;
}
