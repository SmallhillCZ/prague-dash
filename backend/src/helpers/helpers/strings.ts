/**
 * Normalize a path prefix by ensuring it starts with a leading slash and has no trailing slash.
 * Empty or undefined paths return an empty string without slashes.
 */
export function normalizePathPrefix(path?: string) {
	if (!path) return "";

	return path
		?.replace(/\/$/, "") // remove trailing slash
		?.replace(/^([^\/])/, "/$1"); // ensure leading slash
}
