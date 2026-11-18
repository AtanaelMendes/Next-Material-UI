'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';

// ============================================================================
// Focus Management & Accessibility Helpers
// ============================================================================

export const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  'object:not([tabindex="-1"])',
  'embed:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]:not([tabindex="-1"])',
].join(', ');

/** Returns all visible focusable elements inside a container. */
export function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container || typeof window === 'undefined') return [];
  const elements = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return elements.filter((el) => {
    if (el.getAttribute('tabindex') === '-1' || el.hasAttribute('disabled')) return false;
    const style = window.getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') return false;
    return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
  });
}

// ============================================================================
// Reference-Counted Body Scroll Lock
// ============================================================================

let activeLocksCount = 0;
let originalOverflowStyle = '';

/** Locks document body scroll with reference counting. */
export function lockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  if (activeLocksCount === 0) {
    originalOverflowStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  activeLocksCount++;
}

/** Unlocks document body scroll when every lock has been released. */
export function unlockBodyScroll(): void {
  if (typeof document === 'undefined') return;
  activeLocksCount = Math.max(0, activeLocksCount - 1);
  if (activeLocksCount === 0) {
    document.body.style.overflow = originalOverflowStyle || '';
  }
}

// ============================================================================
// Safe Storage Adapter
// ============================================================================

export const safeStorage = {
  getItem<T = unknown>(key: string | null | undefined, fallback: T | null = null): unknown {
    if (typeof window === 'undefined' || !key) return fallback;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item);
    } catch {
      return fallback;
    }
  },
  setItem(key: string | null | undefined, value: unknown): boolean {
    if (typeof window === 'undefined' || !key) return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  removeItem(key: string | null | undefined): boolean {
    if (typeof window === 'undefined' || !key) return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};

// ============================================================================
// Two-Phase Hydration-Safe Hook
// ============================================================================

export function useHydratedDrawerState<T = boolean>(
  storageKey: string | null | undefined,
  defaultState: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (!storageKey || typeof window === 'undefined') return;
    const saved = safeStorage.getItem(storageKey, null);
    if (saved !== null) {
      const resolved =
        typeof saved === 'object' && saved !== null
          ? (saved as { open?: unknown }).open
          : saved;
      if (typeof resolved === 'boolean') setState(resolved as T);
      else if (saved !== undefined) setState(saved as T);
    }
  }, [storageKey]);

  const updateState = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      setState((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        if (storageKey) safeStorage.setItem(storageKey, resolved);
        return resolved;
      });
    },
    [storageKey],
  );

  return [state, updateState, isHydrated];
}

// ============================================================================
// Unified Drawer State Manager
// ============================================================================

export interface UseDrawerStateOptions {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  compact?: boolean;
  defaultCompact?: boolean;
  onCompactChange?: (compact: boolean) => void;
  storageKey?: string;
  compactStorageKey?: string;
}

export interface DrawerStateApi {
  open: boolean;
  isOpen: boolean;
  compact: boolean;
  isCompact: boolean;
  isControlled: boolean;
  isControlledCompact: boolean;
  isHydrated: boolean;
  setOpen: (next: boolean | ((previous: boolean) => boolean)) => void;
  setCompact: (next: boolean | ((previous: boolean) => boolean)) => void;
  openDrawer: () => void;
  close: () => void;
  closeDrawer: () => void;
  toggle: () => void;
  toggleCompact: () => void;
}

function readBoolean(value: unknown, key: 'open' | 'compact'): boolean | null {
  if (typeof value === 'boolean') return value;
  if (value && typeof value === 'object') {
    const nested = (value as Record<string, unknown>)[key];
    if (typeof nested === 'boolean') return nested;
  }
  return null;
}

