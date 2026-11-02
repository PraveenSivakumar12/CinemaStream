import "./Toast.css";

function Toast({ toasts, removeToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <aside className="toast-container" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item ${
            toast.type === "remove" ? "toast-remove" : "toast-success"
          }`}
          role="status"
        >
          <span className="toast-icon">{toast.icon || "❤️"}</span>
          <div className="toast-text">{toast.message}</div>
          <button
            type="button"
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </aside>
  );
}

export default Toast;
