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

import {AuthEmailLoginDto, AuthEmailLoginResponseDto, AuthUpdateDto, RefreshResponseDto, User,} from "./data-contracts";
import {ContentType, HttpClient, RequestParams} from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @request POST:/api/v1/auth/login
   */
  authControllerLogin = (data: AuthEmailLoginDto, params: RequestParams = {}) =>
    this.http.request<AuthEmailLoginResponseDto, any>({
      path: `/api/v1/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerMe
   * @request GET:/api/v1/auth/me
   */
  authControllerMe = (params: RequestParams = {}) =>
    this.http.request<User, any>({
      path: `/api/v1/auth/me`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerUpdate
   * @request PATCH:/api/v1/auth/me
   * @secure
   */
  authControllerUpdate = (data: AuthUpdateDto, params: RequestParams = {}) =>
    this.http.request<User, any>({
      path: `/api/v1/auth/me`,
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
   * @tags Auth
   * @name AuthControllerRefresh
   * @request POST:/api/v1/auth/refresh
   * @secure
   */
  authControllerRefresh = (params: RequestParams = {}) =>
    this.http.request<RefreshResponseDto, any>({
      path: `/api/v1/auth/refresh`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @request POST:/api/v1/auth/logout
   * @secure
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/api/v1/auth/logout`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
}
