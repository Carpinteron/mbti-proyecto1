import type { ComponentProps } from 'react';
import { Link } from 'react-router';

type Variant = 'solid' | 'tinted' | 'outline' | 'neutral' | 'link';
type Color = 'accent' | 'danger';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'pill';

interface StyleProps {
  variant?: Variant;
  color?: Color;
  size?: Size;
  /** Full width. */
  block?: boolean;
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-bold transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<Variant, Record<Color, string>> = {
  solid: {
    accent: 'bg-accent text-on-accent shadow-lg hover:brightness-110 disabled:hover:brightness-100',
    danger: 'bg-danger text-on-accent shadow-lg hover:brightness-110 disabled:hover:brightness-100',
  },
  tinted: {
    accent: 'bg-accent/65 text-fg hover:bg-accent/80',
    danger: 'bg-danger/65 text-fg hover:bg-danger/80',
  },
  outline: {
    accent: 'border border-accent text-accent hover:bg-accent/10',
    danger: 'border border-danger text-danger hover:bg-danger/10',
  },
  neutral: {
    accent: 'border border-line text-muted hover:bg-surface-2 hover:text-fg',
    danger: 'border border-line text-muted hover:bg-surface-2 hover:text-fg',
  },
  link: {
    accent: 'text-muted underline underline-offset-4 hover:text-fg',
    danger: 'text-muted underline underline-offset-4 hover:text-fg',
  },
};

const SIZES: Record<Size, string> = {
  xs: 'px-2 py-1 text-xs font-normal',
  sm: 'rounded-md px-3 py-2 text-sm',
  md: 'rounded-xl px-5 py-3.5',
  lg: 'rounded-full px-10 py-4',
  pill: 'rounded-full px-5 py-2',
};


export function buttonClass({ variant = 'solid', color = 'accent', size = 'lg', block = false }: StyleProps = {}): string {
  return [BASE, VARIANTS[variant][color], SIZES[size], block ? 'w-full' : ''].filter(Boolean).join(' ');
}

type ButtonProps = StyleProps & ComponentProps<'button'>;

export function Button({ variant, color, size, block, className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`${buttonClass({ variant, color, size, block })} ${className}`.trim()} {...props} />;
}

type LinkButtonProps = StyleProps & ComponentProps<typeof Link>;


export function LinkButton({ variant, color, size, block, className = '', ...props }: LinkButtonProps) {
  return <Link className={`${buttonClass({ variant, color, size, block })} ${className}`.trim()} {...props} />;
}
