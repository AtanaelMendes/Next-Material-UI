'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';
import { Caption, FieldLabel } from './Typography';

export interface AccordionItemData {
  title: ReactNode;
  subTitle?: ReactNode;
  /** Trusted HTML string rendered inside the panel. */
  content: string;
}

export interface AccordionProps {
  items?: AccordionItemData[];
  className?: string;
}

interface InternalItemProps extends AccordionItemData {
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, subTitle, content, isOpen, onToggle }: InternalItemProps) {
  return (
    <div>
      <div
        className={cn(
          'ms-4 me-4 border border-primary p-1 shadow bg-primary text-primary-content hover:bg-primary-hover',
          isOpen ? 'rounded-t-lg border-b-0' : 'mb-3 rounded-lg',
        )}
      >
        <button
          type='button'
          onClick={onToggle}
          aria-expanded={isOpen}
          className='flex items-center justify-between w-full py-1 px-3 text-sm font-medium gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <span>
            <FieldLabel className='mb-0! !text-primary-content'>{title}</FieldLabel>
            {subTitle && (
              <>
                {' - '}
                <Caption className='!text-primary-content'>{subTitle}</Caption>
              </>
            )}
          </span>
          <FontAwesomeIcon
            className={cn('ease-in-out duration-300', isOpen && 'rotate-180')}
            icon={faChevronDown}
            width='18'
            height='18'
          />
        </button>
      </div>
      {isOpen && (
        <div
          className='mb-3 ms-4 me-4 border border-border bg-surface text-content shadow-md p-2 px-4 rounded-b-lg text-sm'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}

/** Accordion with independently expandable items. */
export function Accordion({ items = [], className }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((previous) =>
      previous.includes(index) ? previous.filter((item) => item !== index) : [...previous, index],
    );
  };

  return (
    <div className={cn('w-full mb-20', className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          subTitle={item.subTitle}
          content={item.content}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}

export default Accordion;
