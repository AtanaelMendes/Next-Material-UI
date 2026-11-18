'use client';

import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../../lib/cn';

export type CardAlign = 'left' | 'center' | 'right';
export type CardColor = 'primary' | 'success' | 'warning' | 'danger';

export interface CardProps {
  children?: ReactNode;
  width?: string;
  className?: string;
}

export interface CardActionsProps {
  children?: ReactNode;
  align?: CardAlign;
}

export function CardActions({ children, align = 'left' }: CardActionsProps) {
  const position: Record<CardAlign, string> = {
    center: 'text-center',
    right: 'text-right',
    left: 'text-left',
  };
  return (
    <div className={cn('inline-block w-full max-h-14 p-1 xl:p-2 border-t-2 border-border', position[align])}>
      {children}
    </div>
  );
}

export interface CardTitleProps {
  children?: ReactNode;
  primary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  color?: CardColor;
  onClick?: () => void;
  button?: boolean;
}

export function CardTitle({ children, primary, success, warning, danger, color, onClick, button }: CardTitleProps) {
  const getColor = () => {
    if (color === 'primary' || primary) return 'bg-primary text-primary-content';
    if (color === 'success' || success) return 'bg-success text-success-content';
    if (color === 'warning' || warning) return 'bg-warning text-warning-content';
    if (color === 'danger' || danger) return 'bg-danger text-danger-content';
    return 'text-content-secondary';
  };

  return (
    <div
      className={cn(
        'mb-2 text-lg xl:text-xl font-bold tracking-tight w-full p-1 xl:p-2 border-b-2 border-border relative rounded-t-lg h-fit',
        getColor(),
      )}
    >
      {button && (
        <button
          type='button'
          aria-label='Ações do card'
          className='float-right z-10 rounded-full p-1 hover:bg-hover cursor-pointer drop-shadow'
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} width='20' height='20' />
        </button>
      )}
      <span className='drop-shadow'>{children}</span>
    </div>
  );
}

export function CardBody({ children }: { children?: ReactNode }) {
  return <div className='flex flex-col w-full text-content-secondary p-1 xl:p-2'>{children}</div>;
}

export interface CardImageProps {
  src?: string;
  alt?: string;
  height?: number;
  title?: ReactNode;
  button?: boolean;
  onClick?: () => void;
  /** Optional fallback used when src is missing. */
  fallbackSrc?: string;
}

export function CardImage({ src, alt, height, title, button, onClick, fallbackSrc }: CardImageProps) {
  return (
    <div className='relative w-full overflow-hidden' style={{ height: height ? `${height}px` : '200px' }}>
      {title && (
        <div className='absolute top-2 left-2 z-10 px-3 py-1.5 text-sm font-semibold text-white bg-slate-900/80 backdrop-blur-sm rounded-md shadow'>
          {title}
        </div>
      )}
      {button && (
        <button
          type='button'
          aria-label='Ações da imagem'
          className='absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-sm hover:bg-slate-900/90 cursor-pointer shadow transition-colors'
          onClick={onClick}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} width='16' height='16' className='text-white' />
        </button>
      )}
      <img
        src={src || fallbackSrc || ''}
        alt={alt || 'imagem'}
        className='h-full w-full object-cover'
        onError={(event) => {
          if (fallbackSrc && event.currentTarget.src !== fallbackSrc) {
            event.currentTarget.src = fallbackSrc;
          }
        }}
      />
    </div>
  );
}

/** Material-inspired card container. */
export function Card({ children, width, className }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap bg-surface border border-border rounded-lg shadow',
        width || 'w-full',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
