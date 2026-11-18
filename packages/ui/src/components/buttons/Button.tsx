'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { ComponentSize, SemanticColor } from '../../lib/types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: SemanticColor;
  size?: ComponentSize;
  pill?: boolean;
  square?: boolean;
  block?: boolean;
  outline?: boolean;
  bordered?: boolean;
  children?: ReactNode;
}

const outlineFocus = 'focus-visible:ring-focus';

function buttonTypeClasses(
  outline: boolean,
  bordered: boolean,
  buttonType: SemanticColor | undefined,
): string {
  const variants: Record<SemanticColor, string> = {
    primary: cn(
      outline
        ? 'text-primary-text border-primary hover:bg-primary/10'
        : 'bg-primary text-primary-content hover:bg-primary-hover',
      bordered && 'border border-primary',
      outlineFocus,
    ),
    secondary: cn(
      outline
        ? 'text-content-secondary border-border hover:bg-hover hover:text-content'
        : 'bg-surface-secondary text-content border border-border hover:bg-hover',
      bordered && 'border border-border',
      outlineFocus,
    ),
    success: cn(
      outline
        ? 'text-success border-success hover:bg-success/10'
        : 'bg-success text-success-content hover:bg-success-hover',
      bordered && 'border border-success',
      'focus-visible:ring-success',
    ),
    danger: cn(
      outline
        ? 'text-danger-text border-danger hover:bg-danger hover:text-danger-content'
        : 'bg-danger text-danger-content hover:bg-danger-hover',
      bordered && 'border border-danger',
      'focus-visible:ring-danger',
    ),
    warning: cn(
      outline
        ? 'text-warning border-warning hover:bg-warning/15'
        : 'bg-warning text-warning-content hover:bg-warning-hover',
      bordered && 'border border-warning',
      'focus-visible:ring-warning',
    ),
    ghost: cn('text-content hover:bg-hover', outline && 'text-content-secondary', bordered && 'border border-border', outlineFocus),
    info: cn(
      outline
        ? 'text-info border-info hover:bg-info/10'
        : 'bg-info text-info-content hover:bg-info-hover',
      bordered && 'border border-info',
      'focus-visible:ring-info',
    ),
  };

  return buttonType ? variants[buttonType] : variants.secondary;
}

/** Builds the class string for a button (exported for advanced composition). */
export function generateButtonClass(
  buttonType: SemanticColor | undefined,
  pill: boolean,
  square: boolean | undefined,
  size: ComponentSize,
  block: boolean,
  outline: boolean,
  bordered: boolean,
  disabled: boolean,
): string {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background';
  const shapeClasses = square ? '' : pill ? 'rounded-full' : 'rounded';
  const sizeClasses =
    size === 'small' ? 'py-1 px-2' : size === 'large' ? 'py-3 px-6 text-base' : 'py-2 px-4';
  const blockClasses = block ? 'w-full' : 'w-fit';
  const styleType = buttonTypeClasses(outline, bordered, buttonType);
  const disabledClasses = disabled
    ? 'opacity-70 cursor-not-allowed bg-disabled text-disabled-content border-border hover:bg-disabled hover:text-disabled-content'
    : '';
  return cn(baseClasses, shapeClasses, sizeClasses, blockClasses, styleType, disabledClasses);
}

/** Material-inspired button with semantic variants and sizes. */
export function Button({
  buttonType,
  size = 'medium',
  type = 'button',
  pill = false,
  square,
  onClick,
  children,
  block = false,
  outline = false,
  bordered = false,
  className,
  disabled = false,
  title,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        generateButtonClass(buttonType, pill, square, size, block, outline, bordered, disabled),
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
