import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';

import { isAxiosKeepException, isAxiosSilent } from './helper';

export type ResponseData<T> = {
  data: T;
  statusCode: number;
  message: string;
};

const defaultConfig: AxiosRequestConfig<any> = {
  timeout: 600000,
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL || '',
};

const getErrorCode = (error: any) => error?.response?.data?.statusCode || error?.response?.status || 200;

export const getErrorMsg = (error: any) => {
  if (error?.response?.data?.message || error?.response?.data?.error) {
    return error?.response?.data?.message || error?.response?.data?.error;
  } else {
    return error?.response?.status;
  }
};

// Token management
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const isAuthenticated = () => {
  return !!getAccessToken();
};

const addRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      // Add access token to request headers
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      (config as any).paramsSerializer = (params: any) => {
        return qs.stringify(params, {
          arrayFormat: 'comma',
          encode: false,
        });
      };
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    },
  );
};

let refreshPromise: any = null;
const getRefreshPromise = (instance: AxiosInstance) => {
  if (!refreshPromise) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    refreshPromise = instance
      .post('/api/v1/auth/refresh', {
        refreshToken: refreshToken,
      })
      .then((response) => {
        // Handle different response structures
        const responseData = response.data;
        let token, newRefreshToken;

        if (responseData.data) {
          // If response has nested data structure
          token = responseData.data.token || responseData.data.accessToken;
          newRefreshToken = responseData.data.refreshToken;
        } else {
          // If response is direct
          token = responseData.token || responseData.accessToken;
          newRefreshToken = responseData.refreshToken;
        }

        if (token && newRefreshToken) {
          setTokens(token, newRefreshToken);
        } else {
          throw new Error('Invalid refresh response format');
        }

        return response;
      })
      .finally(() => {
        setTimeout(() => {
          refreshPromise = null;
        }, 1000);
      });
  }
  return refreshPromise;
};

let logoutPromise: any = null;
const getLogoutPromise = (instance: AxiosInstance) => {
  if (!logoutPromise) {
    logoutPromise = instance.post('/api/v1/auth/logout').finally(() => {
      setTimeout(() => {
        logoutPromise = null;
      }, 500);
    });
  }
  return logoutPromise;
};

const onLogout = async (instance: AxiosInstance) => {
  try {
    // Only call logout API if we have a token
    if (getAccessToken()) {
      await getLogoutPromise(instance);
    }
  } catch (e) {
    console.error('Error on logout', e);
  } finally {
    clearTokens();
    // Use window.location.replace to prevent back navigation
    window.location.replace('/sign-in');
  }
};

// Utility function to manually logout
export const logout = async () => {
  try {
    if (getAccessToken()) {
      await axiosClient.post('/api/v1/auth/logout');
    }
  } catch (e) {
    console.error('Error on manual logout', e);
  } finally {
    clearTokens();
    window.location.replace('/sign-in');
  }
};

const addResponseInterceptors = (instance: AxiosInstance) => {
  const interceptorId = instance.interceptors.response.use(
    (response: AxiosResponse<ResponseData<any>>) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If it's not a 401 error or should keep exception, reject immediately
      if (![401].includes(getErrorCode(error)) && isAxiosKeepException(error.config)) {
        return Promise.reject(error);
      }

      // Handle 401 errors
      if ([401].includes(getErrorCode(error))) {
        // If this is a refresh token request that failed, logout
        if (originalRequest.url?.includes('/auth/refresh')) {
          console.log('Refresh token failed, logging out');
          onLogout(instance);
          return Promise.reject(error);
        }

        // If we haven't tried to refresh yet, try to refresh the token
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await getRefreshPromise(instance);
            // Retry the original request with new token
            return instance.request(originalRequest);
          } catch (refreshError) {
            console.log('Error on refresh token, going to logout', refreshError);
            onLogout(instance);
            return Promise.reject(refreshError);
          }
        } else {
          // If we already tried to refresh and it failed, logout
          onLogout(instance);
          return Promise.reject(error);
        }
      }

      // Handle other errors
      if (!isAxiosSilent(error.config) || !isAxiosKeepException(error.config)) {
        return Promise.reject(error);
      }

      // Remove interceptor to prevent infinite loops
      instance.interceptors.response.eject(interceptorId);

      try {
        await getRefreshPromise(instance);
        // Retry the original request
        return instance.request(originalRequest);
      } catch (e) {
        console.log('Error on refresh token, going to logout', e);
        onLogout(instance);
      } finally {
        addResponseInterceptors(instance);
      }
    },
  );
};

export const createAxiosClient = (config: AxiosRequestConfig = defaultConfig) => {
  const instance = axios.create(config);
  addRequestInterceptors(instance);
  addResponseInterceptors(instance);
  return instance;
};

/**
 * api with interceptors
 */
export const axiosClient = createAxiosClient();
