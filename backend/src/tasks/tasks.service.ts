import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';
import { User } from '../users/entities/user.entity';
import { Status } from '../statuses/entities/status.entity';
import { RolesEnum } from '../roles/roles.enum';
import { TaskSummary } from './dto/task-summary.dto';
import { QueryEmployeeTaskSummaryDto } from './dto/query-employee-task-summary.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async createTask(
    createTaskDto: CreateTaskDto,
    currentUser: User,
  ): Promise<Task> {
    // Only employers can create tasks
    if (currentUser.role.name !== RolesEnum.EMPLOYER) {
      throw new ForbiddenException('Only employers can create tasks');
    }

    const assignee = await this.userRepository.findOne({
      where: { id: createTaskDto.assigneeId },
    });

    if (!assignee) {
      throw new NotFoundException('Assignee not found');
    }

    const status = await this.statusRepository.findOne({
      where: { name: 'Todo' },
    });

    if (!status) {
      throw new NotFoundException('Status not found');
    }

    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description || null;
    task.assignee = assignee;
    task.status = status;
    task.createdBy = currentUser;
    task.dueDate = createTaskDto.dueDate
      ? new Date(createTaskDto.dueDate)
      : null;

    return this.taskRepository.save(task);
  }

  async findAll(
    queryDto: QueryTaskDto,
    currentUser: User,
  ): Promise<{ data: Task[]; total: number }> {
    const queryBuilder = this.buildQueryBuilder(queryDto, currentUser);

    const page = queryDto.page || 1;
    const limit = queryDto.limit || 10;

    const [tasks, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data: tasks, total };
  }

  async findOne(id: number, currentUser: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignee', 'status', 'createdBy'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Check access: employees can only see their own tasks
    if (
      currentUser.role.name === RolesEnum.EMPLOYEE &&
      task.assignee.id !== currentUser.id
    ) {
      throw new ForbiddenException('You can only view your own tasks');
    }

    return task;
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    currentUser: User,
  ): Promise<Task> {
    const task = await this.findOne(id, currentUser);

    // Role-based update restrictions
    if (currentUser.role.name === RolesEnum.EMPLOYEE) {
      // Employees can only update status
      const allowedFields = ['statusId'];
      const hasOtherFields = Object.keys(updateTaskDto).some(
        (key) => !allowedFields.includes(key),
      );
      if (hasOtherFields) {
        throw new ForbiddenException('Employees can only update task status');
      }
    }

    // Update assignee if provided
    if (updateTaskDto.assigneeId) {
      const assignee = await this.userRepository.findOne({
        where: { id: updateTaskDto.assigneeId },
      });
      if (!assignee) {
        throw new NotFoundException('Assignee not found');
      }
      task.assignee = assignee;
    }

    // Update status if provided
    if (updateTaskDto.statusId) {
      const status = await this.statusRepository.findOne({
        where: { id: updateTaskDto.statusId },
      });
      if (!status) {
        throw new NotFoundException('Status not found');
      }
      task.status = status;
    }

    // Update other fields
    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }
    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }
    if (updateTaskDto.dueDate !== undefined) {
      task.dueDate = updateTaskDto.dueDate
        ? new Date(updateTaskDto.dueDate)
        : null;
    }

    return this.taskRepository.save(task);
  }

  async removeTask(id: number, currentUser: User): Promise<void> {
    const task = await this.findOne(id, currentUser);

    // Only employers can delete tasks
    if (currentUser.role.name !== RolesEnum.EMPLOYER) {
      throw new ForbiddenException('Only employers can delete tasks');
    }

    await this.taskRepository.remove(task);
  }

  async getEmployeeTaskSummary(
    currentUser: User,
    query: QueryEmployeeTaskSummaryDto,
  ): Promise<{
    data: TaskSummary[];
    total: number;
    page: number;
    limit: number;
  }> {
    if (currentUser.role.name !== RolesEnum.EMPLOYER) {
      throw new ForbiddenException(
        'Only employers can view employee summaries',
      );
    }

    const page = query.page || 1;
    const limit = query.limit || 10;
    const [employees, total] = await this.userRepository.findAndCount({
      where: { role: { name: RolesEnum.EMPLOYEE } },
      skip: (page - 1) * limit,
      take: limit,
    });

    const summaries: TaskSummary[] = await Promise.all(
      employees.map(async (employee) => {
        const [totalTasks, completedTasks] = await Promise.all([
          this.taskRepository.count({
            where: { assignee: { id: employee.id } },
          }),
          this.taskRepository.count({
            where: {
              assignee: { id: employee.id },
              status: { name: 'Completed' },
            },
          }),
        ]);
        return {
          userId: employee.id,
          userName: employee.name || 'Unknown',
          totalTasks,
          completedTasks,
        };
      }),
    );

    return { data: summaries, total, page, limit };
  }

  private buildQueryBuilder(
    queryDto: QueryTaskDto,
    currentUser: User,
  ): SelectQueryBuilder<Task> {
    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.assignee', 'assignee')
      .leftJoinAndSelect('task.status', 'status')
      .leftJoinAndSelect('task.createdBy', 'createdBy');

    // Role-based filtering: employees can only see their own tasks
    if (currentUser.role.name === RolesEnum.EMPLOYEE) {
      queryBuilder.andWhere('task.assignee.id = :userId', {
        userId: currentUser.id,
      });
    }

    // Apply filters
    if (queryDto.assigneeId) {
      queryBuilder.andWhere('task.assignee.id = :assigneeId', {
        assigneeId: queryDto.assigneeId,
      });
    }

    if (queryDto.statusId) {
      queryBuilder.andWhere('task.status.id = :statusId', {
        statusId: queryDto.statusId,
      });
    }

    // Apply sorting
    if (queryDto.sortBy) {
      const sortOrder = queryDto.sortOrder || 'ASC';
      queryBuilder.orderBy(`task.${queryDto.sortBy}`, sortOrder);
    } else {
      queryBuilder.orderBy('task.createdAt', 'DESC');
    }

    return queryBuilder;
  }
}
