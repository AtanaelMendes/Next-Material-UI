'use client';

import type { ReactNode } from 'react';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';

export interface ButtonGroupItem {
  id?: string;
  label: ReactNode;
  tooltip?: ReactNode;
  onclick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface ButtonGroupProps {
  buttons?: ButtonGroupItem[];
  small?: boolean;
  className?: string;
  vertical?: boolean;
}

/** Group of outlined buttons, optionally stacked vertically, with tooltips. */
export function ButtonGroup({ buttons = [], small, className, vertical }: ButtonGroupProps) {
  return (
    <div className={cn('flex', vertical ? 'flex-col' : 'flex-row')}>
      {buttons.map((btn, index) => (
        <div key={`${btn.id}_${index + 1}`} id={`${btn.id}_${index + 1}`} className={cn(className, btn.className)}>
          <TooltipComponent
            content={<span className='font-semibold'>{btn.tooltip || ''}</span>}
            asChild
          >
            <button
              type='button'
              onClick={() => btn.onclick?.()}
              disabled={btn.disabled}
              className={cn(
                'text-sm font-medium bg-surface text-content border border-border',
                'hover:bg-hover hover:text-primary-text',
                'focus:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background',
                'disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-disabled disabled:text-disabled-content disabled:border-border disabled:hover:bg-disabled disabled:hover:text-disabled-content',
                small ? ' px-2 py-1 ' : 'px-4 py-2',
                btn.className,
              )}
            >
              {btn.label}
            </button>
          </TooltipComponent>
        </div>
      ))}
    </div>
  );
}

export default ButtonGroup;
