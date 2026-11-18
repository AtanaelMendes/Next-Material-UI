'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faAsterisk, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldLabel } from '../display/Typography';
import { cn } from '../../lib/cn';

export interface DatePickerProps {
  label?: ReactNode;
  onChange?: (value: string) => void;
  id?: string;
  maxDate?: Date | string;
  defaultDate?: Date | string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function formatDate(date: Date | string | null): string {
  if (!date) return '';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '';
  const day = String(parsed.getDate()).padStart(2, '0');
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${parsed.getFullYear()}`;
}

function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

interface CalendarProps {
  year: number;
  month: number;
  onSelectDate: (date: Date) => void;
  selectedDate: Date | null;
}

function Calendar({ year, month, onSelectDate, selectedDate }: CalendarProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  return (
    <div className='bg-surface border border-border rounded-lg shadow-lg p-4 w-80'>
      <div className='text-center font-semibold text-content mb-4'>
        {MONTHS[month]} {year}
      </div>
      <div className='grid grid-cols-7 gap-2 mb-3'>
        {WEEK_DAYS.map((day) => (
          <div key={day} className='text-center text-xs font-medium text-content-muted'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {cells.map((day, index) => (
          <button
            type='button'
            key={index}
            onClick={() => day && onSelectDate(new Date(year, month, day))}
            disabled={!day}
            aria-label={day ? `${day} de ${MONTHS[month]} de ${year}` : undefined}
            className={cn(
              'p-2 text-sm rounded',
              !day && 'invisible',
              day &&
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === month &&
                selectedDate?.getFullYear() === year
                ? 'bg-primary text-primary-content'
                : 'hover:bg-hover text-content-secondary',
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Date picker with a custom calendar popup. */
export function DatePicker({
  label,
  onChange,
  id,
  defaultDate,
  required,
  placeholder = 'Selecione uma data',
  className,
}: DatePickerProps) {
  const initialDate = defaultDate && isValidDate(new Date(defaultDate)) ? new Date(defaultDate) : null;
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [inputValue, setInputValue] = useState(formatDate(initialDate));
  const pickerRef = useRef<HTMLDivElement>(null);

  const choose = (date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDate(date));
    onChange?.(formatDate(date));
    setShow(false);
  };

  useEffect(() => {
    if (!show) return;
    const handleOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) setShow(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [show]);

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else setCurrentMonth((month) => month - 1);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else setCurrentMonth((month) => month + 1);
  };

  return (
    <div ref={pickerRef} className={cn('relative', className)}>
      {label && (
        <div className='flex flex-row gap-1 mb-2'>
          {required && <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start' />}
          <label htmlFor={id}>
            <FieldLabel>{label}</FieldLabel>
          </label>
        </div>
      )}

      <button
        type='button'
        onClick={() => setShow((previous) => !previous)}
        aria-expanded={show}
        aria-haspopup='dialog'
        className={cn(
          'flex w-full bg-input border border-input-border rounded-lg p-2 cursor-pointer text-left',
          show && 'border-primary border-2',
        )}
      >
        <span className='flex items-center mr-2'>
          <FontAwesomeIcon
            icon={faCalendar}
            width='20'
            height='20'
            className={show ? 'text-primary-text' : 'text-content-muted'}
          />
        </span>
        <input
          type='text'
          id={id}
          value={inputValue}
          placeholder={placeholder}
          className='outline-none bg-transparent w-full text-content placeholder:text-content-muted'
          readOnly
          tabIndex={-1}
        />
      </button>

      {show && (
        <div className='absolute top-full mt-2 z-50'>
          <div className='flex justify-between items-center mb-4'>
            <button
              type='button'
              aria-label='Mês anterior'
              onClick={previousMonth}
              className='p-1 hover:bg-hover rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus'
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} width='20' height='20' className='text-content-muted' />
            </button>
            <span className='font-semibold text-content'>
              {new Date(currentYear, currentMonth).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <button
              type='button'
              aria-label='Próximo mês'
              onClick={nextMonth}
              className='p-1 hover:bg-hover rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus'
            >
              <FontAwesomeIcon icon={faChevronCircleRight} width='20' height='20' className='text-content-muted' />
            </button>
          </div>

          <Calendar year={currentYear} month={currentMonth} onSelectDate={choose} selectedDate={selectedDate} />

          <div className='flex gap-2 mt-4'>
            <button
              type='button'
              onClick={() => choose(new Date())}
              className='flex-1 px-3 py-1 bg-primary text-primary-content rounded hover:bg-primary-hover text-sm'
            >
              Hoje
            </button>
            <button
              type='button'
              onClick={() => {
                setInputValue('');
                setSelectedDate(null);
                onChange?.('');
                setShow(false);
              }}
              className='flex-1 px-3 py-1 bg-surface-muted text-content rounded hover:bg-hover text-sm'
            >
              Limpar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
