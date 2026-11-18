import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type BalloonPlacement = 'bottom' | 'top' | 'left' | 'right';
export type BalloonColor = 'primary' | 'warning' | 'danger' | 'success' | 'dark' | 'default';

export interface BalloonProps {
  visible?: boolean;
  reload?: boolean;
  placement?: BalloonPlacement;
  color?: BalloonColor;
  children?: ReactNode;
  className?: string;
}

const COLORS: Record<BalloonColor, string> = {
  primary: 'bg-blue-500 text-white shadow-blue-500',
  warning: 'bg-yellow-500 text-warning-content shadow-yellow-500',
  danger: 'bg-red-500 text-white shadow-red-500',
  success: 'bg-green-500 text-white shadow-green-500',
  dark: 'bg-gray-800 text-white shadow-gray-800',
  default: 'bg-surface-elevated text-content shadow-blue-500',
};

const PLACEMENT: Record<BalloonPlacement, string> = {
  bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
};

/** Material-style balloon/snackbar callout. */
export function Balloon({ visible, placement = 'bottom', color = 'default', children, className }: BalloonProps) {
  if (!visible) return null;

  return (
    <div
      role='status'
      className={cn(
        'absolute z-20 flex items-center justify-center rounded-lg border border-border p-2 animate-bounce shadow-md',
        COLORS[color] || COLORS.default,
        PLACEMENT[placement] || PLACEMENT.bottom,
        className,
      )}
    >
      <div className='rounded-lg text-nowrap text-sm'>{children}</div>
    </div>
  );
}

export default Balloon;
