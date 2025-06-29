import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from '../users/entities/user.entity';
import { Status } from '../statuses/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Status])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
