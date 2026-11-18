'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface DrawerFooterProps extends HTMLAttributes<HTMLElement> {
  dataTestId?: string;
  children?: ReactNode;
}

export function DrawerFooter({ children, className = '', dataTestId, ...props }: DrawerFooterProps) {
  return (
    <footer
      data-testid={dataTestId || ((props as Record<string, unknown>)['data-testid'] as string | undefined) || 'drawer-footer'}
      className={cn('p-4 border-t border-border bg-surface-secondary/50 shrink-0', className)}
      {...props}
    >
      {children}
    </footer>
  );
}
