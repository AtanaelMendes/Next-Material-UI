'use client';

import { memo, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { faAsterisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PillsBadge } from '../buttons/PillsBadge';
import { Button } from '../buttons/Button';
import { cn } from '../../lib/cn';
import { empty } from '../../lib/utils';
import type { RequiredFieldErrors } from '../../lib/types';

export interface InputTextAreaProps {
  id?: string;
  value?: string;
  label?: ReactNode;
  helperText?: ReactNode;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  required?: boolean | RequiredFieldErrors;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (id: string, value: string) => void;
  className?: string;
  small?: boolean;
  btnSent?: () => void;
  sentAriaLabel?: string;
}

/** Autosizing textarea with a character counter and optional send button. */
export const InputTextArea = memo(function InputTextArea({
  id,
  value,
  label,
  helperText,
  minLength,
  maxLength,
  rows,
  required,
  disabled,
  placeholder,
  onChange,
  className,
  small,
  btnSent,
  sentAriaLabel = 'Enviar',
}: InputTextAreaProps) {
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  const counterStyle = useMemo(() => {
    if (!empty(minLength) && (value?.length || 0) < (minLength || 0)) return 'danger';
    if (maxLength && maxLength === value?.length) return 'danger';
    if (maxLength && (value?.length || 0) >= Number((maxLength / 2.5).toFixed(0))) return 'warning';
    return 'primary';
  }, [value, minLength, maxLength]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(event.target.id, event.target.value);
    },
    [onChange],
  );

  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={cn(small ? 'mb-0.5 text-xs' : 'mb-2', 'text-sm font-medium text-content inline-flex')}
        >
          {isRequired && <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start' />}
          {label}
        </label>
      )}
      <div className='relative'>
        <textarea
          onKeyUp={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              btnSent?.();
            }
          }}
          id={id}
          name={id}
          disabled={disabled}
          rows={rows || 4}
          onChange={handleChange}
          value={value || ''}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
          className={cn(
            'block p-2 w-full text-sm text-content rounded-lg border bg-input placeholder:text-content-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:border-focus',
            disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
            hasError ? 'border-danger' : 'border-input-border',
            className,
          )}
        />
        {!btnSent && (
          <div className='absolute bottom-0.5 right-1.5 text-right'>
            <PillsBadge type={counterStyle} small>
              Total: {value?.length || 0}
              {maxLength ? ` / ${maxLength}` : ''}
            </PillsBadge>
          </div>
        )}
        {btnSent && (
          <div className='absolute bottom-0.5 right-1.5 text-right'>
            <Button buttonType='success' size='small' outline className='w-fit' onClick={btnSent} aria-label={sentAriaLabel}>
              <FontAwesomeIcon icon={faPaperPlane} width='16' height='16' />
            </Button>
          </div>
        )}
      </div>
      {helperText && <div className='text-xs text-info-text text-right'>{helperText}</div>}
      {hasError && (
        <div className='text-xs text-danger-text w-full'>
          {errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}
        </div>
      )}
    </>
  );
});

export default InputTextArea;
