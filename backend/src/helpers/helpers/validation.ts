import { applyDecorators, ValidationError } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function OneOfIsNotEmpty(
	properties: string[],
	params: { validateNotEmpty?: (value: any) => boolean } = {},
	validationOptions?: ValidationOptions,
) {
	const validateNotEmpty = params.validateNotEmpty || ((value: any) => value !== undefined);

	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: "oneOfIsNotEmpty",
			target: object.constructor,
			propertyName: propertyName,
			constraints: properties,
			options: {
				message: `${propertyName} must have exactly one of ${properties.join(", ")}`,
				...validationOptions,
			},
			validator: {
				validate: (value: any, args: ValidationArguments) => {
					if (!value) return false;
					return args.constraints.filter((property) => validateNotEmpty(value[property])).length === 1;
				},
			},
		});
	};
}

export function TransformBoolean(truthyValues: string[] = ["true", "1"]) {
	return applyDecorators(
		Type(() => String),
		Transform(({ value }) => {
			return truthyValues.includes(value);
		}),
	);
}

export function TransformArray(options: { split?: string } = {}) {
	return applyDecorators(
		Type(() => String),
		Transform(({ value }) => {
			if (Array.isArray(value)) return value;

			if (typeof value === "string") {
				if (options.split) return value.split(options.split);
				else return [value];
			}

			return value;
		}),
	);
}

export class ValidationErrorDto implements ValidationError {
	@ApiProperty() property!: string;
	@ApiPropertyOptional() value?: any;
	@ApiPropertyOptional() constraints?: any;
}
