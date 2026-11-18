import React, { createContext, useCallback, useContext, useState } from 'react';
import { Check, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: 'success' | 'info' = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev.slice(-2), { id, message, type }]);
      window.setTimeout(() => {
        removeToast(id);
      }, 3200);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-24 right-5 z-50 flex flex-col items-end gap-2 sm:right-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-lg border border-[#E6DFD4] bg-white px-4 py-3 text-sm font-medium text-[#141210] shadow-lg transition-all duration-200"
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                toast.type === 'success'
                  ? 'bg-[#141210] text-white'
                  : 'bg-[#F2EDE6] text-[#141210]'
              }`}
            >
              {toast.type === 'success' ? (
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </span>
            <span className="max-w-xs truncate">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="ml-1 rounded p-1 text-[#665E54] hover:bg-[#F2EDE6] hover:text-[#141210]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
