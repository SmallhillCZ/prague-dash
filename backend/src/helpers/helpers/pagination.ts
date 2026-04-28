import { Type } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, Min } from "class-validator";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

/**
 * Create a paginated response class for type T
 * @param type
 * @returns
 */
export function PaginatedResponse<T>(type: Type<T>) {
	class PaginatedResponse {
		@ApiProperty({ type, isArray: true }) data!: T[];
		@ApiProperty({ type: PaginatedMetadata }) metadata!: PaginatedMetadata;
	}

	Object.defineProperty(PaginatedResponse, "name", { value: `PaginatedResponse<${type.name}>` });

	return PaginatedResponse;
}

export enum SortOrder {
	ASC = "ASC",
	DESC = "DESC",
}

export class PaginatedMetadata {
	@ApiProperty() total!: number;
	@ApiPropertyOptional() limit?: number;
	@ApiPropertyOptional() cursorField?: string;
	@ApiPropertyOptional() cursorValue?: string;
	@ApiPropertyOptional({ enum: SortOrder }) cursorOrder?: "ASC" | "DESC";
}

/**
 * Paginated response type for type T
 */
export type PaginatedResponse<T> = InstanceType<ReturnType<typeof PaginatedResponse<T>>>;

/**
 * Create a paginated response from a result tuple obtained from Repository.findAndCount() or SelectQueryBuilder.getManyAndCount()
 */
export function paginatedResponse<T>(result: [T[], number]): PaginatedResponse<T> {
	return {
		data: result[0],
		metadata: {
			total: result[1],
		},
	};
}

/**
 * Pagination options for URL query
 */
export class PaginationQuery {
	@ApiPropertyOptional({ default: 100, minimum: 1, maximum: 1000 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(1000)
	limit?: number = 100;

	@ApiPropertyOptional({ default: 0, minimum: 0 })
	@IsOptional()
	@IsInt()
	@Min(0)
	offset?: number = 0;
}

export interface PaginationOptions {
	limit?: number;
	offset?: number;
}

/**
 * Apply pagination options to the main entity in a SelectQueryBuilder instance
 */
export function applyPagination<E extends ObjectLiteral>(query: SelectQueryBuilder<E>, options: PaginationOptions) {
	if (options.limit) query.take(options.limit);
	if (options.offset) query.skip(options.offset);
}
