'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { faAsterisk, faInfoCircle, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SmallLoading } from '../feedback/SmallLoading';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors } from '../../lib/types';

export type InputTextMask = 'cpf' | 'cnpj' | 'cep' | 'phone' | 'currency' | 'numeric' | 'numeric2';

export interface InputTextProps {
  value?: string;
  label?: ReactNode;
  onChange?: (id: string, value: string) => void;
  onBlur?: (id: string, value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean | RequiredFieldErrors;
  mask?: InputTextMask;
  small?: boolean;
  large?: boolean;
  helperText?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  hint?: ReactNode;
  maxLength?: number;
  loading?: boolean;
  clearable?: boolean;
  className?: string;
  type?: string;
}

const maskCPF = (value: string) => {
  if (!value) return '';
  let masked = value.replace(/\D/g, '').slice(0, 11);
  masked = masked
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return masked;
};

const maskCNPJ = (value: string) => {
  if (!value) return '';
  let masked = value.replace(/\D/g, '').slice(0, 14);
  masked = masked
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
  return masked;
};

const maskCEP = (value: string) => {
  let cep = value.replace(/\D/g, '');
  if (cep.length > 5) cep = `${cep.substring(0, 5)}-${cep.substring(5, 8)}`;
  return cep.substring(0, 9);
};

const maskPhone = (value: string) => {
  if (!value) return '';
  let masked = value.replace(/\D/g, '');
  if (masked.length <= 10) masked = masked.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  else masked = masked.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  return masked.substring(0, 15);
};

const maskCurrency = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits === '') return '';
  const cents = digits.slice(-2);
  let integer = digits.slice(0, -2);
  integer = integer === '' ? '0' : parseInt(integer, 10).toString();
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${integer},${cents}`;
};

export function applyMask(value: string, mask?: InputTextMask): string {
  switch (mask) {
    case 'cep':
      return maskCEP(value);
    case 'cnpj':
      return maskCNPJ(value);
    case 'cpf':
      return maskCPF(value);
    case 'currency':
      return maskCurrency(value);
    case 'numeric':
      return value.replace(/[^\d]/g, '');
    case 'numeric2':
      return value.replace(/[^\d-]/g, '');
    case 'phone':
      return maskPhone(value);
    default:
      return value;
  }
}

/** Text input with masks, clear action and validation state. */
export function InputText({
  value,
  label,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  id,
  name,
  required,
  mask,
  small,
  large,
  helperText,
  disabled,
  readOnly,
  hint,
  maxLength,
  loading,
  clearable,
  className,
  type,
}: InputTextProps) {
  const [inputValue, setInputValue] = useState(value || '');
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  useEffect(() => {
    setInputValue(applyMask(value || '', mask));
  }, [value, mask]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const masked = applyMask(event.target.value, mask);
      setInputValue(masked);
      onChange?.(event.target.id, masked);
    },
    [mask, onChange],
  );

  const clearValue = useCallback(() => {
    setInputValue('');
    onChange?.(id || '', '');
  }, [id, onChange]);

  return (
    <>
      <div className='relative w-full'>
        {label && (
          <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
            <label htmlFor={id}>
              <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>
                {label}
              </FieldLabel>
            </label>
            {isRequired && (
              <FontAwesomeIcon icon={faAsterisk} width='8' height='8' color='red' className='self-start absolute' />
            )}
            {hint && (
              <TooltipComponent asChild content={hint} usePortal={false}>
                <FontAwesomeIcon icon={faInfoCircle} width='16' height='16' color='blue' className='self-start ml-2' tabIndex={-1} />
              </TooltipComponent>
            )}
          </div>
        )}
        <input
          id={id}
          type={type || 'text'}
          name={name || id}
          required={isRequired}
          disabled={disabled}
          readOnly={readOnly}
          onBlur={(event) => onBlur?.(event.target.id, applyMask(event.target.value, mask))}
          onChange={handleChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onChange?.(event.currentTarget.id, applyMask(event.currentTarget.value, mask));
            onKeyDown?.(event);
          }}
          maxLength={maxLength}
          value={applyMask(inputValue, mask)}
          placeholder={placeholder || ''}
          aria-invalid={hasError || undefined}
          className={cn(
            'block w-full p-2 rounded-lg border bg-input text-content text-sm placeholder:text-content-muted',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-focus',
            hasError ? 'border-danger' : 'border-input-border',
            mask === 'currency' && 'pl-6',
            small && 'py-1.5 pr-1.5 text-xs',
            large && 'py-3 pr-3 text-base',
            disabled && 'bg-disabled text-disabled-content cursor-not-allowed placeholder:text-disabled-content',
            readOnly && 'bg-surface-muted cursor-default',
            className,
          )}
        />
        {clearable && inputValue && !disabled && !readOnly && (
          <button
            type='button'
            aria-label='Limpar campo'
            onClick={clearValue}
            className='absolute top-1/2 -translate-y-1/2 right-2 w-5 h-5 flex items-center justify-center cursor-pointer rounded-full text-content-muted hover:text-primary-text hover:bg-hover active:bg-surface-muted transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus'
          >
            <FontAwesomeIcon icon={faX} width='10' height='10' className='transform hover:scale-110 transition-transform duration-150' />
          </button>
        )}
        {loading && (
          <div className='absolute bottom-2 right-2'>
            <SmallLoading active={loading} />
          </div>
        )}
        {mask === 'currency' && (
          <div className={cn('absolute left-2 text-content-secondary text-sm', small ? 'bottom-1' : 'bottom-2.25')}>
            R$
          </div>
        )}
        {helperText && <div className='text-xs text-info-text absolute -bottom-3 right-0'>{helperText}</div>}
      </div>
      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
    </>
  );
}

export default InputText;
