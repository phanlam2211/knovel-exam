import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum TaskSortBy {
  CREATED_AT = 'createdAt',
  DUE_DATE = 'dueDate',
  STATUS = 'status',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryTaskDto {
  @ApiProperty({ description: 'Assignee user ID filter', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  assigneeId?: number;

  @ApiProperty({ description: 'Status ID filter', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  statusId?: number;

  @ApiProperty({
    description: 'Sort by field',
    enum: TaskSortBy,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskSortBy)
  sortBy?: TaskSortBy;

  @ApiProperty({ description: 'Sort order', enum: SortOrder, required: false })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @ApiProperty({ description: 'Page number', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number;

  @ApiProperty({ description: 'Page size', required: false })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number;
}
