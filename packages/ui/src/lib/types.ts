import type { HTMLAttributes, ReactNode } from 'react';

/** Shared props accepted by most visual components. */
export interface BaseProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  className?: string;
  children?: ReactNode;
}

export type ComponentSize = 'small' | 'medium' | 'large';

export type SemanticColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ghost';

/** A single selectable option used by Select and Combobox. */
export interface UIOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

/** Validation state keyed by field id, as used by the form inputs. */
export type RequiredFieldErrors = Record<string, { error?: boolean; errorMsg?: string }>;
