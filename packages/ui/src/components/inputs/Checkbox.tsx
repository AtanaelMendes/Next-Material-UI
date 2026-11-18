'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  value?: string | number;
  required?: boolean;
  label?: ReactNode;
  onChange?: (id: string, checked: boolean) => void;
  className?: string;
}

/** Accessible checkbox with an optional label. */
export function Checkbox({ id, checked, disabled, value, required, label, onChange, className }: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-center',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        id={id}
        name={id}
        type='checkbox'
        onChange={(event) => onChange?.(event.target.id, event.target.checked)}
        checked={checked}
        disabled={disabled}
        value={value}
        required={required}
        className={cn(
          'w-4 h-4 accent-primary bg-input border-input-border rounded',
          disabled ? 'bg-disabled cursor-not-allowed' : 'cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        )}
      />
      {label && (
        <span className={cn('ms-2 text-sm font-medium', disabled ? 'text-disabled-content' : 'text-content')}>
          {label}
        </span>
      )}
    </label>
  );
}

export default Checkbox;
