import { cn } from '../../lib/cn';

export interface LoadingProps {
  active?: boolean;
  className?: string;
  /** Optional logo/image shown while loading. Defaults to a spinner. */
  src?: string;
  alt?: string;
  label?: string;
}

/** Full-area loading overlay. */
export function Loading({ active, className, src, alt = 'carregando', label = 'Carregando...' }: LoadingProps) {
  if (!active) return null;

  return (
    <div
      role='status'
      aria-live='polite'
      className={cn(
        'flex absolute w-full h-full bg-surface/95 backdrop-blur-sm text-content z-999 top-0 left-0 items-center justify-center',
        className,
      )}
    >
      <div className='h-50 w-45 relative text-center'>
        {src ? (
          <img src={src} alt={alt} className='h-full w-full object-contain animate-pulse' />
        ) : (
          <span className='mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-surface-muted border-t-primary' />
        )}
        <span className='-bottom-5 left-1/2 -translate-x-1/2 absolute font-medium'>{label}</span>
      </div>
    </div>
  );
}

export default Loading;
