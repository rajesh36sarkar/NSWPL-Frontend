import { useState, useCallback } from "react";
import ToastContainer from "../components/ToastContainer";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const ToastComponent = () => (
    <ToastContainer toasts={toasts} removeToast={removeToast} />
  );

  return {
    toast: { success: (msg) => addToast(msg, "success"),
      error: (msg) => addToast(msg, "error"),
      warning: (msg) => addToast(msg, "warning"),
      info: (msg) => addToast(msg, "info"),
    },
    ToastComponent,
  };
};

export default useToast;