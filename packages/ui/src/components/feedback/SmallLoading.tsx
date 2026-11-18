import { cn } from '../../lib/cn';

export interface SmallLoadingProps {
  active?: boolean;
  className?: string;
  label?: string;
}

/** Small inline spinner. */
export function SmallLoading({ active, className, label }: SmallLoadingProps) {
  if (!active) return null;
  return (
    <div role='status' aria-label={label || 'Carregando'}>
      <svg
        className={cn('animate-spin mr-0.5 h-5 w-5 text-primary-text', className)}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  );
}

export default SmallLoading;
