import { ApiProperty } from '@nestjs/swagger';

export class TaskSummary {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  totalTasks: number;

  @ApiProperty()
  completedTasks: number;
}
