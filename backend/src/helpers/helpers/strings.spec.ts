import { normalizePathPrefix } from "./strings";

describe("normalizePathPrefix", () => {
	it("should return empty string for undefined", () => {
		expect(normalizePathPrefix(undefined)).toBe("");
	});

	it("should return empty string for empty string", () => {
		expect(normalizePathPrefix("")).toBe("");
	});

	it("should return empty string for slash only", () => {
		expect(normalizePathPrefix("/")).toBe("");
	});

	it("should add leading slash if missing", () => {
		expect(normalizePathPrefix("api")).toBe("/api");
	});

	it("should remove trailing slash if present", () => {
		expect(normalizePathPrefix("/api/")).toBe("/api");
	});

	it("should handle both leading and trailing slashes", () => {
		expect(normalizePathPrefix("api/")).toBe("/api");
	});

	it("should return path unchanged if it has leading slash and no trailing slash", () => {
		expect(normalizePathPrefix("/api")).toBe("/api");
	});
});
