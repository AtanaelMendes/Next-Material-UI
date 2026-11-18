import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-surface-muted', className)} {...props} />;
}

export function FormSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn('h-screen w-full flex flex-col bg-background', className)} {...props}>
      <div className='h-16 bg-surface border-b border-border flex items-center px-6'>
        <Skeleton className='h-8 w-48' />
        <div className='ml-auto'>
          <Skeleton className='h-9 w-24' />
        </div>
      </div>

      <div className='flex-1 p-6 overflow-y-auto'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='space-y-3'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-96' />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-6'>
              {[24, 32, 28, 20].map((width) => (
                <div key={width} className='space-y-2'>
                  <Skeleton className='h-4' style={{ width: `${width * 4}px` }} />
                  <Skeleton className='h-10 w-full' />
                </div>
              ))}
            </div>

            <div className='space-y-6'>
              {[36, 24, 32].map((width) => (
                <div key={width} className='space-y-2'>
                  <Skeleton className='h-4' style={{ width: `${width * 4}px` }} />
                  <Skeleton className='h-10 w-full' />
                </div>
              ))}
              <div className='space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-24 w-full' />
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 pt-6 border-t border-border'>
            <Skeleton className='h-10 w-full sm:w-32' />
            <Skeleton className='h-10 w-full sm:w-28' />
            <div className='sm:ml-auto'>
              <Skeleton className='h-10 w-full sm:w-24' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type SkeletonListVariant = 'default' | 'cards' | 'table';

export interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  variant?: SkeletonListVariant;
}

export function SkeletonList({ className, count = 3, variant = 'default', ...props }: SkeletonListProps) {
  if (variant === 'cards') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)} {...props}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className='bg-surface rounded-lg border border-border p-6 space-y-4'>
            <div className='flex items-center space-x-3'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-4 w-32' />
                <Skeleton className='h-3 w-24' />
              </div>
            </div>
            <div className='space-y-3'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-3/4' />
            </div>
            <div className='flex justify-between items-center pt-4 border-t border-border'>
              <div className='flex space-x-2'>
                <Skeleton className='h-8 w-16' />
                <Skeleton className='h-8 w-16' />
              </div>
              <Skeleton className='h-8 w-20' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={cn('bg-surface rounded-lg border border-border overflow-hidden', className)} {...props}>
        <div className='bg-surface-secondary px-6 py-4 border-b border-border'>
          <div className='grid grid-cols-4 gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-12' />
          </div>
        </div>
        <div className='divide-y divide-border'>
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className='px-6 py-4'>
              <div className='grid grid-cols-4 gap-4 items-center'>
                <div className='flex items-center space-x-3'>
                  <Skeleton className='h-8 w-8 rounded-full' />
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                </div>
                <Skeleton className='h-4 w-20' />
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-6 w-6 rounded-full' />
                  <Skeleton className='h-4 w-16' />
                </div>
                <div className='flex space-x-2'>
                  <Skeleton className='h-8 w-8' />
                  <Skeleton className='h-8 w-8' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)} {...props}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='bg-surface rounded-lg border border-border p-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4 flex-1'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='flex-1 space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-5 w-48' />
                  <Skeleton className='h-5 w-16 rounded-full' />
                </div>
                <Skeleton className='h-4 w-64' />
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-8 w-20' />
              <Skeleton className='h-8 w-8' />
              <Skeleton className='h-8 w-8' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
