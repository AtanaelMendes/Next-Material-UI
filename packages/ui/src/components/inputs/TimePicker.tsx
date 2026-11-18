'use client';

import type { ReactNode } from 'react';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';

export interface TimePickerProps {
  value?: string;
  onChange?: (id: string, value: string) => void;
  label?: ReactNode;
  required?: boolean;
  id?: string;
  className?: string;
  disabled?: boolean;
}

/** Native time input. */
export function TimePicker({ value, onChange, label, required, id, className, disabled }: TimePickerProps) {
  return (
    <>
      {label && (
        <label htmlFor={id || 'time'} className='inline-flex mb-2 text-sm font-medium text-content'>
          {required && (
            <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start mr-1' />
          )}
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type='time'
          id={id || 'time'}
          disabled={disabled}
          className={cn(
            'bg-input border leading-none border-input-border text-content text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-focus block w-full p-2 disabled:bg-disabled disabled:text-disabled-content disabled:cursor-not-allowed',
            className,
          )}
          value={value || ''}
          required={required}
          onChange={(event) => onChange?.(event.target.id, event.target.value)}
        />
      </div>
    </>
  );
}

export default TimePicker;
