import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Role } from '../../roles/entities/role.entity';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

@Entity('users')
@Index(['roleId']) // Index for role-based filtering (important for getEmployeeTaskSummary)
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  // More info: https://github.com/typeorm/typeorm/issues/2567
  @ApiProperty()
  @Index()
  @Column({ type: String, unique: true, nullable: true })
  @Transform(({ value }) => (value ? value.toLowerCase() : null)) // Transform email to lowercase
  // @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Index()
  @ApiProperty()
  @Column({ type: String, nullable: true })
  name: string | null;

  @ApiProperty()
  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ApiProperty()
  @Column({ type: Number, nullable: true })
  roleId: number;

  @ApiProperty()
  @Column({ nullable: false })
  password?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
