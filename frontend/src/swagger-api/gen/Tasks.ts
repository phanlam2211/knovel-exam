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

import {
    CreateTaskDto,
    PaginateEmployeeTaskSummaryDto,
    ResponseDataSwagger,
    TaskPaginationResultSwagger,
    UpdateTaskDto,
} from "./data-contracts";
import {ContentType, HttpClient, RequestParams} from "./http-client";

export class Tasks<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerCreate
   * @summary Create a new task
   * @request POST:/api/tasks
   * @secure
   */
  tasksControllerCreate = (data: CreateTaskDto, params: RequestParams = {}) =>
    this.http.request<ResponseDataSwagger, void>({
      path: `/api/tasks`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerFindAll
   * @summary Get all tasks with pagination and filtering
   * @request GET:/api/tasks
   * @secure
   */
  tasksControllerFindAll = (
    query?: {
      /** Assignee user ID filter */
      assigneeId?: number;
      /** Status ID filter */
      statusId?: number;
      /** Sort by field */
      sortBy?: "createdAt" | "dueDate" | "status";
      /** Sort order */
      sortOrder?: "ASC" | "DESC";
      /** Page number */
      page?: number;
      /** Page size */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<TaskPaginationResultSwagger, any>({
      path: `/api/tasks`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerGetTaskSummary
   * @summary Get task summary for all employees (paginated)
   * @request GET:/api/tasks/summary
   * @secure
   */
  tasksControllerGetTaskSummary = (
    query?: {
      /** @default 1 */
      page?: number;
      /** @default 10 */
      limit?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PaginateEmployeeTaskSummaryDto, void>({
      path: `/api/tasks/summary`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerFindOne
   * @summary Get a task by ID
   * @request GET:/api/tasks/{id}
   * @secure
   */
  tasksControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.http.request<ResponseDataSwagger, void>({
      path: `/api/tasks/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerUpdate
   * @summary Update a task
   * @request PATCH:/api/tasks/{id}
   * @secure
   */
  tasksControllerUpdate = (
    id: string,
    data: UpdateTaskDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ResponseDataSwagger, void>({
      path: `/api/tasks/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Tasks
   * @name TasksControllerRemove
   * @summary Delete a task
   * @request DELETE:/api/tasks/{id}
   * @secure
   */
  tasksControllerRemove = (id: string, params: RequestParams = {}) =>
    this.http.request<ResponseDataSwagger, void>({
      path: `/api/tasks/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
