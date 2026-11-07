import type { ContactFormData } from '../types';

export type ContactField = keyof ContactFormData;

export const CONTACT_FIELDS: ContactField[] = ['name', 'email', 'message'];
export const MIN_MESSAGE_LENGTH = 10;
export const MAX_MESSAGE_LENGTH = 500;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns the error message for each field, or an empty string when the field is valid. */
export function validateContact(form: ContactFormData): Record<ContactField, string> {
  const name = form.name.trim();
  const email = form.email.trim();
  const message = form.message.trim();

  return {
    name: !name ? 'Please enter your name.' : name.length < 2 ? 'Your name needs at least 2 characters.' : '',
    email: !email ? 'Please enter your email.' : !EMAIL_PATTERN.test(email) ? 'Enter a valid email, like name@example.com.' : '',
    message: !message
      ? 'Please write a message.'
      : message.length < MIN_MESSAGE_LENGTH
        ? `Write at least ${MIN_MESSAGE_LENGTH} characters (${message.length}/${MIN_MESSAGE_LENGTH}).`
        : '',
  };
}
