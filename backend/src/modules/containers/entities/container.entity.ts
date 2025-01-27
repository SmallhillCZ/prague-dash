import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ContainerType } from "./container-type.entity";

@Entity()
export class Container {
  @PrimaryColumn("varchar") id!: string;

  @Column("varchar") district?: string;
  @Column("numeric", { nullable: true }) lon?: number | null;
  @Column("numeric", { nullable: true }) lat?: number | null;

  @Column("text") location!: string;

  @Column("smallint") accessibility?: number;

  @OneToMany(() => ContainerType, (type) => type.container)
  containerTypes?: ContainerType[];
}
