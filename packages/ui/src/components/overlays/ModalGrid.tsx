'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../buttons/Button';
import { cn } from '../../lib/cn';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalGridProps {
  id?: string;
  children?: ReactNode;
  modalControl?: boolean;
  setModalControl?: (open: boolean) => void;
  closeModalCallback?: () => void;
  closeOnSubmit?: boolean;
  danger?: boolean;
  warning?: boolean;
  customMargin?: string;
  height?: string;
  scrollable?: boolean;
  scrollableX?: boolean;
  dismissible?: boolean;
  size?: ModalSize;
  width?: string;
  btnCancel?: ReactNode;
  btnSubmit?: ReactNode;
  submitCallBack?: () => void;
  footerClass?: string;
  footer?: ReactNode;
  contentClass?: string;
  title?: ReactNode;
  background?: string;
}

const SIZES: Record<ModalSize, string> = {
  sm: 'h-full md:h-1/2 lg:h-2/5 w-full md:w-1/2 lg:w-2/5',
  md: 'h-full md:h-[75%] lg:h-[65%] w-full md:w-[75%] lg:w-[65%]',
  lg: 'h-full md:h-[85%] xl:h-[80%] w-full md:w-[85%] xl:w-[80%]',
  full: 'w-full h-full',
};

/** Full modal shell with header, scrollable content and footer actions. */
export function ModalGrid({
  id,
  children,
  modalControl,
  setModalControl,
  closeModalCallback,
  closeOnSubmit,
  danger,
  warning,
  customMargin,
  height,
  scrollable = true,
  dismissible = true,
  size = 'md',
  width,
  btnCancel,
  btnSubmit,
  submitCallBack,
  footerClass,
  footer,
  contentClass,
  title,
  background,
  scrollableX = false,
}: ModalGridProps) {
  const closeModal = () => {
    setModalControl?.(false);
    closeModalCallback?.();
  };

  useEffect(() => {
    if (!modalControl) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible) closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  if (!modalControl) return null;

  const sizeClasses = size === 'sm' && (height || width)
    ? cn(height, width)
    : SIZES[size];

  const typeClasses = danger
    ? 'bg-danger text-danger-content'
    : warning
      ? 'bg-warning text-warning-content'
      : 'bg-primary text-primary-content';

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={typeof title === 'string' ? title : 'Modal'}
      className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4', customMargin)}
      id={id}
      onClick={dismissible && !title ? closeModal : undefined}
    >
      <div
        className={cn(
          'relative rounded-lg flex flex-col max-h-screen bg-surface text-content border border-border shadow-2xl',
          sizeClasses,
          background,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <div
            className={cn(
              'relative p-2 xl:p-4 flex justify-between items-center',
              typeClasses,
              size !== 'full' && 'rounded-t-lg',
            )}
          >
            <h2 className='text-base xl:text-lg font-semibold'>{title}</h2>
            <button
              type='button'
              className='absolute top-2 right-2 rounded-full cursor-pointer hover:bg-white/10 xl:p-2'
              onClick={closeModal}
              aria-label='Fechar modal'
            >
              <svg className='w-5 h-5 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'>
                <path d='M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z' />
              </svg>
            </button>
          </div>
        )}

        <div
          className={cn(
            'flex-grow overflow-y-auto px-2 xl:px-4 mt-2',
            scrollable ? 'scroll-smooth' : 'overflow-y-hidden',
            scrollableX ? 'overflow-x-auto' : 'overflow-x-hidden',
            contentClass,
          )}
        >
          {children}
        </div>

        {(footer || btnCancel || btnSubmit) && (
          <div
            className={cn(
              'z-10 p-1 xl:p-2 border-t border-border bg-surface-secondary flex items-center gap-2',
              size !== 'full' && 'rounded-b-lg',
              footerClass,
            )}
          >
            {btnCancel && (
              <Button buttonType='danger' outline={Boolean(btnSubmit)} onClick={closeModal} size='small'>
                {btnCancel}
              </Button>
            )}
            {btnSubmit && (
              <Button
                buttonType='success'
                onClick={() => {
                  submitCallBack?.();
                  if (closeOnSubmit) closeModal();
                }}
                size='small'
              >
                {btnSubmit}
              </Button>
            )}
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalGrid;
