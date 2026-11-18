'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';

type FaIcon = ComponentProps<typeof FontAwesomeIcon>['icon'];

export interface DropdownItem {
  label: ReactNode;
  icon?: FaIcon;
  action: () => void;
  className?: string;
  itemClassName?: string;
  hoverClassName?: string;
}

export interface ButtonDropDownProps {
  id?: string;
  label?: ReactNode;
  small?: boolean;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  block?: boolean;
  className?: string;
  items?: DropdownItem[];
}

const VARIANTS: Record<NonNullable<ButtonDropDownProps['type']>, string> = {
  primary: 'bg-primary text-primary-content border border-primary hover:bg-primary-hover focus:ring-focus',
  secondary:
    'bg-surface-secondary text-content border border-border hover:bg-hover focus:ring-focus',
  success:
    'bg-success text-success-content border border-success hover:bg-success-hover focus:ring-success',
  danger: 'bg-danger text-danger-content border border-danger hover:bg-danger-hover focus:ring-danger',
  warning:
    'bg-warning text-warning-content border border-warning hover:bg-warning-hover focus:ring-warning',
};

/** Dropdown button with an accessible action menu. */
export function ButtonDropDown({
  id,
  label,
  small,
  type = 'primary',
  block,
  className,
  items = [],
}: ButtonDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className='relative w-fit'>
      <button
        type='button'
        ref={buttonRef}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        id={id || 'dropdownButton'}
        className={cn(
          'relative focus:outline-none font-medium text-sm focus:ring-4 rounded',
          small ? '!py-1.5 !px-2' : '!py-2 !px-4',
          block ? 'w-full' : 'w-fit',
          className,
          VARIANTS[type],
        )}
      >
        <div className='flex justify-between'>
          <div className='flex justify-center w-full'>
            <span>{label || ''}</span>
          </div>
          <div className='w-7.5 flex justify-center'>
            <FontAwesomeIcon
              className={cn('ease-in-out duration-300', isOpen && 'rotate-180')}
              icon={faChevronDown}
              width='14'
              height='14'
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          id='dropdownChildren'
          ref={menuRef}
          role='menu'
          className='z-10 bg-surface-secondary border border-border rounded shadow-lg absolute w-fit min-w-25 max-w-50 mt-1'
        >
          <ul className='space-y-1 self-end block p-1 w-full divide-y divide-border'>
            {items.map((item, index) => (
              <li
                key={index}
                role='none'
                className={cn(
                  'self-end px-2 py-1 text-content transition-colors duration-300 ease-in-out',
                  item.hoverClassName ||
                    'hover:bg-hover hover:text-primary-text hover:rounded cursor-pointer',
                )}
              >
                <button
                  type='button'
                  role='menuitem'
                  className={cn('flex w-full items-center p-1 text-left', item.itemClassName)}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                >
                  {item.icon && (
                    <FontAwesomeIcon icon={item.icon} className='mr-2' width='16' height='16' />
                  )}
                  <span className='text-sm'>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ButtonDropDown;
