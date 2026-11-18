'use client';

import type { ReactNode } from 'react';
import { faAsterisk, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors } from '../../lib/types';

export interface InputMonthProps {
  id?: string;
  name?: string;
  value?: string;
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  required?: boolean | RequiredFieldErrors;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onChange?: (id: string, value: string) => void;
}

function toInputMonth(value?: string): string {
  if (!value) return '';
  const mmYYYY = /^(0[1-9]|1[0-2])\/(\d{4})$/;
  if (mmYYYY.test(value)) {
    const [month, year] = value.split('/');
    return `${year}-${month}`;
  }
  return value;
}

/** Native month input with MM/yyyy compatibility. */
export function InputMonth({
  id,
  name,
  value,
  label,
  hint,
  helperText,
  required,
  disabled,
  placeholder,
  className,
  onChange,
}: InputMonthProps) {
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  return (
    <div className='relative w-full'>
      {label && (
        <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
          <label htmlFor={id}>
            <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>{label}</FieldLabel>
          </label>
          {isRequired && (
            <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start absolute' />
          )}
          {hint && (
            <TooltipComponent content={<div className='text-xs z-20 max-w-75'>{hint}</div>} asChild>
              <FontAwesomeIcon icon={faInfoCircle} width='16' height='16' color='blue' className='self-start ml-2' tabIndex={-1} />
            </TooltipComponent>
          )}
        </div>
      )}
      <input
        id={id}
        name={name || id}
        required={isRequired}
        value={toInputMonth(value)}
        disabled={disabled}
        placeholder={placeholder || ''}
        onChange={(event) => onChange?.(event.target.id, event.target.value)}
        type='month'
        aria-invalid={hasError || undefined}
        className={cn(
          'rounded-lg block w-full p-2 bg-input text-content text-sm placeholder:text-content-muted',
          'focus:outline-none focus-visible:ring-2 focus-visible:border-focus border',
          hasError ? 'border-danger focus-visible:ring-danger' : 'border-input-border focus-visible:ring-focus',
          disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
          className,
        )}
      />
      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
      {helperText && <div className='text-xs text-info-text'>{helperText}</div>}
    </div>
  );
}

export default InputMonth;
