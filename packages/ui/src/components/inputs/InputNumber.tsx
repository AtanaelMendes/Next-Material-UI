'use client';

import type { ReactNode } from 'react';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldLabel } from '../display/Typography';
import { cn } from '../../lib/cn';
import { empty } from '../../lib/utils';
import type { RequiredFieldErrors } from '../../lib/types';

export interface InputNumberProps {
  label?: ReactNode;
  value?: string | number;
  onChange?: (id: string, value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean | RequiredFieldErrors;
  small?: boolean;
  large?: boolean;
  helperText?: ReactNode;
  min?: number | string;
  max?: number | string;
  disabled?: boolean;
  className?: string;
  step?: number;
}

/** Number input with min/max and required validation. */
export function InputNumber({
  label,
  value,
  onChange,
  placeholder,
  id,
  name,
  required,
  small,
  large,
  helperText,
  min,
  max,
  disabled,
  className,
  step,
}: InputNumberProps) {
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;

  const errorMessage = (() => {
    if (errorMap && id && errorMap[id]?.error) return errorMap[id]?.errorMsg || 'Este campo é obrigatório';
    if (!empty(min) && Number(value) < Number(min)) return `O valor mínimo permitido é ${min}`;
    if (!empty(max) && Number(value) > Number(max)) return `O valor máximo permitido é ${max}`;
    return '';
  })();

  return (
    <div className='w-full relative'>
      {label && (
        <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
          <label htmlFor={id}>
            <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>{label}</FieldLabel>
          </label>
          {isRequired && (
            <FontAwesomeIcon icon={faAsterisk} width='8' height='8' color='red' className='self-start absolute' />
          )}
        </div>
      )}

      <input
        id={id}
        type='number'
        min={min}
        max={max}
        step={step}
        value={value}
        name={name || id}
        disabled={disabled}
        required={isRequired}
        onChange={(event) => onChange?.(event.target.id, event.target.value)}
        aria-invalid={Boolean(errorMessage) || undefined}
        className={cn(
          'rounded-lg block w-full border bg-input text-content text-sm placeholder:text-content-muted',
          'focus:outline-none focus-visible:ring-2 focus-visible:border-focus',
          errorMessage ? 'border-danger focus-visible:ring-danger' : 'border-input-border focus-visible:ring-focus',
          disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
          small ? 'p-1.5 text-xs' : large ? 'p-3 text-base' : 'p-2',
          className,
        )}
        placeholder={placeholder || ''}
      />
      {errorMessage && <div className='text-xs text-danger-text'>{errorMessage}</div>}
      {helperText && <div className='text-xs text-info-text absolute -bottom-3 right-0'>{helperText}</div>}
    </div>
  );
}

export default InputNumber;
