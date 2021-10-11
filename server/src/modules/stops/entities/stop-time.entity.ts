import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Stop } from './stop.entity';

@Entity()
export class StopTime {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Stop, stop => stop.times)
  stop_id: string;

  @Column()
  route_name: string;

  @Column()
  direction?: string;

  @Column()
  departure_time: string;

  @Column()
  monday: boolean;

  @Column()
  tuesday: boolean;

  @Column()
  wednesday: boolean;

  @Column()
  thursday: boolean;

  @Column()
  friday: boolean;

  @Column()
  saturday: boolean;

  @Column()
  sunday: boolean;

  @Column()
  start_date: string;

  @Column()
  end_date: string;
}