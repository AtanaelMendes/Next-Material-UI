'use client';

import type { ReactNode } from 'react';
import { ModalGrid } from './ModalGrid';
import { Timeline, type TimelineRow } from '../display/Timeline';

export interface TimelineModalProps {
  modalControl?: boolean;
  closeModalCallback?: () => void;
  setModalControl?: (open: boolean) => void;
  title?: ReactNode;
  scrollable?: boolean;
  timelineData?: TimelineRow[];
  id?: string;
}

/** Modal preset that displays a timeline. */
export function TimelineModal({
  modalControl,
  closeModalCallback,
  setModalControl,
  title,
  scrollable,
  timelineData,
  id,
}: TimelineModalProps) {
  return (
    <ModalGrid
      height='h-full'
      size='md'
      title={title ?? 'Histórico'}
      scrollable={scrollable}
      btnCancel='FECHAR'
      contentClass='p-4'
      footerClass='items-center justify-end'
      id={id}
      modalControl={modalControl}
      closeModalCallback={closeModalCallback}
      setModalControl={setModalControl}
    >
      <div className='col-span-12'>{timelineData && <Timeline data={timelineData} />}</div>
    </ModalGrid>
  );
}

export default TimelineModal;
