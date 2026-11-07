import type { GroupKey } from '../utils/groups';

export type Group = 'all' | GroupKey;

export interface PersonalityType {
  code: string;
  name: string;
  title: string;
}

export interface PersonalityProfile extends PersonalityType {
  cognitive: string;
  strengths: string[];
  shadow: string[];
  drains: string[];
  url?: string;
}

export type Theme = 'light' | 'dark';

export type ToastKind = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  kind: ToastKind;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
