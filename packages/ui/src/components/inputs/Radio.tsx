'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RadioProps {
  onChange?: (id: string, value: string, checked: boolean) => void;
  onClick?: () => void;
  id?: string;
  checked?: boolean;
  value?: string | number;
  name?: string;
  required?: boolean;
  className?: string;
  label?: ReactNode;
  disabled?: boolean;
}

/** Accessible radio input with a label. */
export function Radio({
  onChange,
  onClick,
  id,
  checked,
  value,
  name,
  required,
  className,
  label,
  disabled,
}: RadioProps) {
  return (
    <div className={cn('flex items-center', disabled && 'cursor-not-allowed', className)}>
      <input
        id={id}
        type='radio'
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.id, event.target.value, event.target.checked)}
        onClick={() => onClick?.()}
        value={value ?? ''}
        name={name || id}
        required={required}
        className='w-4 h-4 accent-primary bg-input border-input-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:bg-disabled disabled:cursor-not-allowed'
      />
      <label
        htmlFor={id}
        className={cn(
          'ms-2 text-sm font-medium select-none',
          disabled ? 'text-disabled-content cursor-not-allowed' : 'text-content cursor-pointer',
        )}
      >
        {label}
      </label>
    </div>
  );
}

export default Radio;
