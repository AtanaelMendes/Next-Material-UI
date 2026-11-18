'use client';

import { useEffect, useState } from 'react';
import { Caption } from '../display/Typography';
import { cn } from '../../lib/cn';

export interface ProgressBarProps {
  id?: string;
  width?: string;
  value?: number;
  className?: string;
  showLabel?: boolean;
}

/** Determinate progress bar clamped to 100%. */
export function ProgressBar({ id, width, value = 0, className, showLabel = true }: ProgressBarProps) {
  const [progress, setProgress] = useState(value);

  useEffect(() => {
    setProgress(value || 0);
  }, [value]);

  return (
    <div className={cn('inline-flex items-center', className)}>
      <Caption className='me-2'>Limite:</Caption>
      <div
        id={id}
        role='progressbar'
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn('bg-surface-muted rounded-full h-2', width || 'w-50')}
      >
        <div
          className='bg-primary h-2 rounded-full transition-all duration-300'
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && <span className='text-xs ml-2 text-content-secondary'>{progress}%</span>}
    </div>
  );
}

export default ProgressBar;
