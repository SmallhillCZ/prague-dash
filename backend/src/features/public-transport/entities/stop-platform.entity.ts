import { Column, Entity, ManyToOne, PrimaryColumn, VirtualColumn } from "typeorm";
import { Stop } from "./stop.entity";

@Entity()
export class StopPlatform {
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => Stop, (stop) => stop.platforms, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  stop!: Stop;

  @Column({ nullable: true })
  name!: string;

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
  })
  geom!: string;

  @VirtualColumn({
    type: "double precision",
    query: (alias) => `ST_Y(${alias}."geom"::geometry)`,
  })
  lat?: number;

  @VirtualColumn({
    type: "double precision",
    query: (alias) => `ST_X(${alias}."geom"::geometry)`,
  })
  lon?: number;
}
