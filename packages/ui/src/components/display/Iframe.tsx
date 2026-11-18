'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loading } from '../feedback/Loading';
import { cn } from '../../lib/cn';

export interface IframeProps {
  id?: string;
  /** Absolute URL or path relative to `baseUrl`. */
  src: string;
  title?: string;
  params?: Record<string, string>;
  visible?: boolean;
  active?: boolean;
  className?: string;
  /** Optional base URL prepended to `src` when it is relative. */
  baseUrl?: string;
  /** Origins allowed to post messages to the parent. Defaults to same-origin. */
  allowedOrigins?: string[];
  onMessage?: (type: string, payload: unknown) => void;
  onLoad?: () => void;
}

/** Sandboxed iframe wrapper with origin-checked postMessage handling. */
export function Iframe({
  id,
  src,
  title,
  params,
  visible,
  active = true,
  className,
  baseUrl,
  allowedOrigins,
  onMessage,
  onLoad,
}: IframeProps) {
  const [ready, setReady] = useState(false);

  const iframeSrc = useMemo(() => {
    const search = params ? `?${new URLSearchParams(params).toString()}` : '';
    if (!baseUrl) return `${src}${search}`;
    return `${baseUrl.replace(/\/$/, '')}/${src.replace(/^\//, '')}${search}`;
  }, [baseUrl, params, src]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const allowed =
        allowedOrigins && allowedOrigins.length > 0
          ? allowedOrigins
          : [typeof window !== 'undefined' ? window.location.origin : ''];
      if (!allowed.includes(event.origin)) return;
      const data = event.data as { type?: string; payload?: unknown } | null;
      if (data && typeof data === 'object') onMessage?.(data.type || '', data.payload);
    },
    [allowedOrigins, onMessage],
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  return (
    <div className={cn('flex-col w-full h-full min-h-100 min-w-100 relative', visible ? 'flex' : 'hidden')}>
      <Loading active={!ready} />
      {active && (
        <iframe
          id={id || 'iframe_component'}
          name={id || 'iframe_component'}
          src={iframeSrc}
          title={title}
          className={cn('w-full h-full', className)}
          onLoad={() => {
            setReady(true);
            onLoad?.();
          }}
        />
      )}
    </div>
  );
}

export default Iframe;
