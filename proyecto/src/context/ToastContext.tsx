import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Toast from '../components/ui/Toast';
import type { ToastKind, ToastMessage } from '../types';

interface ToastContextValue {
  showToast: (kind: ToastKind, message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback((kind: ToastKind, message: string) => {
    setToast({ id: Date.now(), kind, message });
  }, []);
  const closeToast = useCallback(() => setToast(null), []);
  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Fixed live region: it stays in the DOM so screen readers announce each toast reliably. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[26rem]"
      >
        {toast && <Toast key={toast.id} toast={toast} onClose={closeToast} />}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>.');
  return context;
}
