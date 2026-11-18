'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { faAsterisk, faEye, faEyeSlash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import type { RequiredFieldErrors } from '../../lib/types';

export interface InputPasswordProps {
  onKeyDown?: () => void;
  onChange?: (id: string, value: string) => void;
  onBlur?: (id: string, value: string) => void;
  value?: string;
  required?: boolean | RequiredFieldErrors;
  label?: ReactNode;
  id?: string;
  hint?: ReactNode;
  maxLength?: number;
  showTogglePassword?: boolean;
  placeholder?: string;
}

/** Password input with a visibility toggle. */
export function InputPassword({
  onKeyDown,
  onChange,
  onBlur,
  value,
  required,
  label,
  id,
  hint,
  maxLength,
  showTogglePassword = true,
  placeholder = '•••••••••',
}: InputPasswordProps) {
  const [visible, setVisible] = useState(false);
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const errorKey = id || 'password';
  const hasError = Boolean(errorMap?.[errorKey]?.error);

  return (
    <>
      {label && (
        <div className='flex relative'>
          <label htmlFor={id}>
            <FieldLabel className={isRequired ? 'ml-4' : ''}>{label}</FieldLabel>
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

      <div className='relative'>
        <input
          required={isRequired}
          id={errorKey}
          value={value}
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onKeyDown?.();
          }}
          onChange={(event) => onChange?.(event.target.id, event.target.value)}
          onBlur={(event) => onBlur?.(event.target.id, event.target.value)}
          maxLength={maxLength}
          type={visible ? 'text' : 'password'}
          aria-invalid={hasError || undefined}
          className={`border bg-input text-content placeholder:text-content-muted ${
            hasError ? 'border-danger focus-visible:ring-danger' : 'border-input-border focus-visible:ring-focus'
          } text-sm rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:border-focus block w-full p-2`}
        />
        {showTogglePassword && (
          <button
            type='button'
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
            className='right-2 top-1 absolute inset-y-0 flex items-center cursor-pointer h-[75%] rounded text-content-muted hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus'
            onClick={() => setVisible((previous) => !previous)}
          >
            <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} width='20' height='20' />
          </button>
        )}
      </div>
      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[errorKey]?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
    </>
  );
}

export default InputPassword;
