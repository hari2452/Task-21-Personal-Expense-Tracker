import { useEffect, useRef, useState } from "react";

import type { Toast, ToastType } from "../types";

function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const nextId = useRef<number>(0);

  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  // REMOVE NOTIFICATION
  const removeToast = (id: number): void => {
    const timer = timers.current.get(id);

    if (timer !== undefined) {
      clearTimeout(timer);
      timers.current.delete(id);
    }

    setToasts((prev) =>
      prev.filter((toast) => toast.id !== id)
    );
  };

  // ADD NOTIFICATION
  const showToast = (
    message: string,
    type: ToastType = "success"
  ): void => {
    const id = ++nextId.current;

    const newToast: Toast = {
      id,
      message,
      type,
    };

    setToasts((prev) => [...prev, newToast]);

    // AUTOMATICALLY REMOVE AFTER 3 SECONDS
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    timers.current.set(id, timer);
  };

  // CLEAN UP TIMERS
  useEffect(() => {
    const activeTimers = timers.current;

    return () => {
      activeTimers.forEach((timer) => clearTimeout(timer));
      activeTimers.clear();
    };
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
  };
}

export default useToast;