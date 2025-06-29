import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class TaskPaginationResultSwagger {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: () => Task, isArray: true })
  data: Task[];
}
