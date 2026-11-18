'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '../buttons/Button';
import { InputTextArea } from '../inputs/InputTextArea';
import { empty } from '../../lib/utils';

export interface DialogProps {
  /** Preferred controlled API. */
  open?: boolean;
  onClose?: () => void;
  onConfirm?: (description: string) => void;
  /** Legacy aliases kept for backwards compatibility. */
  showDialog?: boolean;
  setDialogControl?: (open: boolean) => void;
  closeDialogCallback?: () => void;
  confirmActionCallback?: (description: string) => void;

  title?: ReactNode;
  textAreaLabel?: string;
  textAreaMinLength?: number;
  maxLength?: number;
  hideTextArea?: boolean;
  small?: boolean;
  btnCancel?: ReactNode;
  btnAccept?: ReactNode;
  onValidateError?: (message: string) => void;
}

/** Modal dialog with an optional reason textarea. */
export function Dialog({
  open,
  onClose,
  onConfirm,
  showDialog,
  setDialogControl,
  closeDialogCallback,
  confirmActionCallback,
  title,
  textAreaLabel = 'Motivo',
  textAreaMinLength,
  maxLength,
  hideTextArea,
  small,
  btnCancel,
  btnAccept,
  onValidateError,
}: DialogProps) {
  const isOpen = open ?? showDialog ?? false;
  const [description, setDescription] = useState('');

  const close = () => {
    closeDialogCallback?.();
    onClose?.();
    setDialogControl?.(false);
  };

  const accept = () => {
    if (!empty(textAreaMinLength) && description.length < (textAreaMinLength || 0)) {
      onValidateError?.(
        `A quantidade mínima de caracteres para o campo [${textAreaLabel}] é de ${textAreaMinLength} caracteres!`,
      );
      return;
    }
    onConfirm?.(description);
    confirmActionCallback?.(description);
    close();
  };

  useEffect(() => {
    setDescription('');
  }, [isOpen]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={typeof title === 'string' ? title : 'Dialogo'}
      className={`z-50 inset-0 w-full h-screen bg-black/50 items-center justify-center p-4 fixed ${isOpen ? 'flex' : 'hidden'}`}
    >
      <div
        className={`${hideTextArea ? 'min-h-[150px]' : 'min-h-[260px]'} w-full ${
          small ? 'max-w-md' : 'max-w-3xl'
        } bg-surface text-content border border-border m-auto relative rounded-lg shadow-xl`}
      >
        <div className='z-50 w-full px-4 p-2 font-semibold border-b border-border text-primary-content bg-primary rounded-t-lg'>
          {hideTextArea ? 'Confirmar ação' : title}
        </div>

        {!hideTextArea && (
          <div className='z-50 px-4 pt-1 w-full pb-20'>
            <InputTextArea
              rows={5}
              maxLength={maxLength || 200}
              value={description}
              id='confirm_description'
              helperText={textAreaMinLength ? `Mínimo ${textAreaMinLength} caracteres` : ''}
              minLength={textAreaMinLength}
              label={textAreaLabel}
              onChange={(_id, value) => setDescription(value)}
            />
          </div>
        )}

        {hideTextArea && (
          <div className='z-50 w-full px-4 p-2 font-semibold text-content'>{title || ''}</div>
        )}

        <div className='bottom-0 z-50 absolute w-full p-2 h-[46px] rounded-b-lg border-t bg-surface-secondary border-border text-right'>
          {btnCancel && (
            <Button buttonType='danger' outline size='small' className='mr-4' onClick={close}>
              {btnCancel}
            </Button>
          )}
          <Button buttonType='success' size='small' onClick={accept}>
            {btnAccept || 'OK'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
