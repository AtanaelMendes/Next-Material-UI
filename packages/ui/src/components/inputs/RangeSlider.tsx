'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FieldLabel } from '../display/Typography';

export interface RangeSliderProps {
  value?: number;
  label?: ReactNode;
  disabled?: boolean;
  onChange?: (id: string | undefined, value: string) => void;
  onClick?: (id: string | undefined, value: number) => void;
  id?: string;
  enableMinMax?: boolean;
  min?: number;
  max?: number;
  step?: number;
  renderMinMax?: ReactNode;
  className?: string;
  required?: boolean;
}

/** Range slider with optional min/max tick labels. */
export function RangeSlider({
  value,
  label,
  disabled,
  onChange,
  onClick,
  id,
  enableMinMax,
  min = 10,
  max = 40,
  step = 10,
  renderMinMax,
  className,
  required,
}: RangeSliderProps) {
  const defaultRenderMinMax = () =>
    Array.from({ length: (max - min) / step + 1 }).map((_, index) => (
      <span
        key={index}
        className={cn(
          'text-sm font-medium text-content -bottom-6 inset-s-0',
          disabled ? 'cursor-not-allowed text-disabled-content' : 'cursor-pointer',
        )}
        onClick={() => {
          if (!disabled) onClick?.(id, min + index * step);
        }}
      >
        {min + index * step}%
      </span>
    ));

  return (
    <div className={cn('w-full relative', className)}>
      {label && (
        <div className='flex absolute -top-2.25 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
          <FieldLabel className={cn(required ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>
            {label}
          </FieldLabel>
        </div>
      )}
      <div className='relative w-full border border-input-border bg-input rounded-lg p-2'>
        <input
          id={id}
          min={min}
          max={max}
          step={step}
          type='range'
          value={value}
          disabled={disabled}
          onChange={onChange ? (event) => onChange(id, event.target.value) : undefined}
          className={cn(
            'w-full h-2 bg-surface-muted accent-primary rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
        />
        <div className='flex flex-row justify-between'>
          {enableMinMax && (renderMinMax || defaultRenderMinMax())}
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
