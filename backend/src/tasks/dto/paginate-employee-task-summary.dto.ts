import { ApiProperty } from '@nestjs/swagger';
import { TaskSummary } from './task-summary.dto';

export class PaginateEmployeeTaskSummaryDto {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: () => TaskSummary, isArray: true })
  data: TaskSummary[];
}
