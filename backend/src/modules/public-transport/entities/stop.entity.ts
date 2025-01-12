import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { StopPlatform } from './stop-platform.entity';

@Entity()
export class Stop {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => StopPlatform, platform => platform.stop, { cascade: true })
  platforms: StopPlatform[];
}