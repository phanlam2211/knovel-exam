/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Role {
  /** @example 1 */
  id: number;
  /** @example "Admin" */
  name?: string;
}

export interface User {
  email: string | null;
  name: string | null;
  role: Role;
  roleId: number;
  password?: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
  id: number;
}

export interface AuthEmailLoginResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: string;
  user: User;
  infoTokenStore: object;
}

export interface AuthEmailLoginDto {
  email: string;
  password: string;
}

export interface RefreshResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export interface AuthUpdateDto {
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  /** @example "new.email@example.com" */
  email?: string;
  /** @minLength 6 */
  password?: string;
  /** @minLength 6 */
  oldPassword?: string;
}

export interface CreateUserDto {
  /** @example "John Doe" */
  name: string;
  /** @example "test1@example.com" */
  email: string;
  /**
   * @minLength 6
   * @example "password123"
   */
  password: string;
}

export interface ResponseDataSwagger {
  statusCode: number;
  message: string;
  data: object;
}

export interface InfinityPaginationResultTypeSwagger {
  total: number;
  data: any[][];
}

export interface UpdateUserDto {
  /** @example "John Doe" */
  name?: string;
  /** @example "test1@example.com" */
  email?: string;
}

export interface CreateTaskDto {
  /** Task title */
  title: string;
  /** Task description */
  description?: string;
  /** Assignee user ID */
  assigneeId: number;
  /** Status ID */
  statusId?: number;
  /** Due date */
  dueDate?: string;
}

export interface Status {
  /** @example 1 */
  id: number;
  /** @example "Active" */
  name?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  assignee: User;
  createdBy: User;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  dueDate: string | null;
  assigneeId?: number;
  statusId?: number;
  /** @format date-time */
  deletedAt: string;
}

export interface TaskPaginationResultSwagger {
  total: number;
  data: Task[];
}

export interface TaskSummary {
  userId: number;
  userName: string;
  totalTasks: number;
  completedTasks: number;
}

export interface PaginateEmployeeTaskSummaryDto {
  total: number;
  data: TaskSummary[];
}

export interface UpdateTaskDto {
  /** Task title */
  title?: string;
  /** Task description */
  description?: string;
  /** Assignee user ID */
  assigneeId?: number;
  /** Status ID */
  statusId?: number;
  /** Due date */
  dueDate?: string;
}
