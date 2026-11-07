import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import FormField, { type FieldState } from './FormField';
import { useConfirm } from '../../context/ConfirmContext';
import { useToast } from '../../context/ToastContext';
import type { ContactFormData } from '../../types';
import { CONTACT_FIELDS, MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH, validateContact, type ContactField } from '../../utils/validation';

const EMPTY_FORM: ContactFormData = { name: '', email: '', message: '' };
const NOT_TOUCHED: Record<ContactField, boolean> = { name: false, email: false, message: false };

function ContactForm() {
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  // An error is only shown after the user leaves the field (or tries to submit).
  const [touched, setTouched] = useState(NOT_TOUCHED);
  const errors = validateContact(form);
  const isValid = CONTACT_FIELDS.every((field) => !errors[field]);

  const touch = (field: ContactField) => setTouched((current) => ({ ...current, [field]: true }));
  const change = (field: ContactField, value: string) => setForm((current) => ({ ...current, [field]: value }));

  function stateOf(field: ContactField): FieldState {
    if (!touched[field]) return 'neutral';
    return errors[field] ? 'error' : 'ok';
  }

  function inputClass(field: ContactField) {
    const base = 'w-full rounded-xl border bg-surface px-4 py-3 text-base text-fg outline-none transition placeholder:text-muted/70 focus:ring-4 sm:text-sm';
    const state = stateOf(field);
    if (state === 'error') return `${base} border-danger focus:ring-danger/20`;
    if (state === 'ok') return `${base} border-success focus:ring-success/20`;
    return `${base} border-line focus:border-accent focus:ring-accent/20`;
  }

  const controlProps = (field: ContactField) => ({
    id: field,
    name: field,
    value: form[field],
    required: true,
    onBlur: () => touch(field),
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => change(field, event.target.value),
    'aria-invalid': stateOf(field) === 'error',
    'aria-describedby': stateOf(field) === 'error' ? `${field}-error` : undefined,
    className: inputClass(field),
  });
  const errorOf = (field: ContactField) => (stateOf(field) === 'error' ? errors[field] : undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!isValid) {
      showToast('error', 'Please fix the highlighted fields before sending.');
      const firstInvalid = CONTACT_FIELDS.find((field) => errors[field]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    const data: ContactFormData = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim() };
    // Honest dialog: the main action (send) is the most visible one.
    const confirmed = await confirm({
      tone: 'primary',
      title: 'Send this message?',
      message: `We will reply to ${data.email}. Make sure it is correct.`,
      confirmLabel: 'Send message',
      cancelLabel: 'Keep editing',
    });

    if (!confirmed) {
      showToast('info', 'Your message was not sent. You can keep editing it.');
      return;
    }
    showToast('success', `Thanks, ${data.name}! Your message was sent.`);
    setForm(EMPTY_FORM);
    setTouched(NOT_TOUCHED);
  }

  const length = form.message.length;

  return (
    <form className="grid gap-5 rounded-3xl border border-line bg-surface/60 p-5 shadow-lg sm:p-8" onSubmit={handleSubmit} noValidate>
      <div>
        <h2 className="text-2xl font-bold">Contact us</h2>
        <p className="mt-1 text-sm text-muted">All fields are required.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" error={errorOf('name')}>
          <input {...controlProps('name')} autoComplete="name" placeholder="Your name" />
        </FormField>
        <FormField id="email" label="Email" error={errorOf('email')}>
          <input {...controlProps('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" />
        </FormField>
      </div>
      <FormField
        id="message"
        label="Message"
        error={errorOf('message')}
        aside={
          <span className={`text-xs font-medium tabular-nums ${length > 0 && length < MIN_MESSAGE_LENGTH ? 'text-danger' : 'text-muted'}`} aria-hidden="true">
            {length}/{MAX_MESSAGE_LENGTH}
          </span>
        }
      >
        <textarea {...controlProps('message')} rows={5} maxLength={MAX_MESSAGE_LENGTH} placeholder="Tell us what is on your mind..." className={`${inputClass('message')} min-h-32 resize-y`} />
      </FormField>
      <Button type="submit" size="md" disabled={!isValid} className="active:scale-[.99] sm:w-auto sm:justify-self-end sm:px-8" block>
        Send message
      </Button>
    </form>
  );
}

export default ContactForm;
