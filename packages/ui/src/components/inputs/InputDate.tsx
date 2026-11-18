'use client';

import type { ReactNode } from 'react';
import { faAsterisk, faCopy, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../buttons/Button';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors } from '../../lib/types';

export type InputDateVariant = 'danger' | 'warning' | 'info' | 'success' | 'default';

export interface InputDateProps {
  small?: boolean;
  variant?: InputDateVariant;
  id?: string;
  name?: string;
  value?: string;
  label?: ReactNode;
  hint?: ReactNode;
  helperText?: ReactNode;
  required?: boolean | RequiredFieldErrors;
  disabled?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  copy?: boolean;
  className?: string;
  onChange?: (id: string, value: string) => void;
  onBlur?: (id: string, value: string) => void;
}

const VARIANT_CLASSES: Record<InputDateVariant, string> = {
  danger: 'border-danger text-danger-text',
  warning: 'border-warning text-warning',
  info: 'border-info text-info-text',
  success: 'border-success text-success',
  default: 'border-border text-content-muted',
};

function toInputValue(value?: string): string {
  if (!value) return '';
  const ddMMyyyy = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (ddMMyyyy.test(value)) {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  }
  return value;
}

/** Native date input with dd/MM/yyyy compatibility and optional copy action. */
export function InputDate({
  small,
  variant = 'default',
  id,
  name,
  value,
  label,
  hint,
  helperText,
  required,
  disabled,
  placeholder,
  minDate,
  maxDate,
  copy,
  className,
  onChange,
  onBlur,
}: InputDateProps) {
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);
  const inputValue = toInputValue(value);

  return (
    <div
      className={cn(
        'relative w-full border rounded-md bg-input focus-within:ring-2 focus-within:ring-focus mt-1',
        hasError ? 'border-danger text-danger-text' : 'border-input-border text-content-muted',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {label && (
        <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
          <label htmlFor={id}>
            <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0', VARIANT_CLASSES[variant], 'mb-0 pb-0')}>
              {label}
            </FieldLabel>
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
      <div className='flex relative'>
        <input
          id={id}
          name={name || id}
          required={isRequired}
          value={inputValue}
          min={minDate || '1970-01-01'}
          max={maxDate || '2200-12-31'}
          disabled={disabled}
          placeholder={placeholder || ''}
          onChange={(event) => onChange?.(event.target.id, event.target.value)}
          onBlur={(event) => onBlur?.(event.target.id, event.target.value)}
          type='date'
          className={cn(
            small ? 'py-1 pr-1.5 text-xs' : 'p-2 text-base',
            'rounded-lg block w-full bg-transparent text-content border-none focus:outline-none',
            disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
          )}
        />
        {hasError && (
          <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
        )}
        {helperText && <div className='text-xs text-info-text'>{helperText}</div>}
        {copy && (
          <TooltipComponent content='Copiar data' asChild>
            <div>
              <Button
                onClick={() => {
                  if (!inputValue) return;
                  const [year, month, day] = inputValue.split('-');
                  void navigator.clipboard?.writeText(`${day}/${month}/${year}`);
                }}
                className='text-primary-text border border-border h-full rounded-md shadow px-2 py-1 ml-2 hover:bg-primary hover:text-primary-content'
                aria-label='Copiar data'
              >
                <FontAwesomeIcon icon={faCopy} width='15' height='15' />
              </Button>
            </div>
          </TooltipComponent>
        )}
      </div>
    </div>
  );
}

export default InputDate;
