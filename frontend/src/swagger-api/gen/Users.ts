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
    CreateUserDto,
    InfinityPaginationResultTypeSwagger,
    ResponseDataSwagger,
    UpdateUserDto,
    User,
} from "./data-contracts";
import {ContentType, HttpClient, RequestParams} from "./http-client";

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerCreate
   * @request POST:/api/v1/users/create-employee
   * @secure
   */
  usersControllerCreate = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<ResponseDataSwagger, any>({
      path: `/api/v1/users/create-employee`,
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
   * @tags Users
   * @name UsersControllerFindAll
   * @request GET:/api/v1/users
   * @secure
   */
  usersControllerFindAll = (
    query?: {
      page?: number;
      limit?: number;
      filters?: string | null;
      sort?: string | null;
      searchText?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<InfinityPaginationResultTypeSwagger, any>({
      path: `/api/v1/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerFindAllEmployees
   * @request GET:/api/v1/users/employees
   * @secure
   */
  usersControllerFindAllEmployees = (params: RequestParams = {}) =>
    this.http.request<User[], any>({
      path: `/api/v1/users/employees`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users
   * @name UsersControllerUpdate
   * @request PATCH:/api/v1/users/{id}
   * @secure
   */
  usersControllerUpdate = (
    id: number,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.http.request<User, any>({
      path: `/api/v1/users/${id}`,
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
   * @tags Users
   * @name UsersControllerRemove
   * @request DELETE:/api/v1/users/{id}
   * @secure
   */
  usersControllerRemove = (id: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/v1/users/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
