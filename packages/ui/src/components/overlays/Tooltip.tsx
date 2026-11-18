'use client';

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/cn';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipComponentProps {
  content: ReactNode;
  children?: ReactNode;
  asChild?: boolean;
  usePortal?: boolean;
  side?: TooltipSide;
  className?: string;
}

const SIDE_CLASSES: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};

/**
 * Accessible tooltip. When `asChild` is set the child receives the event
 * handlers and `aria-describedby`; when `usePortal` is set the bubble is
 * rendered in document.body to escape overflow containers.
 */
export function TooltipComponent({
  content,
  children,
  asChild = false,
  usePortal = false,
  side = 'top',
  className,
}: TooltipComponentProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!usePortal || !open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const offsets: Record<TooltipSide, { top: number; left: number }> = {
      top: { top: rect.top, left: rect.left + rect.width / 2 },
      bottom: { top: rect.bottom, left: rect.left + rect.width / 2 },
      left: { top: rect.top + rect.height / 2, left: rect.left },
      right: { top: rect.top + rect.height / 2, left: rect.right },
    };
    setPosition(offsets[side]);
  }, [open, side, usePortal]);

  const bubble = content ? (
    <span
      id={id}
      role='tooltip'
      className={cn(
        'z-50 max-w-75 rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-lg',
        usePortal ? 'fixed -translate-x-1/2 -translate-y-full' : cn('absolute', SIDE_CLASSES[side]),
        className,
      )}
      style={usePortal && position ? { top: position.top, left: position.left } : undefined}
    >
      {content}
    </span>
  ) : null;

  const handlers = {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };

  let anchor: ReactNode;
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    anchor = cloneElement(child, {
      ...handlers,
      'aria-describedby': id,
      ref: (node: HTMLElement | null) => {
        anchorRef.current = node;
        const childRef = (child as unknown as { ref?: unknown }).ref;
        if (typeof childRef === 'function') (childRef as (node: HTMLElement | null) => void)(node);
        else if (childRef && typeof childRef === 'object') {
          (childRef as { current: HTMLElement | null }).current = node;
        }
      },
    });
  } else {
    anchor = (
      <span ref={(node) => { anchorRef.current = node; }} tabIndex={0} {...handlers} aria-describedby={id} className='inline-flex'>
        {children}
      </span>
    );
  }

  return (
    <span className='relative inline-flex'>
      {anchor}
      {open && bubble ? (usePortal ? createPortal(bubble, document.body) : bubble) : null}
    </span>
  );
}

export default TooltipComponent;
