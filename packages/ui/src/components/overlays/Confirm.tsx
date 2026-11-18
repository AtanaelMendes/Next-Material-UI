'use client';

import type { ReactNode } from 'react';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../buttons/Button';

export interface ConfirmProps {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
  onClose?: () => void;
  iconSize?: string | number;
  primaryText?: ReactNode;
  secondaryText?: ReactNode;
  btnAccept?: ReactNode;
  btnDecline?: ReactNode;
  cancelActionCallback?: () => void;
  confirmActionCallback?: () => void;
}

/** Confirmation dialog with accept/decline actions. */
export function Confirm({
  visible,
  setVisible,
  onClose,
  iconSize,
  primaryText,
  secondaryText,
  btnAccept,
  btnDecline,
  cancelActionCallback,
  confirmActionCallback,
}: ConfirmProps) {
  const close = () => {
    setVisible?.(false);
    onClose?.();
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label={typeof primaryText === 'string' ? primaryText : 'Confirmação'}
      className={`z-50 inset-0 w-full h-screen bg-black/50 items-center justify-center p-4 fixed ${visible ? 'flex' : 'hidden'}`}
    >
      <div className='w-full max-w-md py-2 bg-surface text-content border border-border rounded-lg shadow-xl'>
        <div className='flex text-warning mr-4 justify-center py-2'>
          <FontAwesomeIcon icon={faTriangleExclamation} width={iconSize || '45'} height={iconSize || '45'} />
        </div>
        <div className='z-50 w-full px-4 p-2 text-center text-base text-content'>{primaryText || ''}</div>
        <div className='z-50 w-full px-4 p-2 text-content-muted text-center text-sm'>{secondaryText || ''}</div>
        <div className='z-50 w-full p-2 text-center'>
          {btnDecline && (
            <Button
              buttonType='primary'
              outline
              size='small'
              className='mr-4'
              onClick={() => {
                cancelActionCallback?.();
                close();
              }}
            >
              {btnDecline}
            </Button>
          )}
          <Button
            buttonType='primary'
            size='small'
            onClick={() => {
              confirmActionCallback?.();
              close();
            }}
          >
            {btnAccept || 'Sim'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
