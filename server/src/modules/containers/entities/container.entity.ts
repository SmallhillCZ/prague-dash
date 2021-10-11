import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ContainerType } from './container-type.entity';

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

  @OneToMany(() => ContainerType, container => container.container)
  types: ContainerType[];
}