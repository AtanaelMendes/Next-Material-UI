'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { InputText } from '../inputs/InputText';

export type DataTableAlign = 'left' | 'center' | 'right';

export interface DataTableHeader {
  label: ReactNode;
  align?: DataTableAlign;
  title?: string;
}

export interface DataTableProps {
  data?: Record<string, unknown>[];
  header?: DataTableHeader[];
  dense?: boolean;
  mainText?: ReactNode;
  action?: ReactNode;
  filterable?: boolean;
  filterPlaceholder?: string;
  emptyLabel?: string;
  footerLabel?: (count: number) => ReactNode;
  className?: string;
}

const alignClass = (align?: DataTableAlign) =>
  align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';

/** Scrollable data table with an optional text filter. */
export function DataTable({
  data = [],
  header = [],
  dense,
  mainText,
  action,
  filterable = true,
  filterPlaceholder = 'Filtrar',
  emptyLabel = 'Não há dados para exibir...',
  footerLabel,
  className,
}: DataTableProps) {
  const [filter, setFilter] = useState('');

  const rows = useMemo(() => {
    if (!filter.trim()) return data;
    const needle = filter.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((value) => typeof value === 'string' && value.toLowerCase().includes(needle)),
    );
  }, [data, filter]);

  return (
    <div className={`flex w-full flex-wrap bg-surface border border-border rounded-lg shadow-sm overflow-hidden max-h-[80%] ${className || ''}`}>
      <div className='bg-surface-secondary border-b border-border flex flex-wrap gap-2 px-4 py-2 items-center justify-between w-full'>
        <div className='text-content font-medium'>{mainText}</div>
        <div className='flex items-center gap-2'>
          <div>{action}</div>
          {filterable && (
            <div className='w-32'>
              <InputText
                placeholder={filterPlaceholder}
                onChange={(_id, value) => setFilter(value)}
                id='filtra_table'
                clearable
              />
            </div>
          )}
        </div>
      </div>
      <div className='relative overflow-x-auto w-full max-h-full overflow-y-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-content-secondary'>
          <thead className='text-xs text-content uppercase bg-surface-muted sticky top-0 z-10 border-b border-border'>
            <tr>
              {header.map((column, index) => (
                <th
                  scope='col'
                  className={`${dense ? 'px-2 py-1' : 'px-4 py-2'} ${alignClass(column.align)}`}
                  key={index}
                >
                  <div className='inline-flex items-center' title={column.title || ''}>
                    {column.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className='bg-surface'>
                <td colSpan={header.length || 1} className='px-4 py-6 text-center italic text-content-muted'>
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr
                  key={`tr-${rowIndex}`}
                  className='odd:bg-surface even:bg-surface-secondary hover:bg-hover border-b border-border transition-colors'
                >
                  {Object.keys(row).map((key, columnIndex) => (
                    <td
                      key={key}
                      className={`${dense ? 'px-2 py-1' : 'px-4 py-2'} ${alignClass(
                        header[columnIndex]?.align,
                      )} text-content-secondary`}
                    >
                      {row[key] as ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
          <tfoot className='sticky bottom-0 bg-surface-secondary border-t border-border text-content-secondary'>
            <tr>
              <td colSpan={header.length || 1} className={dense ? 'px-2 py-1' : 'px-4 py-2'}>
                {footerLabel ? footerLabel(rows.length) : `Exibindo ${rows.length} registros`}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
