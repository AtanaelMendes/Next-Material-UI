'use client';

import type { ReactNode } from 'react';
import { Button } from '../buttons/Button';

export interface DialogFieldsProps {
  title?: ReactNode;
  visible?: boolean;
  type?: 'primary' | 'success' | 'warning' | 'danger';
  onCancel?: () => void;
  onSave?: () => void;
  disabled?: boolean;
  labelConfirm?: ReactNode;
  children?: ReactNode;
}

const TYPE_CLASSES: Record<NonNullable<DialogFieldsProps['type']>, string> = {
  primary: 'bg-primary text-primary-content',
  success: 'bg-success text-success-content',
  warning: 'bg-warning text-warning-content',
  danger: 'bg-danger text-danger-content',
};

/** Dialog shell with a form body and cancel/save actions. */
export function DialogFields({
  title,
  children,
  visible,
  type,
  onCancel,
  onSave,
  disabled,
  labelConfirm,
}: DialogFieldsProps) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={typeof title === 'string' ? title : 'Dialogo'}
      className={`z-50 inset-0 w-full h-screen bg-black/50 items-center justify-center p-4 fixed ${visible ? 'flex' : 'hidden'}`}
    >
      <div className='w-full max-w-lg bg-surface text-content border border-border rounded-md mx-auto my-auto flex flex-col shadow-xl'>
        <div className={`${(type && TYPE_CLASSES[type]) || 'bg-surface-muted text-content'} p-2 rounded-t-md font-semibold`}>
          {title || 'Dialogo'}
        </div>
        <div className='p-2 flex flex-col gap-y-1'>{children}</div>
        <div className='p-2 flex w-full justify-end'>
          <Button size='small' buttonType='danger' outline onClick={onCancel}>
            Cancelar
          </Button>
          <Button size='small' buttonType='success' className='ml-1' disabled={disabled} onClick={onSave}>
            {labelConfirm || 'OK'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DialogFields;
