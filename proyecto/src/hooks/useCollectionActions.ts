import { useCallback } from 'react';
import { useCollection } from '../context/CollectionContext';
import { useConfirm } from '../context/ConfirmContext';
import { useToast } from '../context/ToastContext';

/** Collection actions that include the confirmation dialog and the toast feedback. */
export function useCollectionActions() {
  const { isSaved, save, remove } = useCollection();
  const { confirm } = useConfirm();
  const { showToast } = useToast();

  const requestRemove = useCallback(
    async (code: string) => {
      // ====================== INTENTIONAL DARK PATTERN ======================
      // Removing a favorite uses two deceptive techniques, on purpose and only
      // for teaching purposes (see ConfirmDialog for the visual part):
      //  1. Confirmshaming: the confirm button says "Yes, I don't care about
      //     this profile", making the user feel guilty for doing what they asked.
      //  2. Inverted hierarchy (darkPattern): "Keep it" is the big, colored
      //     button and the real action is a small gray link.
      // Simulated business goal: retain saved items. The honest version would
      // use confirmLabel="Remove" and darkPattern={false}.
      // ======================================================================
      const confirmed = await confirm({
        tone: 'danger',
        darkPattern: true,
        title: 'Remove from collection?',
        message: 'This will disappear from your collection. You will lose quick access to it.',
        confirmLabel: "Yes, I don't care about this profile",
        cancelLabel: 'Keep it',
      });
      if (confirmed) {
        remove(code);
        showToast('success', 'Personality removed from collection.');
      } else {
        showToast('info', 'No changes made. The profile is still in your collection.');
      }
    },
    [confirm, remove, showToast],
  );

  const toggle = useCallback(
    (code: string) => {
      if (isSaved(code)) {
        void requestRemove(code);
        return;
      }
      save(code);
      showToast('success', 'Personality saved to collection.');
    },
    [isSaved, requestRemove, save, showToast],
  );

  return { toggle, requestRemove };
}
