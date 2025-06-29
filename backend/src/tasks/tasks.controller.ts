import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesEnum } from '../roles/roles.enum';
import { CurrentUser } from '../users/decorators/currentUser.decorator';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';
import { ResponseDataSwagger } from '../types/swagger/reponse-data';
import { TaskPaginationResultSwagger } from './dto/paginate-task.dto';
import { QueryEmployeeTaskSummaryDto } from './dto/query-employee-task-summary.dto';
import { PaginateEmployeeTaskSummaryDto } from './dto/paginate-employee-task-summary.dto';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles(RolesEnum.EMPLOYER)
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created successfully',
    type: ResponseDataSwagger<Task>,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only employers can create tasks',
  })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, currentUser);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination and filtering' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks retrieved successfully',
    type: TaskPaginationResultSwagger,
  })
  findAll(
    @Query() queryDto: QueryTaskDto,
    @CurrentUser() currentUser: User,
  ): Promise<{ data: Task[]; total: number }> {
    return this.tasksService.findAll(queryDto, currentUser);
  }

  @Get('summary')
  @Roles(RolesEnum.EMPLOYER)
  @ApiOperation({ summary: 'Get task summary for all employees (paginated)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task summary retrieved successfully',
    type: PaginateEmployeeTaskSummaryDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only employers can view task summaries',
  })
  getTaskSummary(
    @CurrentUser() currentUser: User,
    @Query() query: QueryEmployeeTaskSummaryDto,
  ) {
    return this.tasksService.getEmployeeTaskSummary(currentUser, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task retrieved successfully',
    type: ResponseDataSwagger<Task>,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
  })
  findOne(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.findOne(+id, currentUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated successfully',
    type: ResponseDataSwagger<Task>,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Access denied',
  })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() currentUser: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(+id, updateTaskDto, currentUser);
  }

  @Delete(':id')
  @Roles(RolesEnum.EMPLOYER)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted successfully',
    type: ResponseDataSwagger<Task>,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Only employers can delete tasks',
  })
  remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    return this.tasksService.removeTask(+id, currentUser);
  }
}
