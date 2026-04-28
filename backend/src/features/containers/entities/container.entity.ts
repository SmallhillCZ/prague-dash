import { Column, Entity, OneToMany, PrimaryColumn, VirtualColumn } from "typeorm";
import { ContainerType } from "./container-type.entity";

@Entity()
export class Container {
  @PrimaryColumn("varchar") id!: string;

  @Column("text") location!: string;

  @Column("varchar", { nullable: true }) district?: string | null;

  @Column("geometry", {
    nullable: true,
    spatialFeatureType: "Point",
    srid: 4326,
  })
  geom?: string | null;

  @VirtualColumn({
    type: "double precision",
    query: (alias) => `ST_Y(${alias}."geom"::geometry)`,
  })
  lat?: number | null;

  @VirtualColumn({
    type: "double precision",
    query: (alias) => `ST_X(${alias}."geom"::geometry)`,
  })
  lon?: number | null;

  @Column("smallint", { nullable: true }) accessibility?: number;

  @OneToMany(() => ContainerType, (type) => type.container)
  containerTypes?: ContainerType[];
}
