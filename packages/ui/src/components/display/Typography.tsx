import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { empty } from '../../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

export interface TypographyProps {
  children?: ReactNode;
  className?: string;
}

export function Title({ children, className }: TypographyProps) {
  return <span className={cn('font-semibold text-content', className)}>{!empty(children) ? children : ''}</span>;
}

export function Subtitle({ children, className }: TypographyProps) {
  return <span className={cn('text-base text-content', className)}>{!empty(children) ? children : ''}</span>;
}

export function Label({ children, className }: TypographyProps) {
  return <span className={cn('text-sm text-content', className)}>{!empty(children) ? children : ''}</span>;
}

export function Caption({ children, className }: TypographyProps) {
  return <span className={cn('text-xs text-content-muted', className)}>{!empty(children) ? children : ''}</span>;
}

export interface FieldLabelProps extends TypographyProps {
  required?: boolean;
}

export function FieldLabel({ children, className, required }: FieldLabelProps) {
  return (
    <div className='inline-flex'>
      {required && (
        <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start mr-1' />
      )}
      <span className={cn('block mb-0.5 xl:mb-1 text-sm font-medium text-content', className)}>
        {!empty(children) ? children : ''}
      </span>
    </div>
  );
}

export default Title;
