import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import ConfirmDialog, { type ConfirmDialogContent } from '../components/ui/ConfirmDialog';

type ConfirmOptions = ConfirmDialogContent;

interface ConfirmContextValue {
  /** Opens the native dialog and resolves to `true` (confirmed) or `false` (cancelled). */
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [open, setOpen] = useState(false);
  const resolver = useRef<((confirmed: boolean) => void) | null>(null);

  const confirm = useCallback((next: ConfirmOptions) => {
    // Settle any dialog that is still pending before opening a new one.
    resolver.current?.(false);
    setOptions(next);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const settle = useCallback((confirmed: boolean) => {
    resolver.current?.(confirmed);
    resolver.current = null;
    setOpen(false);
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {options && <ConfirmDialog open={open} {...options} onCancel={() => settle(false)} onConfirm={() => settle(true)} />}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmContextValue {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirm must be used inside <ConfirmProvider>.');
  return context;
}
