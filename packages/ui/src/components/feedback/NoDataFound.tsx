import { cn } from '../../lib/cn';

export interface NoDataFoundProps {
  className?: string;
  visible?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  emptyLabel?: string;
}

/** Inline empty/loading placeholder. */
export function NoDataFound({
  className,
  visible = true,
  isLoading,
  loadingLabel = 'Carregando',
  emptyLabel = 'Não há dados para exibir...',
}: NoDataFoundProps) {
  return (
    <div className={cn('grid grid-cols-1 p-2', !visible && 'hidden')}>
      <div className={cn('col-span-1 font-semibold italic text-content-muted', className)}>
        {isLoading ? (
          <>
            {loadingLabel}
            <span className='animate-ping'>...</span>
          </>
        ) : (
          <>{emptyLabel}</>
        )}
      </div>
    </div>
  );
}

export default NoDataFound;
