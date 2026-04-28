import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ContainerType } from "./container-type.entity";
import { Container } from "./container.entity";

@Entity()
export class ContainerLog {
  @PrimaryColumn({ type: "timestamptz" }) timestamp!: Date;
  @PrimaryColumn({}) containerTypeId!: string;

  @Column() containerId!: string;
  @Column() type!: number;

  @Column({
    nullable: true,
    type: "numeric",
    precision: 3,
    scale: 2,
    transformer: { from: (value: string) => parseFloat(value), to: (value) => value },
  })
  occupancy?: number | null;

  @ManyToOne(() => ContainerType, (log) => log.container_type, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  @JoinColumn({ name: "container_type_id" })
  containerType?: ContainerType;

  @ManyToOne(() => Container, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  @JoinColumn({ name: "container_id" })
  container?: Container;
}
