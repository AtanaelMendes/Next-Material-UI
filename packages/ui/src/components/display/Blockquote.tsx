import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type BlockquoteType = 'default' | 'danger' | 'success' | 'warning' | 'primary';
export type BlockquoteSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BlockquoteProps {
  children?: ReactNode;
  type?: BlockquoteType;
  size?: BlockquoteSize;
  className?: string;
}

const BLOCK_TYPE: Record<BlockquoteType, string> = {
  danger: ' border-danger bg-danger-subtle text-danger-subtle-content',
  success: ' border-success bg-success-subtle text-success-subtle-content',
  warning: ' border-warning bg-warning-subtle text-warning-subtle-content',
  primary: ' border-primary bg-info-subtle text-info-subtle-content',
  default: ' border-border bg-surface-muted text-content-secondary',
};

const BLOCK_SIZE: Record<BlockquoteSize, string> = {
  xs: 'p-1 text-xs',
  sm: 'p-2 text-sm',
  md: 'py-4 px-2 text-base',
  lg: 'py-5 px-2 text-lg',
};

/** Left-bordered callout for quotes and notices. */
export function Blockquote({ children, type = 'default', className, size = 'sm' }: BlockquoteProps) {
  return (
    <div
      className={cn(
        'rounded text-wrap break-words border-l-4',
        BLOCK_SIZE[size],
        BLOCK_TYPE[type],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Blockquote;
