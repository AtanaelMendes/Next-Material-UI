import { cn } from '../../lib/cn';

export interface WarningMessageProps {
  title?: string;
  subTitle?: string;
  text?: string;
  className?: string;
  iconSize?: string | number;
}

/** Warning callout with an icon and up to three text lines. */
export function WarningMessage({ title, subTitle, text, className, iconSize }: WarningMessageProps) {
  return (
    <div className={cn('flex justify-center w-full my-8', className)}>
      <div className='text-center flex items-center text-warning mr-4'>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          width={iconSize || '45'}
          height={iconSize || '45'}
        />
      </div>
      <div className='text-center'>
        {title && <span className='block text-xl font-semibold'>{title}</span>}
        {subTitle && <span className='block text-lg'>{subTitle}</span>}
        {text && <span className='block text-sm'>{text}</span>}
      </div>
    </div>
  );
}

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default WarningMessage;
