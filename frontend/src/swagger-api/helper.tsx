import type { AxiosRequestConfig } from 'axios';

export const getAxiosSilent = (config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    silent: 'true',
  };
  return config;
};

export const isAxiosSilent = (config: AxiosRequestConfig) => {
  return config?.headers?.silent === 'true';
};

export const getAxiosKeepException = (config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    keep_exception: 'true',
  };
  return config;
};

export const isAxiosKeepException = (config: AxiosRequestConfig) => {
  return config?.headers?.keep_exception === 'true';
};
