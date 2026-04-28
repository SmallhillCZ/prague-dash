import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Container } from "./container.entity";

// https://api.golemio.cz/docs/public-openapi/#/%E2%99%BB%EF%B8%8F%20Waste%20Collection%20(v2)/getWCStations

// Trash type
// | 1 | Barevné sklo | Tinted glass |
// | 2 | Elektrozařízení | Electric waste |
// | 3 | Kovy | Metals |
// | 4 | Nápojové kartóny | Beverage cartons |
// | 5 | Papír | Paper |
// | 6 | Plast | Plastics |
// | 7 | Čiré sklo | Clear glass |
// | 8 | Jedlé tuky a oleje | Edible fats and oils |
// | 9 | Multikomoditní sběr | Multicommodity |

// Cleaning Frequency
// | Value | 1st digit - period duration | 2nd digit - frequency |
// Example:
// | 13 | 1 | 3 | 3 times per 1 week |
// | 61 | 6 | 1 | Once per 6 weeks |
// Code 99 stands for dynamic frequency.

class CleaningFrequency {
  @Column("varchar", { nullable: true }) id?: number | null;
  @Column("varchar", { nullable: true }) duration?: string | null;
  @Column("varchar", { nullable: true }) frequency?: number | null;
}

export enum ContainerTypeEnum {
  TintedGlass = 1,
  ElectricWaste = 2,
  Metals = 3,
  BeverageCartons = 4,
  Paper = 5,
  Plastics = 6,
  ClearGlass = 7,
  EdibleFatsAndOils = 8,
  Multicommodity = 9,
}

@Entity()
export class ContainerType {
  @PrimaryColumn("varchar") id!: string;

  @Column("varchar") containerId!: string;

  @Column("enum", { enum: ContainerTypeEnum }) type!: ContainerTypeEnum;

  @Column(() => CleaningFrequency) cleaning_frequency?: CleaningFrequency;
  @Column("varchar", { nullable: true }) container_type?: string;

  @ManyToOne(() => Container, (container) => container.containerTypes, { onDelete: "RESTRICT", onUpdate: "CASCADE" })
  @JoinColumn({ name: "container_id" })
  container?: Container;
}
