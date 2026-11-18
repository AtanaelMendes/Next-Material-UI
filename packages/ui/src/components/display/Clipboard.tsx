'use client';

import type { ReactNode } from 'react';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';

export interface ClipboardProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  textToStore?: string;
  onCopy?: (text: string) => void;
  onError?: (error: unknown) => void;
  copyAriaLabel?: string;
}

/** Inline text with a copy-to-clipboard affordance. */
export function Clipboard({
  children,
  className,
  onClick,
  textToStore,
  onCopy,
  onError,
  copyAriaLabel = 'Copiar texto',
}: ClipboardProps) {
  const copyTextToClipboard = async () => {
    if (!navigator.clipboard) return;
    const value = textToStore || (typeof children === 'string' ? children : '');
    try {
      await navigator.clipboard.writeText(value);
      onCopy?.(value);
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1',
        typeof onClick === 'function' && 'cursor-pointer',
        className,
      )}
    >
      <span onClick={onClick}>{children}</span>
      <button
        type='button'
        aria-label={copyAriaLabel}
        className='cursor-copy text-inherit'
        onClick={copyTextToClipboard}
      >
        <FontAwesomeIcon icon={faCopy} width='12' height='12' />
      </button>
    </div>
  );
}

export default Clipboard;
