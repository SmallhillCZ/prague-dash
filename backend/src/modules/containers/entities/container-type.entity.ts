import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Container } from "./container.entity";

class CleaningFrequency {
  @Column("varchar", { nullable: true }) id?: number | null;
  @Column("varchar", { nullable: true }) duration?: string | null;
  @Column("varchar", { nullable: true }) frequency?: number | null;
}

@Entity()
export class ContainerType {
  @PrimaryColumn("varchar") id!: string;

  @Column("varchar") containerId!: string;

  @Column("smallint") type!: number;

  @Column(() => CleaningFrequency) cleaning_frequency?: CleaningFrequency;
  @Column("varchar", { nullable: true }) container_type?: string;

  @ManyToOne(() => Container, (container) => container.containerTypes, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  @JoinColumn({ name: "container_id" })
  container?: Container;
}
