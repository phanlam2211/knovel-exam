import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from 'src/users/entities/user.entity';

@Entity('sessions')
export class Session extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  @Index()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
