import { Column, Entity, PrimaryColumn } from 'typeorm';

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
}