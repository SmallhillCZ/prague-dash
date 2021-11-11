import { LargeNumberLike } from 'crypto';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Stop } from './stop.entity';

@Entity()
export class StopPlatform {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Stop, stop => stop.platforms, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  stop: Stop;

  @Column({ nullable: true })
  name: string;

  @Column({ type: "numeric", precision: 8, scale: 5 })
  lat: number;

  @Column({ type: "numeric", precision: 8, scale: 5 })
  lon: number;
}