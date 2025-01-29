import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { FeatureCollection } from "./geojson";

export function FeatureType<T>(model: Type<T>) {
  class Geometry {
    @ApiProperty({ type: "string", enum: ["Point"] }) type!: "Point";
    @ApiProperty({ type: "number", isArray: true, maxLength: 2, minLength: 2 }) coordinates!: [number, number];
  }

  class FeatureClass {
    @ApiProperty({ type: "string", enum: ["Feature"] }) type!: "Feature";
    @ApiProperty({ type: Geometry }) geometry!: Geometry;
    @ApiProperty({ type: model }) properties!: T;
  }

  Object.defineProperty(FeatureClass, "name", {
    value: `${model.name}Feature`,
  });

  return FeatureClass;
}

export function FeatureCollectionType<T>(model: Type<T>) {
  class FeatureCollectionClass<T> {
    @ApiProperty({ type: "string", enum: ["FeatureCollection"] }) type!: "FeatureCollection";
    @ApiProperty({ type: FeatureType(model), isArray: true }) features!: FeatureCollection<T>[];
  }

  Object.defineProperty(FeatureCollectionClass, "name", {
    value: `${model.name}FeatureCollection`,
  });

  return FeatureCollectionClass;
}
