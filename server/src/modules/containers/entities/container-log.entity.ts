import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ContainerLog {
  @PrimaryColumn({ type: "timestamptz" })
  timestamp: Date;

  @PrimaryColumn()
  id: string;

  @PrimaryColumn({})
  type_id: string;

  @Column()
  type: number;

  @Column({
    nullable: true,
    type: "numeric", precision: 3, scale: 2,
    transformer: { from: (value: string) => parseFloat(value), to: value => value }
  })
  occupancy: number;
}