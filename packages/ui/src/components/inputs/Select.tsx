'use client';

import type { ReactNode } from 'react';
import { faAsterisk, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../buttons/Button';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors, UIOption } from '../../lib/types';

export interface SelectProps {
  label?: ReactNode;
  value?: string | number;
  id?: string;
  name?: string;
  options?: UIOption[];
  placeholder?: string;
  onChange?: (id: string, value: string) => void;
  hideClearButton?: boolean;
  required?: boolean | RequiredFieldErrors;
  disabled?: boolean;
  hint?: ReactNode;
  helperText?: ReactNode;
  loadingLabel?: string;
  className?: string;
}

/** Native select with floating label, validation and a clear button. */
export function Select({
  label,
  value,
  id,
  name,
  options,
  placeholder,
  onChange,
  hideClearButton,
  required,
  disabled,
  hint,
  helperText,
  loadingLabel = 'Carregando...',
  className,
}: SelectProps) {
  const errorMap = typeof required === 'object' ? required : undefined;
  const isRequired = required === true;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  return (
    <>
      <div className={cn('w-full relative', className)}>
        {label && (
          <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
            <label htmlFor={id}>
              <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>
                {label}
              </FieldLabel>
            </label>
            {isRequired && (
              <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start absolute' />
            )}
            {hint && (
              <TooltipComponent content={<div className='text-xs z-100 max-w-75'>{hint}</div>} asChild usePortal={false}>
                <span>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    width='16'
                    height='16'
                    color='blue'
                    className='self-start ml-2'
                    tabIndex={-1}
                  />
                </span>
              </TooltipComponent>
            )}
          </div>
        )}
        <select
          id={id}
          value={value}
          disabled={disabled}
          name={name || id}
          onChange={(event) => onChange?.(event.target.id, event.target.value)}
          className={cn(
            'bg-input text-content text-sm rounded-lg border block w-full p-2 pr-16',
            'focus:outline-none focus-visible:ring-2 focus-visible:border-focus',
            hasError ? 'border-danger focus-visible:ring-danger' : 'border-input-border focus-visible:ring-focus',
            disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
          )}
        >
          {placeholder && <option value=''>{placeholder}</option>}
          {!options ? (
            <option>{loadingLabel}</option>
          ) : (
            options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))
          )}
        </select>
        {!hideClearButton && (
          <Button
            disabled={disabled || !value}
            aria-label='Limpar seleção'
            className='absolute inset-y-0 right-6 top-[0.3rem] h-7'
            size='small'
            onClick={() => onChange?.(id || '', '')}
            pill
          >
            <FontAwesomeIcon icon={faXmark} width='18' height='18' />
          </Button>
        )}
        {hasError && (
          <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
        )}
      </div>
      {helperText && <div className='text-xs text-info-text pl-1'>{helperText}</div>}
    </>
  );
}

export default Select;
