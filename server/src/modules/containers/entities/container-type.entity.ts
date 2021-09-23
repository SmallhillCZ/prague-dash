import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Container } from './container.entity';

@Entity()
export class ContainerType {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Container, container => container.types)
  container: Container;

  @Column()
  type: number;

  @Column({ nullable: true })
  occupancy: number;
}