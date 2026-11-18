'use client';

import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../lib/cn';

type FaIcon = ComponentProps<typeof FontAwesomeIcon>['icon'];

export interface FabBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  small?: boolean;
  absolute?: boolean;
  disableZIndex?: boolean;
  children?: ReactNode;
}

const baseButtonStyles = 'rounded-full text-white drop-shadow transition duration-300 ease-in-out';
const baseIconStyles = 'drop-shadow';

function fabClasses(
  small: boolean | undefined,
  absolute: boolean | undefined,
  disableZIndex: boolean | undefined,
  disabled: boolean | undefined,
  colorClasses: string,
  className?: string,
) {
  return cn(
    baseButtonStyles,
    !disableZIndex && 'z-999',
    colorClasses,
    small ? 'p-2' : 'p-4',
    absolute ? 'absolute' : 'fixed',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );
}

export function FabCancel({ id, onClick, className, small, absolute, disableZIndex, disabled, ...props }: FabBaseProps) {
  return (
    <button
      type='button'
      id={id || 'fab-cancel'}
      aria-label={props['aria-label'] || 'Cancelar'}
      onClick={(event) => { if (!disabled) onClick?.(event); }}
      disabled={disabled}
      className={fabClasses(small, absolute, disableZIndex, disabled, 'bg-red-500 hover:bg-red-400', className)}
      {...props}
    >
      <FontAwesomeIcon icon={faX} width='25' height='25' className={baseIconStyles} />
    </button>
  );
}

export function FabSave({ id, onClick, className, small, absolute, disableZIndex, disabled, ...props }: FabBaseProps) {
  return (
    <button
      type='button'
      id={id || 'fab-save'}
      aria-label={props['aria-label'] || 'Salvar'}
      onClick={(event) => { if (!disabled) onClick?.(event); }}
      disabled={disabled}
      className={fabClasses(small, absolute, disableZIndex, disabled, 'bg-green-500 hover:bg-green-400', className)}
      {...props}
    >
      <FontAwesomeIcon icon={faSave} width='25' height='25' className={baseIconStyles} />
    </button>
  );
}

export interface FabAddProps extends FabBaseProps {
  label?: ReactNode;
}

export function FabAdd({ id, onClick, className, small, absolute, disableZIndex, label, disabled, ...props }: FabAddProps) {
  return (
    <button
      type='button'
      id={id || 'fab-add'}
      aria-label={props['aria-label'] || (typeof label === 'string' ? label : undefined) || 'Adicionar'}
      onClick={(event) => { if (!disabled) onClick?.(event); }}
      disabled={disabled}
      className={fabClasses(
        small,
        absolute,
        disableZIndex,
        disabled,
        'flex flex-row items-center gap-2 bg-primary hover:bg-blue-500',
        className,
      )}
      {...props}
    >
      <FontAwesomeIcon icon={faPlus} width='25' height='25' className={baseIconStyles} />
      {label && <span className='text-normal font-medium text-white pr-1'>{label}</span>}
    </button>
  );
}

export interface FabCustomProps extends FabBaseProps {
  icon?: FaIcon;
  color?: string;
  hover?: string;
}

export function FabCustom({
  id,
  onClick,
  className,
  small,
  absolute,
  disableZIndex,
  icon,
  color,
  hover,
  disabled,
  ...props
}: FabCustomProps) {
  return (
    <button
      type='button'
      id={id || 'fab-custom'}
      aria-label={props['aria-label'] || 'Ação'}
      onClick={(event) => { if (!disabled) onClick?.(event); }}
      disabled={disabled}
      className={fabClasses(
        small,
        absolute,
        disableZIndex,
        disabled,
        cn(color || 'bg-surface-muted text-content', hover || 'hover:bg-hover'),
        className,
      )}
      {...props}
    >
      <FontAwesomeIcon icon={icon || faPlus} width='25' height='25' className={baseIconStyles} />
    </button>
  );
}

export default FabAdd;
