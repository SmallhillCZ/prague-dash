import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Container {
  @PrimaryColumn()
  id: string;

  @Column()
  location: string;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  district: string;

  @Column({ nullable: true })
  occupancy: number;
}