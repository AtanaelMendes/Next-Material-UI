'use client';

import { useEffect, useState } from 'react';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps<T = unknown> {
  data?: T[];
  itemsPerPage?: number;
  callBackChangePage?: (items: T[]) => void;
  showPaginator?: boolean;
  showItemCountSelector?: boolean;
  size?: PaginationSize;
}

const buttonBase =
  'inline-flex items-center justify-center border border-border bg-surface text-content-secondary transition-colors hover:bg-hover hover:text-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:z-10 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-disabled disabled:text-disabled-content';

/** Accessible pagination with optional page-size selector. */
export function Pagination<T = unknown>({
  data = [],
  itemsPerPage = 50,
  callBackChangePage,
  showPaginator = false,
  showItemCountSelector = false,
  size = 'md',
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / perPage));
  const pageRange = 5;

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / perPage));
    setCurrentPage(1);
    callBackChangePage?.(data.length > 0 ? data.slice(0, perPage) : []);
  }, [data, perPage, callBackChangePage]);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    const startIndex = (page - 1) * perPage;
    callBackChangePage?.(data.slice(startIndex, startIndex + perPage));
  };

  const sizeClasses = size === 'sm' ? 'h-6 px-2 text-xs' : size === 'lg' ? 'h-12 px-4 text-lg' : 'h-9 px-3 text-sm';
  const iconSize = size === 'sm' ? 8 : size === 'lg' ? 16 : 12;

  const pageNumbers = (() => {
    const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    const endPage = Math.min(totalPages, startPage + pageRange - 1);
    return Array.from({ length: Math.max(0, endPage - startPage + 1) }, (_, index) => startPage + index);
  })();

  return (
    <>
      {(showPaginator || showItemCountSelector) && (
        <div className='flex flex-wrap gap-2 justify-between items-center mb-4'>
          {showPaginator && (
            <span className='text-sm text-content-secondary'>
              Mostrando {perPage * (currentPage - 1) + 1} a {Math.min(perPage * currentPage, data.length)} de{' '}
              {data.length} itens
            </span>
          )}
          {showItemCountSelector && (
            <div className='flex items-center'>
              <label htmlFor='itemsPerPage' className='text-sm text-content-secondary mr-2'>
                Itens por página:
              </label>
              <select
                id='itemsPerPage'
                value={perPage}
                onChange={(event) => setPerPage(Number(event.target.value))}
                className='border border-input-border bg-input text-content rounded-md p-1 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-focus'
              >
                {[10, 20, 50, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      {totalPages > 1 && (
        <nav aria-label='Paginação'>
          <ul className='inline-flex -space-x-px'>
            {currentPage > 1 && (
              <>
                <li>
                  <button type='button' onClick={() => handleClick(1)} aria-label='Primeira página' className={cn(buttonBase, 'rounded-s-lg', sizeClasses)}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} width={iconSize} height={iconSize} />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => handleClick(currentPage - 1)} aria-label='Página anterior' className={cn(buttonBase, sizeClasses)}>
                    <FontAwesomeIcon icon={faChevronLeft} width={iconSize} height={iconSize} />
                  </button>
                </li>
              </>
            )}
            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  type='button'
                  onClick={() => handleClick(page)}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={cn(
                    buttonBase,
                    sizeClasses,
                    currentPage === page && 'bg-selected text-selected-content font-semibold border-primary',
                  )}
                >
                  {page}
                </button>
              </li>
            ))}
            {currentPage < totalPages && (
              <>
                <li>
                  <button type='button' onClick={() => handleClick(currentPage + 1)} aria-label='Próxima página' className={cn(buttonBase, sizeClasses)}>
                    <FontAwesomeIcon icon={faChevronRight} width={iconSize} height={iconSize} />
                  </button>
                </li>
                <li>
                  <button type='button' onClick={() => handleClick(totalPages)} aria-label='Última página' className={cn(buttonBase, 'rounded-e-lg', sizeClasses)}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} width={iconSize} height={iconSize} />
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
}
