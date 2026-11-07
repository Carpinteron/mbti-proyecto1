import { useEffect, useRef } from 'react';
import { Button } from './Button';

export interface ConfirmDialogContent {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** danger = destructive action (red) · primary = regular action (accent) */
  tone?: 'danger' | 'primary';
  /** Inverts the visual hierarchy of the buttons. See the DARK PATTERN comment below. */
  darkPattern?: boolean;
}

interface Props extends ConfirmDialogContent {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', tone = 'primary', darkPattern = false, onCancel, onConfirm }: Props) {
  // Native <dialog> + useRef + showModal(): the browser provides the backdrop, focus trap and Esc to close.
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The dialog's color follows the kind of action: destructive = danger, regular = accent.
  const color = tone === 'danger' ? 'danger' : 'accent';

  // ====================== INTENTIONAL DARK PATTERN ======================
  // When darkPattern = true two deceptive design techniques are applied, on purpose
  // and only for teaching purposes:
  //  1. Inverted hierarchy: the cancel button looks like the primary action
  //     (filled, large) and the action the user asked for becomes a small gray link.
  //  2. Confirmshaming: the confirm button text guilt-trips the user
  //     (set by the caller through confirmLabel, see useCollectionActions).
  // An honest design (darkPattern = false) styles buttons according to the real action.
  // ======================================================================

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onCancel(); }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-[28px] border border-line bg-surface p-0 text-fg shadow-xl backdrop:bg-black/40"
    >
      <div className="relative px-6 pb-6 pt-14">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-surface-2 text-fg transition hover:brightness-95"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <h2 id="confirm-title" className="text-2xl font-bold tracking-tight">{title}</h2>
        <p id="confirm-message" className="mt-2 text-[15px] leading-relaxed text-muted">{message}</p>
        {/* Full-width stacked buttons: the primary one on top, the secondary one below. */}
        <div className={`mt-6 flex gap-3 ${darkPattern ? 'flex-col-reverse' : 'flex-col'}`}>
          {darkPattern ? (
            <Button variant="link" size="xs" block onClick={onConfirm}>{confirmLabel}</Button>
          ) : (
            <Button variant="solid" color={color} size="md" block onClick={onConfirm}>{confirmLabel}</Button>
          )}
          <Button variant={darkPattern ? 'tinted' : 'neutral'} color={color} size="md" block autoFocus onClick={onCancel}>{cancelLabel}</Button>
        </div>
      </div>
    </dialog>
  );
}
export default ConfirmDialog;
