/**
 * useApi Hook
 * Simplifies API calls with loading, error, and data state management
 */

import { useState, useCallback, useEffect } from "react";
import { getErrorMessage } from "@/services/api";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UseApiOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Generic hook for API operations
 * @template T The type of data returned by the API call
 * @param apiFunction The async API function to call
 * @param options Optional callbacks
 * @returns State and execute function
 */
export const useApi = <T,>(
  apiFunction: (...args: any[]) => Promise<T>,
  options?: UseApiOptions
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const result = await apiFunction(...args);
        setState({ data: result, isLoading: false, error: null });
        options?.onSuccess?.();
        return result;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setState({ data: null, isLoading: false, error: errorMessage });
        options?.onError?.(errorMessage);
        throw error;
      }
    },
    [apiFunction, options]
  );

  return { ...state, execute };
};

/**
 * Hook for fetching data (GET requests)
 * @template T The type of data
 * @param apiFunction The async API function
 * @param dependencies Dependency array for useEffect
 * @returns State with data
 */
export const useFetch = <T,>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const [retryCount, setRetryCount] = useState(0);

  const refetch = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const result = await apiFunction();
      setState({ data: result, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error('useFetch error:', { errorMessage, error });
      setState({ data: null, isLoading: false, error: errorMessage });
    }
  }, [apiFunction]);

  useEffect(() => {
    refetch();
  }, [refetch, retryCount, ...dependencies]);

  const retry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  return { ...state, refetch, retry };
};
