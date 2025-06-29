import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Task title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Assignee user ID' })
  @IsNotEmpty()
  @IsNumber()
  assigneeId: number;

  @ApiProperty({ description: 'Status ID', required: false })
  @IsOptional()
  @IsNumber()
  statusId?: number;

  @ApiProperty({ description: 'Due date', required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
