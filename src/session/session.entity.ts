import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity()
export class SessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jwt: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @Column({ type: 'text' })
  deviceType: string;
}
