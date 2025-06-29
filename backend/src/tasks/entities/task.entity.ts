import {
  AfterLoad,
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
import { User } from '../../users/entities/user.entity';
import { Status } from '../../statuses/entities/status.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tasks')
@Index(['assigneeId'])
@Index(['assigneeId', 'statusId'])
@Index(['statusId'])
export class Task extends EntityHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty()
  @ManyToOne(() => Status, { eager: true })
  @JoinColumn({ name: 'statusId' })
  status: Status;

  @ApiProperty()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'assigneeId' })
  assignee: User;

  @ApiProperty()
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @Column({ name: 'dueDate', type: 'timestamp', nullable: true })
  dueDate: Date | null;

  @ApiProperty()
  @Column()
  assigneeId?: number;

  @ApiProperty()
  @Column()
  statusId?: number;

  @ApiProperty()
  @Column()
  createdById?: number;

  @AfterLoad()
  setVirtualProperties() {
    if (this.assignee) {
      this.assigneeId = this.assignee.id;
    }
    if (this.status) {
      this.statusId = this.status.id;
    }
    if (this.createdBy) {
      this.createdById = this.createdBy.id;
    }
  }

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
