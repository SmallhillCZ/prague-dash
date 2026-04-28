export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Pick keys from an object
 */
export function pick<T extends {}, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
	const copy: any = {};

	for (const key of keys) {
		copy[key] = obj[key];
	}

	return copy as Pick<T, K>;
}

/**
 * Omit keys from an object
 */
export function omit<T extends {}, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	const copy: any = { ...obj };

	for (const key of keys) {
		delete copy[key];
	}

	return copy as Omit<T, K>;
}

/**
 * Deep clone an object
 */
export function clone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
