import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { StopTime } from './stop-time.entity';

@Entity()
export class Stop {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @OneToMany(() => StopTime, stopTime => stopTime.stop_id)
  times: StopTime[];


}