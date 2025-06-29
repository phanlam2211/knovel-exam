import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryEmployeeTaskSummaryDto {
  @ApiPropertyOptional({ default: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  limit?: number = 10;
}
