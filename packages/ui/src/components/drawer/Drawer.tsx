'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import {
  DrawerContext,
  useDrawerAccessibility,
  useDrawerState,
  type DrawerContextValue,
  type DrawerVariant,
} from './useDrawer';
import { cn } from '../../lib/cn';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  side?: 'left' | 'right';
  variant?: DrawerVariant;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  compact?: boolean;
  defaultCompact?: boolean;
  onCompactChange?: (compact: boolean) => void;
  storageKey?: string;
  compactStorageKey?: string;
  width?: string;
  compactWidth?: string;
  closeOnEsc?: boolean;
  closeOnBackdropClick?: boolean;
  trapFocus?: boolean;
  lockScroll?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  dataTestId?: string;
  triggerRef?: RefObject<HTMLElement | null>;
  initialFocusRef?: RefObject<HTMLElement | null>;
  children?: ReactNode;
}

/**
 * Composite drawer container supporting left/right anchors, responsive,
 * persistent, temporary (modal) and compact presentations, controlled and
 * uncontrolled state, localStorage persistence, focus trapping and ESC dismissal.
 */
export function Drawer({
  side = 'left',
  variant = 'responsive',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  compact: controlledCompact,
  defaultCompact = false,
  onCompactChange,
  storageKey,
  compactStorageKey,
  width,
  compactWidth = 'w-16',
  closeOnEsc = true,
  closeOnBackdropClick = true,
  trapFocus = true,
  lockScroll = true,
  ariaLabel,
  ariaLabelledBy,
  id,
  dataTestId,
  triggerRef,
  initialFocusRef,
  className = '',
  children,
  ...props
}: DrawerProps) {
  const generatedTitleId = useId();
  const drawerRef = useRef<HTMLElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 1023px)');
    const handleMedia = (event: MediaQueryListEvent) => setIsMobile(event.matches);
    setIsMobile(media.matches);
    if (media.addEventListener) {
      media.addEventListener('change', handleMedia);
      return () => media.removeEventListener('change', handleMedia);
    }
    media.addListener(handleMedia);
    return () => media.removeListener(handleMedia);
  }, []);

  const isModal = variant === 'temporary' || (variant === 'responsive' && isMobile);

  const drawerState = useDrawerState({
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    compact: controlledCompact,
    defaultCompact,
    onCompactChange,
    storageKey,
    compactStorageKey,
  });

  const {
    isOpen,
    isCompact,
    closeDrawer,
    openDrawer,
    toggle,
    toggleCompact,
    setOpen,
    setCompact,
    isHydrated,
  } = drawerState;

  useDrawerAccessibility({
    drawerRef,
    open: isOpen,
    side,
    variant,
    isTemporary: isModal,
    onClose: closeOnEsc ? closeDrawer : undefined,
    triggerRef,
    initialFocusRef,
  });

  // `trapFocus`/`lockScroll` remain accepted for API compatibility; the
  // accessibility hook always hardens modal drawers.
  void trapFocus;
  void lockScroll;

  const targetId = id || (side === 'left' ? 'left-drawer' : 'right-drawer');
  const targetTestId =
    dataTestId || ((props as Record<string, unknown>)['data-testid'] as string | undefined) || targetId;

  const computedState = !isOpen ? 'closed' : isCompact && side === 'left' ? 'collapsed' : 'open';

  const defaultWidth = width || (side === 'right' ? 'w-80' : 'w-64');
  const titleId = ariaLabelledBy || generatedTitleId;

  const defaultLabel = side === 'left' ? 'Navegação principal' : 'Painel contextual';
  const resolvedAriaLabelledBy = ariaLabelledBy || undefined;
  const resolvedAriaLabel = resolvedAriaLabelledBy ? undefined : ariaLabel || defaultLabel;

  const positionClasses = isModal
    ? cn(
        'fixed inset-y-0 z-40 shadow-2xl max-w-[85vw] transition-transform duration-200 ease-in-out',
        side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
        isOpen
          ? 'translate-x-0'
          : side === 'left'
            ? '-translate-x-full pointer-events-none invisible'
            : 'translate-x-full pointer-events-none invisible',
        defaultWidth,
      )
    : cn(
        'relative shrink-0 h-full transition-[width,opacity] duration-200 ease-in-out',
        side === 'left' ? 'border-r' : 'border-l',
        !isOpen
          ? 'w-0 min-w-0 max-w-0 overflow-hidden opacity-0 pointer-events-none invisible !border-0'
          : isCompact && side === 'left'
            ? cn(compactWidth, 'min-w-16 max-w-16 overflow-hidden')
            : side === 'right'
              ? 'w-80 min-w-80 max-w-80'
              : 'w-64 min-w-64 max-w-64',
      );

  const defaultRole = isModal ? 'dialog' : side === 'left' ? 'navigation' : 'region';

  const contextValue: DrawerContextValue = {
    side,
    variant,
    isOpen,
    open: isOpen,
    isCompact,
    compact: isCompact,
    isModal,
    isTemporary: isModal,
    isHydrated,
    drawerId: targetId,
    id: targetId,
    titleId,
    close: closeDrawer,
    closeDrawer,
    openDrawer,
    toggle,
    toggleCompact,
    setOpen,
    setCompact,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {isModal && isOpen && (
        <div
          data-testid='drawer-backdrop'
          aria-hidden='true'
          onClick={closeOnBackdropClick ? closeDrawer : undefined}
          className='fixed inset-0 bg-black/50 z-30 transition-opacity duration-200 ease-in-out backdrop-blur-xs'
        />
      )}

      <aside
        ref={drawerRef}
        id={targetId}
        data-testid={targetTestId}
        data-state={computedState}
        data-side={side}
        data-variant={variant}
        role={defaultRole}
        aria-modal={isModal ? 'true' : undefined}
        aria-label={resolvedAriaLabel}
        aria-labelledby={resolvedAriaLabelledBy}
        inert={!isOpen ? true : undefined}
        tabIndex={isModal ? -1 : undefined}
        className={cn(
          'flex flex-col bg-surface text-content',
          'border-border',
          positionClasses,
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </DrawerContext.Provider>
  );
}
