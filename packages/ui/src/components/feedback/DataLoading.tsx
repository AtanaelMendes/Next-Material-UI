'use client';

import { useEffect, useState } from 'react';
import { cn } from '../../lib/cn';

export interface DataLoadingProps {
  className?: string;
  label?: string;
}

/** Animated "Loading..." label with a dot animation. */
export function DataLoading({ className, label = 'Carregando' }: DataLoadingProps) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((previous) => (previous === 3 ? 0 : previous + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-1 p-2' role='status'>
      <div className={cn('col-span-1 font-semibold italic text-content-muted animate-pulse', className)}>
        {label}
        {'.'.repeat(dots)}
      </div>
    </div>
  );
}

export default DataLoading;
