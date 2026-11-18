'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  dataTestId?: string;
  children?: ReactNode;
}

export function DrawerContent({ children, className = '', dataTestId, ...props }: DrawerContentProps) {
  return (
    <div
      data-testid={dataTestId || ((props as Record<string, unknown>)['data-testid'] as string | undefined) || 'drawer-content'}
      className={cn('flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}