export function useDrawerState({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  compact: controlledCompact,
  defaultCompact = false,
  onCompactChange,
  storageKey,
  compactStorageKey,
}: UseDrawerStateOptions = {}): DrawerStateApi {
  const isControlledOpen = controlledOpen !== undefined;
  const isControlledCompact = controlledCompact !== undefined;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalCompact, setInternalCompact] = useState(defaultCompact);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window === 'undefined') return;

    if (!isControlledOpen && storageKey) {
      const saved = safeStorage.getItem(storageKey, null);
      if (saved !== null) {
        const resolved = readBoolean(saved, 'open');
        if (resolved !== null) {
          setInternalOpen(resolved);
          onOpenChange?.(resolved);
        }
      }
    }

    if (!isControlledCompact && compactStorageKey) {
      const saved = safeStorage.getItem(compactStorageKey, null);
      if (saved !== null) {
        const resolved = readBoolean(saved, 'compact');
        if (resolved !== null) {
          setInternalCompact(resolved);
          onCompactChange?.(resolved);
        }
      }
    }
  }, [
    storageKey,
    compactStorageKey,
    isControlledOpen,
    isControlledCompact,
    onOpenChange,
    onCompactChange,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (!isControlledOpen && storageKey && event.key === storageKey && event.newValue !== null) {
        try {
          const resolved = readBoolean(JSON.parse(event.newValue), 'open');
          if (resolved !== null) {
            setInternalOpen(resolved);
            onOpenChange?.(resolved);
          }
        } catch {
          // Ignore malformed external entries.
        }
      }

      if (
        !isControlledCompact &&
        compactStorageKey &&
        event.key === compactStorageKey &&
        event.newValue !== null
      ) {
        try {
          const resolved = readBoolean(JSON.parse(event.newValue), 'compact');
          if (resolved !== null) {
            setInternalCompact(resolved);
            onCompactChange?.(resolved);
          }
        } catch {
          // Ignore malformed external entries.
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [
    storageKey,
    compactStorageKey,
    isControlledOpen,
    isControlledCompact,
    onOpenChange,
    onCompactChange,
  ]);

  const isOpen = isControlledOpen ? Boolean(controlledOpen) : Boolean(internalOpen);
  const isCompact = isControlledCompact ? Boolean(controlledCompact) : Boolean(internalCompact);

  const setOpen = useCallback(
    (next: boolean | ((previous: boolean) => boolean)) => {
      const current = isControlledOpen ? Boolean(controlledOpen) : Boolean(internalOpen);
      const nextVal = typeof next === 'function' ? next(current) : next;

      if (!isControlledOpen) {
        setInternalOpen(nextVal);
        if (storageKey) safeStorage.setItem(storageKey, nextVal);
      }
      onOpenChange?.(nextVal);
    },
    [isControlledOpen, controlledOpen, internalOpen, storageKey, onOpenChange],
  );

  const setCompact = useCallback(
    (next: boolean | ((previous: boolean) => boolean)) => {
      const current = isControlledCompact ? Boolean(controlledCompact) : Boolean(internalCompact);
      const nextVal = typeof next === 'function' ? next(current) : next;

      if (!isControlledCompact) {
        setInternalCompact(nextVal);
        if (compactStorageKey) safeStorage.setItem(compactStorageKey, nextVal);
      }
      onCompactChange?.(nextVal);
    },
    [isControlledCompact, controlledCompact, internalCompact, compactStorageKey, onCompactChange],
  );

  const openDrawer = useCallback(() => setOpen(true), [setOpen]);
  const closeDrawer = useCallback(() => setOpen(false), [setOpen]);
  const toggle = useCallback(() => setOpen((prev) => !prev), [setOpen]);
  const toggleCompact = useCallback(() => setCompact((prev) => !prev), [setCompact]);

  return {
    open: isOpen,
    isOpen,
    compact: isCompact,
    isCompact,
    isControlled: isControlledOpen,
    isControlledCompact,
    isHydrated,
    setOpen,
    setCompact,
    openDrawer,
    close: closeDrawer,
    closeDrawer,
    toggle,
    toggleCompact,
  };
}

export function useDrawer(options?: UseDrawerStateOptions): DrawerStateApi {
  return useDrawerState(options);
}

// ============================================================================
// WAI-ARIA Focus Trap, Scroll Lock & Keyboard Accessibility
// ============================================================================

export interface UseDrawerAccessibilityOptions {
  drawerRef: RefObject<HTMLElement | null>;
  open?: boolean;
  isOpen?: boolean;
  side?: 'left' | 'right';
  variant?: DrawerVariant;
  isTemporary?: boolean;
  onClose?: () => void;
  initialFocusRef?: RefObject<HTMLElement | null>;
  triggerRef?: RefObject<HTMLElement | null>;
}

export function useDrawerAccessibility({
  drawerRef,
  open,
  isOpen,
  variant,
  isTemporary,
  onClose,
  initialFocusRef,
  triggerRef,
}: UseDrawerAccessibilityOptions): void {
  const activeOpen = Boolean(open !== undefined ? open : isOpen);
  const activeTemporary =
    isTemporary !== undefined ? Boolean(isTemporary) : variant === 'temporary';

  const savedTriggerRef = useRef<HTMLElement | null>(null);
  const prevOpenRef = useRef(activeOpen);

  useEffect(() => {
    if (activeOpen && activeTemporary) {
      if (triggerRef?.current) savedTriggerRef.current = triggerRef.current;
      else if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
        savedTriggerRef.current = document.activeElement;
      }
    }
  }, [activeOpen, activeTemporary, triggerRef]);

  useEffect(() => {
    if (activeOpen && activeTemporary) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [activeOpen, activeTemporary]);

  useEffect(() => {
    if (!activeOpen || !activeTemporary) return;

    const rafId = requestAnimationFrame(() => {
      if (!drawerRef?.current) return;
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
        return;
      }
      const focusables = getFocusableElements(drawerRef.current);
      if (focusables.length > 0) {
        focusables[0]?.focus();
      } else {
        if (!drawerRef.current.hasAttribute('tabindex')) {
          drawerRef.current.setAttribute('tabindex', '-1');
        }
        drawerRef.current.focus();
      }
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeOpen, activeTemporary, drawerRef, initialFocusRef]);

  useEffect(() => {
    if (!activeOpen || !activeTemporary) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
        return;
      }

      if (event.key === 'Tab') {
        if (!drawerRef?.current) return;
        const focusables = getFocusableElements(drawerRef.current);
        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }
        const first = focusables[0] as HTMLElement;
        const last = focusables[focusables.length - 1] as HTMLElement;
        const active = document.activeElement;

        if (event.shiftKey) {
          if (active === first || !drawerRef.current.contains(active)) {
            event.preventDefault();
            last.focus();
          }
        } else if (active === last || !drawerRef.current.contains(active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [activeOpen, activeTemporary, drawerRef, onClose]);

  useEffect(() => {
    if (prevOpenRef.current && !activeOpen && activeTemporary) {
      const target = triggerRef?.current || savedTriggerRef.current;
      if (target && typeof target.focus === 'function') {
        requestAnimationFrame(() => {
          if (typeof document !== 'undefined' && document.body.contains(target)) {
            target.focus();
          }
        });
      }
    }
    prevOpenRef.current = activeOpen;
  }, [activeOpen, activeTemporary, triggerRef]);
}

// ============================================================================
// Compound Component Context
// ============================================================================

export type DrawerVariant = 'responsive' | 'persistent' | 'temporary' | 'compact';

export interface DrawerContextValue {
  side: 'left' | 'right';
  variant: DrawerVariant;
  isOpen: boolean;
  open: boolean;
  isCompact: boolean;
  compact: boolean;
  isModal: boolean;
  isTemporary: boolean;
  isHydrated: boolean;
  drawerId: string;
  id: string;
  titleId: string;
  close: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;
  toggle: () => void;
  toggleCompact: () => void;
  setOpen: (next: boolean | ((previous: boolean) => boolean)) => void;
  setCompact: (next: boolean | ((previous: boolean) => boolean)) => void;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerContext must be used within a <Drawer> provider');
  }
  return context;
}
