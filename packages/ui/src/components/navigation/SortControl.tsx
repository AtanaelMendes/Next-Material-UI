'use client';

import { useEffect, useRef, useState } from 'react';
import {
  faArrowDown19,
  faArrowDownAZ,
  faArrowDownShortWide,
  faArrowUp91,
  faArrowUpWideShort,
  faArrowUpZA,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../buttons/Button';
import { TooltipComponent } from '../overlays/Tooltip';
import { cn } from '../../lib/cn';

export interface SortOption {
  label: string;
  field: string;
  direction?: 'asc' | 'desc';
  type?: 'string' | 'number' | 'date';
}

export interface SortControlProps<T = Record<string, unknown>> {
  configOptions?: SortOption[];
  dataObject?: T[];
  setSortedDataFn?: ((data: T[]) => void) | null;
  useCompact?: boolean;
  applySort?: boolean;
  setApplySortFn?: ((value: boolean) => void) | null;
}

/** Sort control with ascending/descending modes and typed icons. */
export function SortControl<T = Record<string, unknown>>({
  configOptions = [],
  dataObject = [],
  setSortedDataFn = null,
  useCompact = false,
  applySort = false,
  setApplySortFn = null,
}: SortControlProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [sortField, setSortField] = useState('');
  const [sortDataType, setSortDataType] = useState<'string' | 'number' | 'date'>('string');
  const [orderDirection, setOrderDirection] = useState<'' | 'asc' | 'desc'>('');
  const [selectedField, setSelectedField] = useState('Nenhum');
  const [sortIconASC, setSortIconASC] = useState(faArrowDownShortWide);
  const [sortIconDESC, setSortIconDESC] = useState(faArrowUpWideShort);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortData = (fieldToSort: string, direction: string, type: string): T[] => {
    if (!Array.isArray(dataObject) || dataObject.length === 0) return [];
    const normalize = (value: unknown) => {
      if (value === null || value === undefined || value === '') return null;
      if (type === 'number') {
        if (typeof value === 'number') return value;
        return parseFloat(String(value).replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
      }
      if (type === 'date') {
        const parts = String(value).split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts.map(Number);
          return new Date(year || 0, (month || 1) - 1, day || 1).getTime();
        }
        return null;
      }
      return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();
    };

    return [...dataObject].sort((a, b) => {
      const valA = normalize((a as Record<string, unknown>)[fieldToSort]);
      const valB = normalize((b as Record<string, unknown>)[fieldToSort]);
      if (valA === null && valB !== null) return direction === 'asc' ? 1 : -1;
      if (valA !== null && valB === null) return direction === 'asc' ? -1 : 1;
      if (valA === null || valB === null) return 0;
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const setIcons = (type: string) => {
    if (type === 'string') {
      setSortIconASC(faArrowDownAZ);
      setSortIconDESC(faArrowUpZA);
    } else if (type === 'number') {
      setSortIconASC(faArrowDown19);
      setSortIconDESC(faArrowUp91);
    } else {
      setSortIconASC(faArrowDownShortWide);
      setSortIconDESC(faArrowUpWideShort);
    }
  };

  useEffect(() => {
    if (applySort) {
      setSortedDataFn?.(sortData(sortField, orderDirection, sortDataType));
    }
    if (typeof setApplySortFn === 'function') {
      const timeout = setTimeout(() => setApplySortFn(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [applySort]);

  useEffect(() => {
    if (sortField) setSortedDataFn?.(sortData(sortField, orderDirection, sortDataType));
  }, [orderDirection, sortField]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (useCompact) {
    return (
      <div className='inline-block' ref={dropdownRef}>
        <TooltipComponent content={<div className='text-xs z-[100]'>Ordenação</div>} usePortal={false}>
          <button
            type='button'
            aria-label='Ordenação'
            aria-expanded={isOpen}
            className='flex items-center gap-2 px-3 py-1 mb-1 border border-border rounded-md bg-surface text-content-secondary shadow-sm hover:bg-hover hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus xl:py-2.5 xl:px-4'
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <FontAwesomeIcon icon={faArrowDownShortWide} width='16' height='16' />
          </button>
        </TooltipComponent>
        {isOpen && (
          <div className='absolute mt-2 min-w-[120px] bg-surface-secondary border border-border rounded-md shadow-lg z-50 p-1'>
            {configOptions.map((option) => (
              <button
                type='button'
                key={option.label}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-sm rounded-md m-1',
                  selectedField === option.label && 'font-semibold bg-primary text-primary-content',
                  selectedField !== option.label && 'text-content cursor-pointer hover:bg-hover',
                )}
                onClick={() => {
                  const direction = option.direction || 'asc';
                  setOrderDirection(direction);
                  setSelectedField(option.label);
                  setSortDataType(option.type || 'string');
                  setSortField(option.field);
                  setIsOpen(false);
                  setSortedDataFn?.(sortData(option.field, direction, option.type || 'string'));
                }}
              >
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='relative w-[fit]' ref={dropdownRef}>
        <button
          type='button'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          className='flex justify-between items-center border border-border rounded-md p-2 cursor-pointer bg-surface shadow-md xl:py-2 xl:mb-1'
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span className='text-sm text-content'>Ordenar por:&nbsp;</span>
          <FontAwesomeIcon icon={faCaretDown} width='16' height='16' className='text-content-muted ms-2' />
        </button>
        <div
          className={cn(
            'absolute top-full w-full bg-surface-secondary border border-border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto p-2',
            !isOpen && 'hidden',
          )}
        >
          {configOptions.map((option) => (
            <button
              type='button'
              key={option.label}
              className={cn(
                'px-3 py-2 text-sm flex w-full items-center rounded-md m-1',
                selectedField === option.label && 'font-semibold bg-primary p-2 text-primary-content',
                selectedField !== option.label && 'text-content cursor-pointer hover:bg-hover',
              )}
              onClick={() => {
                const type = option.type || 'string';
                setSelectedField(option.label);
                setSortDataType(type);
                setIcons(type);
                setSortField(option.field);
                setIsOpen(false);
                if (orderDirection === '') setOrderDirection('asc');
                setSortedDataFn?.(sortData(option.field, orderDirection || 'asc', type));
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className='inline-flex rounded-md shadow-md border border-border p-0.5'>
        <TooltipComponent content={<div className='text-xs z-[100]'>Ordenação crescente</div>} usePortal={false}>
          <Button
            square
            aria-label='Ordenação crescente'
            className={cn('rounded-l-md px-2 py-1.5 xl:py-2.5', orderDirection === 'asc' ? 'bg-primary text-primary-content' : 'text-content-secondary hover:bg-hover')}
            onClick={() => setOrderDirection('asc')}
          >
            <FontAwesomeIcon icon={sortIconASC} width='16' height='16' />
          </Button>
        </TooltipComponent>
        <TooltipComponent content={<div className='text-xs z-[100]'>Ordenação decrescente</div>} usePortal={false}>
          <Button
            square
            aria-label='Ordenação decrescente'
            className={cn('rounded-r-md px-2 py-1.5 xl:py-2.5', orderDirection === 'desc' ? 'bg-primary text-primary-content' : 'text-content-secondary hover:bg-hover')}
            onClick={() => setOrderDirection('desc')}
          >
            <FontAwesomeIcon icon={sortIconDESC} width='16' height='16' />
          </Button>
        </TooltipComponent>
      </div>
    </div>
  );
}
