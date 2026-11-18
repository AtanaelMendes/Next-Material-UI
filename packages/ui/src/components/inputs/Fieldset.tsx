import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { FieldLabel } from '../display/Typography';

export interface FieldsetProps {
  label?: ReactNode;
  borderStyle?: string;
  className?: string;
  children?: ReactNode;
}

/** Fieldset with a floating label. */
export function Fieldset({ label, borderStyle = 'rounded-lg', className, children }: FieldsetProps) {
  return (
    <fieldset
      className={cn(
        'flex items-center border bg-surface text-content text-sm w-full pt-0 p-2 border-border',
        borderStyle,
        className,
      )}
    >
      <legend className='px-2'>{label && <FieldLabel>{label}</FieldLabel>}</legend>
      {children}
    </fieldset>
  );
}

export default Fieldset;
