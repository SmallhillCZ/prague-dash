import { Readable } from "stream";

export function streamToString(stream: Readable) {
	return new Promise<string>((resolve, reject) => {
		let data = "";
		stream.on("data", (chunk) => (data += chunk));
		stream.on("end", () => resolve(data));
		stream.on("error", (err) => reject(err));
	});
}
