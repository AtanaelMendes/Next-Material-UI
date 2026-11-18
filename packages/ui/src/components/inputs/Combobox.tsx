'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { faAsterisk, faChevronDown, faInfoCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors, UIOption } from '../../lib/types';

export interface ComboboxProps {
  id?: string;
  label?: ReactNode;
  value?: string | number;
  options?: UIOption[];
  onChange?: (id: string, value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  noOptionsMessage?: string;
  required?: boolean | RequiredFieldErrors;
  hint?: ReactNode;
  helperText?: ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
}

/**
 * Accessible single-select combobox (WAI-ARIA listbox pattern), replacing
 * the previous react-tailwindcss-select dependency.
 */
export function Combobox({
  id,
  label,
  value,
  options = [],
  onChange,
  placeholder = 'Selecione',
  searchPlaceholder = 'Digite para filtrar',
  noOptionsMessage = 'Nenhum registro encontrado',
  required,
  hint,
  helperText,
  disabled,
  clearable = true,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const listboxId = `${fieldId}-listbox`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const errorMap = typeof required === 'object' ? required : undefined;
  const isRequired = required === true;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  const selected = options.find((option) => String(option.value) === String(value));
  const filtered = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [options, query],
  );

  useEffect(() => {
    if (!open) return;
    const handleOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setHighlighted(0);
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  const choose = (option: UIOption | undefined) => {
    if (!option || option.disabled) return;
    onChange?.(fieldId, String(option.value));
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((previous) => Math.min(previous + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((previous) => Math.max(previous - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(filtered[highlighted]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={cn('w-full relative', className)}>
      {label && (
        <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
          <label htmlFor={fieldId}>
            <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>
              {label}
            </FieldLabel>
          </label>
          {isRequired && (
            <FontAwesomeIcon icon={faAsterisk} width='8' height='8' color='red' className='self-start absolute' />
          )}
          {hint && (
            <TooltipComponent content={<div className='text-xs z-20 max-w-75'>{hint}</div>} asChild>
              <FontAwesomeIcon icon={faInfoCircle} width='16' height='16' color='blue' className='self-start ml-2' tabIndex={-1} />
            </TooltipComponent>
          )}
        </div>
      )}

      <div ref={containerRef} className='relative'>
        <button
          type='button'
          id={fieldId}
          role='combobox'
          aria-expanded={open}
          aria-controls={listboxId}
          aria-haspopup='listbox'
          aria-invalid={hasError || undefined}
          disabled={disabled}
          onClick={() => !disabled && setOpen((previous) => !previous)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex w-full items-center justify-between gap-2 rounded-lg border bg-input px-3 text-sm text-content',
            'h-9 focus:outline-none focus-visible:ring-2 focus-visible:border-focus',
            hasError ? 'border-danger focus-visible:ring-danger' : 'border-input-border focus-visible:ring-focus',
            disabled && 'bg-disabled text-disabled-content cursor-not-allowed',
          )}
        >
          <span className={cn('truncate', !selected && 'text-content-muted')}>
            {selected ? selected.label : placeholder}
          </span>
          <span className='flex items-center gap-1'>
            {clearable && selected && !disabled && (
              <span
                role='button'
                tabIndex={0}
                aria-label='Limpar seleção'
                className='rounded p-0.5 hover:bg-hover'
                onClick={(event) => {
                  event.stopPropagation();
                  onChange?.(fieldId, '');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    onChange?.(fieldId, '');
                  }
                }}
              >
                <FontAwesomeIcon icon={faXmark} width='12' height='12' />
              </span>
            )}
            <FontAwesomeIcon icon={faChevronDown} width='12' height='12' className='text-content-muted' />
          </span>
        </button>

        {open && (
          <div
            id={listboxId}
            role='listbox'
            aria-label={typeof label === 'string' ? label : 'Opções'}
            className='absolute z-20 mt-1.5 w-full rounded border border-border bg-surface-secondary py-1 text-sm text-content shadow-lg'
          >
            <div className='px-2 pb-1'>
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlighted(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className='w-full rounded border border-input-border bg-input px-2 py-1 text-sm text-content focus:outline-none focus-visible:ring-2 focus-visible:ring-focus'
              />
            </div>
            <ul className='max-h-64 overflow-y-auto'>
              {filtered.length === 0 && (
                <li className='px-3 py-2 text-content-muted'>{noOptionsMessage}</li>
              )}
              {filtered.map((option, index) => (
                <li key={option.value}>
                  <button
                    type='button'
                    role='option'
                    aria-selected={String(option.value) === String(value)}
                    disabled={option.disabled}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => choose(option)}
                    className={cn(
                      'w-full px-3 py-1.5 text-left',
                      index === highlighted ? 'bg-hover text-content' : 'text-content-secondary',
                      option.disabled && 'cursor-not-allowed opacity-50',
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
      {helperText && <div className='text-xs text-info-text text-right'>{helperText}</div>}
    </div>
  );
}

export default Combobox;
