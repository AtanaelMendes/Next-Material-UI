import { cn } from '../../lib/cn';

export interface NewBadgeProps {
  /** Reference date in dd/MM/yyyy format. */
  referenceDate?: string;
  rotate?: number;
  days?: number;
  size?: string;
  className?: string;
  label?: string;
}

/** "New" badge shown while a dd/MM/yyyy reference date is within `days`. */
export function NewBadge({
  referenceDate,
  rotate = 0,
  days = 30,
  size = '0.5rem',
  className = '',
  label = 'Novo',
}: NewBadgeProps) {
  if (!referenceDate) return null;

  const [day, month, year] = referenceDate.split('/').map(Number);
  if (!day || !month || !year) return null;

  const refDate = new Date(year, month - 1, day);
  const validade = new Date(refDate);
  validade.setDate(validade.getDate() + days);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (hoje > validade) return null;

  return (
    <span
      style={{ transform: `rotate(${rotate}deg)`, fontSize: size }}
      className={cn(
        'bg-danger text-danger-content font-bold px-1 py-0.5 rounded-md uppercase shadow-md z-10',
        className,
      )}
    >
      {label}
    </span>
  );
}

export default NewBadge;
