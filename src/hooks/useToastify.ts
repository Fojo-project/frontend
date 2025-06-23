import { toast, ToastOptions, Id } from "react-toastify";
import { useState, useCallback, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning" | "default" | "loading";

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

interface UseToastifyReturn {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => Id;
  asyncShowToast: <T>(
    asyncFn: () => Promise<T>,
    messages?: ToastMessages,
    options?: ToastOptions
  ) => Promise<T | unknown>;
  dismiss: () => void;
  isLoading: boolean;
}

const useToastify = (): UseToastifyReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const activeToastIdRef = useRef<Id | null>(null);

  const dismissActiveToast = useCallback((): void => {
    if (activeToastIdRef.current !== null) {
      toast.dismiss(activeToastIdRef.current);
      activeToastIdRef.current = null;
    }
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "default", options: ToastOptions = {}): Id => {
      const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options,
      };

      dismissActiveToast();

      const toastHandlers: Record<ToastType, (msg: string, opts?: ToastOptions) => Id> = {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
        default: toast,
        loading: toast.loading,
      };

      const toastHandler = toastHandlers[type];
      const toastId = toastHandler(message, toastOptions);
      activeToastIdRef.current = toastId;
      return toastId;
    },
    [dismissActiveToast]
  );

  const asyncShowToast = useCallback(
    async <T>(
      asyncFn: () => Promise<T>,
      messages: ToastMessages = {
        pending: "Loading...",
        success: "Successfully completed!",
        error: "Something went wrong.",
      },
      options: ToastOptions = {}
    ): Promise<T | unknown> => {
      const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options,
      };

      setIsLoading(true);
      dismissActiveToast();

      const toastId = toast.loading(messages.pending ?? "Loading...", toastOptions);
      activeToastIdRef.current = toastId;

      try {
        const response = await asyncFn();

        toast.update(toastId, {
          render: messages.success ?? "Success!",
          type: "success",
          isLoading: false,
          autoClose: options.autoClose ?? 5000,
          closeButton: true,
        });

        setIsLoading(false);
        return response;
      } catch (err: any) {
        const errorMessage = (err?.message ?? messages.error) ?? "Something went wrong.";

        toast.update(toastId, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: options.autoClose ?? 5000,
          closeButton: true,
        });

        setIsLoading(false);
        return err;
      }
    },
    [dismissActiveToast]
  );

  const dismiss = useCallback((): void => {
    dismissActiveToast();
  }, [dismissActiveToast]);

  return {
    showToast,
    asyncShowToast,
    dismiss,
    isLoading,
  };
};

export default useToastify;
