export function bytesToMegabytes(bytes: number): number {
	return Math.ceil(bytes / (1024 * 1024));
}

export function megabytesToBytes(megabytes: number): number {
	return megabytes * 1024 * 1024;
}

export function gigabytesToMegabytes(gigabytes: number): number {
	return gigabytes * 1024;
}
