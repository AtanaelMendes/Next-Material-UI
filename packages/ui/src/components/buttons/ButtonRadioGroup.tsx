'use client';

import { useCallback } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ButtonRadioOption {
  label: ReactNode;
  value: string | number;
}

export interface ButtonRadioGroupProps {
  id?: string;
  options?: ButtonRadioOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
}

/** Segmented control built from buttons. */
export function ButtonRadioGroup({ id, options = [], value, onChange, className }: ButtonRadioGroupProps) {
  const handleOptionChange = useCallback(
    (next: string | number) => {
      onChange?.(next);
    },
    [onChange],
  );

  return (
    <div
      role='group'
      className={cn('inline-flex rounded-lg border border-border bg-surface', className)}
    >
      {options.map((option, index) => {
        const selected = value === option.value;
        return (
          <button
            key={`${id}_${index}`}
            name={id}
            type='button'
            aria-pressed={selected}
            onClick={() => handleOptionChange(option.value)}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-colors duration-200',
              index === 0 && 'rounded-l-lg',
              index === options.length - 1 && 'rounded-r-lg',
              index > 0 && 'border-l border-border',
              selected
                ? 'bg-primary text-primary-content border-primary shadow-sm'
                : 'bg-surface text-content-secondary hover:bg-hover hover:text-content',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default ButtonRadioGroup;
