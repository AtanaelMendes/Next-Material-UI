'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { empty } from '../../lib/utils';

export interface ButtonToggleProps {
  id?: string;
  value?: string | number;
  label?: ReactNode;
  labelOn?: ReactNode;
  LabelOff?: ReactNode;
  primary?: boolean;
  danger?: boolean;
  warning?: boolean;
  success?: boolean;
  small?: boolean;
  checked?: boolean;
  onChange?: (id: string, value: string | number | undefined, checked: boolean) => void;
  onClick?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
  wordWrap?: boolean;
}

/** Material-style switch with optional on/off labels and colour variants. */
export function ButtonToggle({
  id,
  value,
  label,
  labelOn,
  LabelOff,
  primary,
  danger,
  warning,
  success,
  small,
  checked,
  onChange,
  onClick,
  className,
  disabled,
  wordWrap,
}: ButtonToggleProps) {
  const [renderLabel, setRenderLabel] = useState<ReactNode>(label);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.id, value, event.target.checked);
    },
    [onChange, value],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      onClick?.(event.currentTarget.checked);
    },
    [onClick],
  );

  useEffect(() => {
    if (labelOn && LabelOff) setRenderLabel(checked ? labelOn : LabelOff);
    else if (empty(label) || label !== renderLabel) setRenderLabel(label);
  }, [checked, label, labelOn, LabelOff, renderLabel]);

  const getVariantStyles = () => {
    if (danger) return 'peer-focus-visible:ring-danger/50 peer-checked:bg-danger peer-checked:border-danger';
    if (success) return 'peer-focus-visible:ring-success/50 peer-checked:bg-success peer-checked:border-success';
    if (warning) return 'peer-focus-visible:ring-warning/50 peer-checked:bg-warning peer-checked:border-warning';
    if (primary) return 'peer-focus-visible:ring-focus/50 peer-checked:bg-primary peer-checked:border-primary';
    return '';
  };

  if (!primary && !danger && !warning && !success) return null;

  return (
    <label
      className={cn(
        'inline-flex items-center me-5',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        id={id}
        name={id}
        type='checkbox'
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onClick={handleClick}
        className='sr-only peer'
      />
      <div
        className={cn(
          'relative rounded-full border border-input-border bg-surface-muted',
          "after:content-[''] after:absolute after:bg-surface",
          'after:border after:border-content-muted after:rounded-full after:start-[2px]',
          'peer peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-background peer-checked:after:border-white',
          'after:transition-all rtl:peer-checked:after:-translate-x-full',
          'transition-colors duration-150',
          small
            ? 'w-7 h-3 after:h-[8px] after:w-[8px] after:top-[1px] peer-checked:after:translate-x-3'
            : 'w-8 h-4 after:h-[10px] after:w-[10px] after:top-[2px] peer-checked:after:translate-x-4',
          getVariantStyles(),
          disabled && 'opacity-60',
        )}
      />
      <span
        className={cn(
          'ms-3 text-sm font-medium',
          disabled ? 'text-disabled-content' : 'text-content',
          wordWrap ? 'whitespace-normal' : 'whitespace-nowrap',
        )}
      >
        {renderLabel}
      </span>
    </label>
  );
}

export default ButtonToggle;
