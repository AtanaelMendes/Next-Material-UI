'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { faCaretDown, faExternalLink, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';
import { FieldLabel } from '../display/Typography';
import { TooltipComponent } from '../overlays/Tooltip';

export interface CustomDropdownOption {
  value: string | number;
  label: ReactNode;
  count?: ReactNode;
}

export interface CustomDropdownProps {
  id?: string;
  label?: ReactNode;
  options?: CustomDropdownOption[];
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  showIconLink?: boolean;
  hint?: ReactNode;
  className?: string;
}

/** Click-to-open dropdown with a count badge per option. */
export function CustomDropdown({
  id,
  label,
  options = [],
  onSelect,
  placeholder,
  showIconLink,
  hint,
  className,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={className}>
      {(label || hint) && (
        <div className='flex relative'>
          {label && (
            <div className='flex relative'>
              <label>
                <FieldLabel>{label}</FieldLabel>
              </label>
            </div>
          )}
          {hint && (
            <TooltipComponent content={<div className='text-xs z-100 max-w-75'>{hint}</div>} asChild usePortal={false}>
              <span className='ml-2 mt-1'>
                <FontAwesomeIcon icon={faInfoCircle} width='16' height='16' color='blue' tabIndex={-1} />
              </span>
            </TooltipComponent>
          )}
        </div>
      )}
      <div id={id} className='w-full relative' ref={dropdownRef}>
        <button
          type='button'
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          className='flex w-full justify-between items-center border border-input-border bg-input text-content rounded-lg p-1 cursor-pointer shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus'
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span className='text-content-secondary text-sm p-1'>
            {placeholder || 'Selecione um item'}
          </span>
          <FontAwesomeIcon
            className='text-content-muted me-2 text-center'
            icon={showIconLink ? faExternalLink : faCaretDown}
            width='16'
            height='16'
          />
        </button>

        <div
          role='listbox'
          className={cn(
            'absolute w-full bg-surface-secondary border border-border rounded-lg shadow-lg z-10',
            !isOpen && 'hidden',
          )}
        >
          {options.map((option) => (
            <button
              key={`${id}-${option.value}`}
              type='button'
              role='option'
              aria-selected={false}
              className='flex w-full justify-between items-center px-3 py-1 border-b border-border last:border-b-0 hover:bg-hover text-content cursor-pointer'
              onClick={() => {
                setIsOpen(false);
                onSelect?.(option.value);
              }}
            >
              <span className='text-content-secondary font-semibold text-sm'>{option.label}</span>
              {option.count !== undefined && (
                <span className='bg-primary text-white text-xs font-semibold min-w-7 h-7 flex items-center justify-center rounded-full'>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomDropdown;
