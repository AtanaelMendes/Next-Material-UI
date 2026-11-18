'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../buttons/Button';
import { FieldLabel } from '../display/Typography';
import { InputDate } from './InputDate';
import { TimePicker } from './TimePicker';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors } from '../../lib/types';

export interface DataHoraProps {
  id?: string;
  label?: ReactNode;
  value?: string;
  onChangeFunction?: (date: string, time: string) => void;
  required?: boolean | RequiredFieldErrors;
  helperText?: ReactNode;
  minDate?: string;
  maxDate?: string;
  className?: string;
  currentLabel?: string;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** Composite date + time field with a "now" shortcut. */
export function DataHora({
  id,
  label,
  value,
  onChangeFunction,
  required,
  helperText,
  minDate,
  maxDate,
  className,
  currentLabel = 'Data/Hora atual',
}: DataHoraProps) {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap && id && errorMap[id]?.error);

  useEffect(() => {
    if (!value) {
      setData('');
      setHora('');
      return;
    }
    const [datePart = '', timePart = ''] = value.split(' ');
    setData(datePart);
    setHora(timePart);
  }, [value]);

  useEffect(() => {
    if (typeof onChangeFunction === 'function' && data !== '' && hora !== '') {
      onChangeFunction(data, hora);
    }
  }, [data, hora, onChangeFunction]);

  const setNow = useCallback(() => {
    const now = new Date();
    setData(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
    setHora(`${pad(now.getHours())}:${pad(now.getMinutes())}`);
  }, []);

  return (
    <div className={cn('w-full relative', className)}>
      <div className='flex absolute -top-1.5 left-2 w-fit z-10 text-xs px-0.5 rounded-md mb-0 pb-0 text-nowrap before:bg-surface before:top-0.5 before:left-0 before:absolute before:w-full before:h-3 before:-z-10 before:content-[""] before:rounded-lg'>
        <label htmlFor={id} className='inline-flex relative'>
          {isRequired && (
            <FontAwesomeIcon icon={faAsterisk} width='8' height='8' color='red' className='self-start absolute' />
          )}
          {label && (
            <FieldLabel className={cn(isRequired ? 'ml-4' : 'ml-0 mb-0 pb-0', 'text-content-muted')}>{label}</FieldLabel>
          )}
        </label>
      </div>
      <div className='flex'>
        <div className='w-full'>
          <InputDate
            id={`data_${id}`}
            className={hasError ? 'border-danger' : 'border-input-border'}
            onChange={(_fieldId, next) => setData(next)}
            value={data}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <div className='ml-4'>
          <TimePicker
            id={`hora_${id}`}
            className={cn('w-20', hasError ? 'border-danger' : 'border-input-border')}
            onChange={(_fieldId, next) => setHora(next)}
            value={hora}
          />
        </div>
        <div className='ml-4'>
          <Button className='rounded-lg whitespace-nowrap' buttonType='secondary' bordered onClick={setNow}>
            {currentLabel}
          </Button>
        </div>
      </div>
      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[id || '']?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
      {helperText && <div className='text-xs text-info-text'>{helperText}</div>}
    </div>
  );
}

export default DataHora;
