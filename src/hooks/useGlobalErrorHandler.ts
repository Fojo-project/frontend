import { useCallback } from 'react';
import { useNetworkError } from './useNetworkError';

export const useGlobalErrorHandler = () => {
  const { networkError, getErrorType, getErrorMessage } = useNetworkError(null);

  const handleError = useCallback((error: any, context?: string) => {
    // Log error for debugging
    console.error(`Error in ${context || 'application'}:`, error);

    // Handle different types of errors
    if (error?.response) {
      // Axios error
      const status = error.response.status;
      const message = error.response.data?.message || 'Network request failed';
      
      // You can integrate with your toast system here
      // toast.error(message);
      
      return {
        type: 'error',
        message,
        status,
        context
      };
    }

    if (error?.request) {
      // Network error (no internet)
      const message = 'No internet connection. Please check your network.';
      
      // toast.error(message);
      
      return {
        type: 'error',
        message,
        status: 0,
        context
      };
    }

    if (error?.message) {
      // JavaScript error
      const message = error.message;
      
      // toast.error(message);
      
      return {
        type: 'error',
        message,
        status: undefined,
        context
      };
    }

    // Generic error
    const message = 'An unexpected error occurred';
    
    // toast.error(message);
    
    return {
      type: 'error',
      message,
      status: undefined,
      context
    };
  }, []);

  const handleNetworkError = useCallback((error: any, context?: string) => {
    const { networkError, getErrorType, getErrorMessage } = useNetworkError(error);
    
    if (networkError) {
      const errorType = getErrorType(networkError.status);
      const errorMessage = getErrorMessage(networkError);
      
      // You can integrate with your toast system here
      // toast[errorType](errorMessage);
      
      return {
        type: errorType,
        message: errorMessage,
        status: networkError.status,
        context
      };
    }
    
    return null;
  }, []);

  return {
    handleError,
    handleNetworkError,
    networkError,
    getErrorType,
    getErrorMessage
  };
};
