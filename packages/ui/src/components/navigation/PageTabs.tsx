'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { faRotateRight, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NewBadge, type NewBadgeProps } from '../display/NewBadge';
import { cn } from '../../lib/cn';

export interface PageTab {
  id: string;
  name: ReactNode;
  active?: boolean;
  visible?: boolean;
  contador?: number;
  blink?: boolean;
  reloadTab?: () => void;
  closeCallback?: () => void;
  newBadge?: Omit<NewBadgeProps, 'className'> & { className?: string };
}

export interface PageTabsProps {
  pageTabs?: PageTab[];
  onClick?: (id: string) => void;
  wordWrap?: boolean;
  scrollable?: boolean;
  reloadLabel?: string;
  closeLabel?: string;
  className?: string;
}

/** Tab strip with reload, close and counter affordances. */
export function PageTabs({
  pageTabs = [],
  onClick,
  wordWrap,
  scrollable,
  reloadLabel = 'Reload',
  closeLabel = 'Fechar',
  className,
}: PageTabsProps) {
  const [reload, setReload] = useState(false);

  const handleReload = (tab: PageTab) => {
    if (!tab.active || typeof tab.reloadTab !== 'function') return;
    tab.reloadTab();
    setReload(true);
    setTimeout(() => setReload(false), 2000);
  };

  return (
    <div className={cn(scrollable ? 'overflow-x-auto' : 'overflow-x-hidden', 'overflow-y-hidden pr-2 shadow-md', className)}>
      <ul className='flex text-xs font-medium mt-[5px]'>
        {pageTabs.map((tab) => (
          <li
            key={`${tab.id}-tab`}
            className={cn(
              'object-contain hover:bg-blue-600 mx-0.5 mt-0.5 rounded-t-lg relative h-8 xl:h-10 transition-colors duration-200',
              tab.active ? 'border-yellow-300 bg-primary' : 'border border-border bg-surface',
              (tab.contador ?? -1) >= 0 && 'mt-3',
              tab.visible === false && 'hidden',
            )}
          >
            <button
              type='button'
              id={`${tab.id}-tab`}
              onClick={() => {
                setReload(false);
                onClick?.(tab.id);
              }}
              className={cn(
                !tab.active && tab.blink &&
                  'after:bg-danger after:animate-ping after:absolute after:bottom-1 after:left-4 after:rounded-t-lg after:w-1/2 after:h-3/5',
                'relative inline-block h-8 xl:h-10 px-1 border-b-4 rounded-t-lg hover:text-primary-content hover:border-yellow-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                wordWrap ? 'word-wrap' : 'whitespace-nowrap',
                tab.active ? 'text-primary-content border-yellow-300' : 'text-content-secondary border-border hover:bg-primary',
              )}
              title={typeof tab.name === 'string' ? tab.name : undefined}
            >
              {tab.name}
              {tab.newBadge && (
                <NewBadge
                  referenceDate={tab.newBadge.referenceDate || ''}
                  days={tab.newBadge.days}
                  rotate={tab.newBadge.rotate}
                  size={tab.newBadge.size}
                  className={tab.newBadge.className}
                />
              )}
            </button>

            {typeof tab.reloadTab === 'function' && Number.isNaN(Number(tab.contador)) && (
              <button
                type='button'
                aria-label={reloadLabel}
                title={reloadLabel}
                className={cn(
                  'bg-surface absolute -top-2 -right-1.5 rounded-full cursor-pointer p-0.5 shadow border border-border z-40 transition-transform duration-200 h-[18px]',
                  tab.active && reload && 'animate-spin',
                  !tab.active && 'hidden',
                )}
                onClick={() => handleReload(tab)}
              >
                <FontAwesomeIcon icon={faRotateRight} width='12' height='12' className='text-primary-text' />
              </button>
            )}

            {typeof tab.closeCallback === 'function' && (
              <button
                type='button'
                aria-label={closeLabel}
                title={closeLabel}
                className='text-primary-text bg-surface absolute -top-2 -right-1.5 rounded-full cursor-pointer p-0.5 shadow border border-border z-40 transition-transform duration-200 h-[18px]'
                onClick={() => tab.closeCallback?.()}
              >
                <FontAwesomeIcon icon={faX} width='12' height='12' />
              </button>
            )}

            {(tab.contador ?? -1) >= 0 && (
              <button
                type='button'
                aria-label={`${tab.contador} notificações`}
                disabled={typeof tab.reloadTab !== 'function' || !tab.active}
                className={cn(
                  'rounded-full p-[2px] text-white h-[18px] z-10 text-xs font-semibold absolute min-w-[18px] -top-1.5 -right-1.5 text-center shadow transition-colors duration-200',
                  !tab.active ? 'bg-slate-500' : 'bg-red-500',
                  tab.active && reload && 'animate-spin',
                )}
                onClick={() => handleReload(tab)}
              >
                <span className={cn(tab.active && reload && 'hidden')}>{tab.contador}</span>
                <FontAwesomeIcon
                  icon={faRotateRight}
                  width='12'
                  height='12'
                  className={cn('text-white', !(tab.active && reload) && 'hidden')}
                />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageTabs;
