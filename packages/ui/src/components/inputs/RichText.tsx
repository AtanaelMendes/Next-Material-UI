'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressBar } from './ProgressBar';

export interface RichTextProps {
  id?: string;
  label?: ReactNode;
  value?: string;
  onChange?: (id: string, value: string) => void;
  required?: boolean;
  maxLength?: number;
  small?: boolean;
  height?: number | string;
  /** Called when the character budget is exceeded. */
  onLimitExceeded?: (message: string) => void;
  limitMessage?: string;
}

interface SunEditorApi {
  getContents: () => string;
  getText: () => string;
  setContents: (value: string) => void;
  getContext: () => { element: { toolbar: { firstChild: HTMLElement | null } } };
}

/**
 * Rich-text editor backed by SunEditor. The dependency is optional and loaded
 * lazily on the client, so the core library stays SSR-safe. Consumers should
 * import "suneditor/dist/css/suneditor.min.css" (see README).
 */
export function RichText({
  id,
  label,
  value,
  onChange,
  required,
  maxLength,
  small,
  height = 200,
  onLimitExceeded,
  limitMessage = 'Você atingiu o limite de caracteres permitidos.',
}: RichTextProps) {
  const editorRef = useRef<SunEditorApi | null>(null);
  const [Editor, setEditor] = useState<ComponentType<Record<string, unknown>> | null>(null);
  const [percent, setPercent] = useState(0);
  const [content, setContent] = useState(value || '');
  const maxCharacters = maxLength || 4000;

  useEffect(() => {
    let active = true;
    import('suneditor-react')
      .then((module) => {
        if (active) setEditor(() => module.default as ComponentType<Record<string, unknown>>);
      })
      .catch(() => {
        if (active) onLimitExceeded?.('Não foi possível carregar o editor de texto.');
      });
    return () => {
      active = false;
    };
  }, [onLimitExceeded]);

  useEffect(() => {
    setContent(value || '');
  }, [value]);

  const handleChange = (next: string) => {
    if (!editorRef.current) return;
    if (next.length <= maxCharacters) {
      setContent(next);
      onChange?.(id || '', next);
      setPercent(Math.floor((next.length * 100) / maxCharacters));
    } else {
      onLimitExceeded?.(limitMessage);
      setPercent(100);
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={id} className={`${small ? 'mb-0.5 text-xs' : 'mb-2'} text-sm font-medium text-content inline-flex`}>
          {required && <FontAwesomeIcon icon={faAsterisk} width='10' height='10' color='red' className='self-start' />}
          {label}
        </label>
      )}
      <div className='border border-border bg-surface rounded shadow relative'>
        {Editor ? (
          <Editor
            getSunEditorInstance={(editor: SunEditorApi) => {
              editorRef.current = editor;
            }}
            setContents={content}
            setOptions={{
              height,
              defaultStyle: 'font-family: Inter, sans-serif; font-size: 14px;',
              buttonList: [['undo', 'redo'], ['bold', 'italic', 'underline'], ['list', 'removeFormat']],
              showPathLabel: false,
            }}
            onChange={handleChange}
          />
        ) : (
          <div className='flex h-24 items-center justify-center text-sm text-content-muted'>{label || 'Editor'}</div>
        )}
        <div className='absolute right-6 bottom-0.5 flex items-center'>
          <ProgressBar id={`${id}_pbar`} value={percent} />
        </div>
      </div>
    </>
  );
}

export default RichText;
