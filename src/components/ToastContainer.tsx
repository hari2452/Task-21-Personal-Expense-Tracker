import type { Toast } from "../types";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: number) => void;
}

const toastIcons = {
  success: "✓",
  error: "!",
  info: "i",
};

function ToastContainer({
  toasts,
  onRemove,
}: ToastContainerProps) {
  return (
    <div
      className="toast-container"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type}`}
          role={toast.type === "error" ? "alert" : "status"}
        >
          <div className="toast-icon">
            {toastIcons[toast.type]}
          </div>

          <div className="toast-content">
            <strong>
              {toast.type === "success"
                ? "Success"
                : toast.type === "error"
                ? "Error"
                : "Information"}
            </strong>

            <p>{toast.message}</p>
          </div>

          <button
            type="button"
            className="toast-close"
            onClick={() => onRemove(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;