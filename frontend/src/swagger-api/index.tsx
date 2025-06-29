import { axiosClient } from './axios';
import { Auth } from './gen/Auth';
import { HttpClient } from './gen/http-client';
import { Tasks } from './gen/Tasks';
import { Users } from './gen/Users';

export * from './gen/data-contracts';

const httpClient = new HttpClient();
httpClient.instance = axiosClient;

export const authService = new Auth(httpClient);
export const usersService = new Users(httpClient);
export const taskService = new Tasks(httpClient);

export { httpClient, axiosClient };
