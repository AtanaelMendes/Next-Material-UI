'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '../../lib/cn';
import type { RequiredFieldErrors } from '../../lib/types';

export interface InputFileProps {
  id?: string;
  label?: ReactNode;
  subLabel?: ReactNode;
  helperText?: ReactNode;
  required?: boolean | RequiredFieldErrors;
  disabled?: boolean;
  /** Allowed extensions without leading dots. */
  allowedExtensions?: string[];
  /** Maximum file size in MB. */
  maxSizeMB?: number;
  onChange?: (id: string, file: File) => void;
  onError?: (message: string) => void;
  className?: string;
}

const DEFAULT_EXTENSIONS = ['doc', 'docx', 'pdf', 'jpg', 'jpeg', 'png', 'xlsx', 'xml', 'csv', 'json', 'md'];

/** Drag-and-drop file input with extension and size validation. */
export function InputFile({
  id = 'fileInput',
  label,
  subLabel,
  helperText,
  required,
  disabled,
  allowedExtensions = DEFAULT_EXTENSIONS,
  maxSizeMB = 5,
  onChange,
  onError,
  className,
}: InputFileProps) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isRequired = required === true;
  const errorMap = typeof required === 'object' ? required : undefined;
  const hasError = Boolean(errorMap?.[id]?.error);

  const validate = (file?: File | null): boolean => {
    if (!file || disabled) {
      setFileName('');
      return false;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      onError?.(`O tamanho do arquivo não pode exceder ${maxSizeMB}MB.`);
      setFileName('');
      return false;
    }
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(extension)) {
      onError?.(`Arquivo inválido! Arquivos aceitos: ${allowedExtensions.join(', ')}`);
      setFileName('');
      return false;
    }
    setFileName(file.name.length > 30 ? `(...) ${file.name.slice(-30)}` : file.name);
    onChange?.(id, file);
    return true;
  };

  return (
    <>
      <div
        role='button'
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        className={cn(
          'border-2 rounded border-dashed px-2 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
          disabled
            ? 'bg-disabled cursor-not-allowed text-disabled-content border-border'
            : cn(
                'cursor-pointer text-primary-text',
                dragging ? 'border-primary bg-info-subtle' : 'bg-input border-input-border hover:border-content-muted',
              ),
          hasError && 'border-danger',
          className,
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          validate(event.dataTransfer.files[0]);
        }}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-2 flex items-center justify-end'>
            <FontAwesomeIcon icon={faCloudUploadAlt} width='30' height='30' />
          </div>
          <div className='col-span-10'>
            <span className='text-sm text-content-secondary block text-center'>
              <span className='font-bold'>{label || 'Arquivo'}</span>
              {subLabel && <span className='text-xs italic font-semibold'>&nbsp;{subLabel}</span>}
            </span>
            <span className='text-sm text-content-muted block text-center'>
              <span className='font-semibold'>Clique para selecionar </span> ou arraste e solte
            </span>
            <div className='text-center text-sm text-content'>{fileName || 'Nenhum arquivo escolhido'}</div>
          </div>
        </div>
        <input
          type='file'
          id={id}
          ref={fileInputRef}
          className='hidden'
          disabled={disabled}
          required={isRequired}
          onChange={(event) => validate(event.target.files?.[0])}
          accept={allowedExtensions.map((extension) => `.${extension}`).join(',')}
        />
      </div>
      {helperText && <div className='text-xs text-info-text'>{helperText}</div>}
      {hasError && (
        <div className='text-xs text-danger-text'>{errorMap?.[id]?.errorMsg || 'Este campo é obrigatório'}</div>
      )}
    </>
  );
}

export default InputFile;
