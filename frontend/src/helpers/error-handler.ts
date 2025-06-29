import { openNotification } from '../components/toast';

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
      errors?: Record<string, string> | string;
    };
    status?: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request?: any;
  message?: string;
}

export const handleApiError = (error: ApiError): void => {
  if (error.response) {
    // Server responded with error status
    const errorData = error.response.data;

    // Priority 1: errorData.error (highest priority)
    if (errorData?.error) {
      openNotification('error', errorData.error);
      return;
    }

    // Priority 2: errorData.message
    if (errorData?.message) {
      openNotification('error', errorData.message);
      return;
    }

    // Priority 3: errorData.errors
    if (errorData?.errors) {
      if (typeof errorData.errors === 'object' && errorData.errors !== null) {
        // errors is an object, loop through entries
        const fieldErrors = Object.entries(errorData.errors)
          .map(([field, message]) => `${field}: ${message}`)
          .join(', ');
        if (fieldErrors) {
          openNotification('error', `${fieldErrors}`);
          return;
        }
      } else if (typeof errorData.errors === 'string') {
        // errors is a string, show directly
        openNotification('error', errorData.errors);
        return;
      }
    }
  } else if (error.request) {
    // Network error
    openNotification('error', 'Network error. Please check your internet connection.');
  } else {
    // Other errors
    openNotification('error', error.message || 'An unexpected error occurred');
  }
};
