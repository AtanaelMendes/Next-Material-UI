'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface RadioGroupItem {
  id: string;
  label: ReactNode;
  value: string | number;
  checked?: boolean;
  color?: 'primary' | 'danger';
  action?: (value: string | number) => void;
}

export interface RadioGroupProps {
  active?: boolean;
  name?: string;
  items?: RadioGroupItem[];
  onChange?: (id: string, value: string, checked: boolean) => void;
  type?: 'primary' | 'danger';
  className?: string;
}

/** Segmented radio group rendered as styled radio inputs. */
export function RadioGroup({ active, name, items, onChange, type = 'primary', className }: RadioGroupProps) {
  const commonClasses =
    'inline-flex items-center w-fit px-2 py-1 text-content-secondary bg-surface border border-border cursor-pointer transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-focus peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-background';

  const typeClasses: Record<'primary' | 'danger', string> = {
    primary:
      'peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-content hover:bg-hover hover:text-primary-text',
    danger:
      'peer-checked:border-danger peer-checked:bg-danger peer-checked:text-danger-content hover:bg-danger-subtle hover:text-danger-subtle-content',
  };

  if (!items) return <div className={cn(!active && 'hidden', className)}>Nenhum item recebido</div>;

  const last = items.length - 1;

  return (
    <div className={cn(active ? 'block' : 'hidden', className)}>
      <div className='flex justify-center'>
        <ul className='flex'>
          {items.map((item, index) => (
            <li key={item.id}>
              <input
                type='radio'
                id={item.id}
                name={name}
                onChange={(event) => onChange?.(event.target.id, item.value as string, event.target.checked)}
                checked={item.checked || false}
                className='sr-only peer'
              />
              <label
                htmlFor={item.id}
                onClick={() => item.action?.(item.value)}
                className={cn(
                  typeClasses[item.color || type || 'primary'],
                  commonClasses,
                  index === 0 && 'rounded-l-md',
                  index === last && 'rounded-r-md',
                )}
              >
                <div className='text-sm font-semibold'>{item.label}</div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RadioGroup;
