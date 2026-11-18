import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type PillsBadgeType =
  | 'default'
  | 'primary'
  | 'primary-dark'
  | 'danger'
  | 'success'
  | 'warning'
  | 'warning-dark';

export interface PillsBadgeProps {
  type?: PillsBadgeType;
  small?: boolean;
  className?: string;
  children?: ReactNode;
}

const PILL_STYLES: Record<PillsBadgeType, string> = {
  default: 'bg-surface-muted text-content-secondary border border-border',
  primary: 'bg-info-subtle text-info-subtle-content border border-info-border',
  'primary-dark': 'bg-primary text-primary-content border border-primary',
  danger: 'bg-danger-subtle text-danger-subtle-content border border-danger-border',
  success: 'bg-success-subtle text-success-subtle-content border border-success-border',
  warning: 'bg-warning-subtle text-warning-subtle-content border border-warning-border',
  'warning-dark': 'bg-warning text-warning-content border border-warning',
};

/** Pill/badge element with semantic colour variants. */
export function PillsBadge({ type = 'default', children, small, className }: PillsBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium whitespace-nowrap',
        small ? 'px-1.5 py-0.5' : 'px-2 py-0.5',
        'rounded-full',
        PILL_STYLES[type],
        small ? 'text-xs' : 'text-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}

export default PillsBadge;
