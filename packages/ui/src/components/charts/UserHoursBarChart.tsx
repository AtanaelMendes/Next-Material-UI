'use client';

import { useMemo } from 'react';

export interface UserHoursDatum {
  user: string;
  hours: number;
  color?: string;
}

export interface UserHoursBarChartProps {
  data?: UserHoursDatum[];
  title?: string;
  height?: string;
  emptyLabel?: string;
}

const DEFAULT_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

/** Horizontal bar chart rendered with plain SVG. */
export function UserHoursBarChart({
  data = [],
  title,
  height = '260px',
  emptyLabel = 'Sem dados para exibir',
}: UserHoursBarChartProps) {
  const max = useMemo(() => Math.max(...data.map((item) => Number(item.hours) || 0), 1), [data]);

  const W = 280;
  const rowH = 28;
  const H = data.length * rowH + 20;
  const labelW = 70;
  const barAreaW = W - labelW - 50;

  if (!data.length) {
    return (
      <div className='flex items-center justify-center text-content-muted text-sm' style={{ height }}>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center w-full' style={{ height }}>
      {title && <p className='text-sm font-semibold text-content mb-2 text-center'>{title}</p>}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className='w-full max-w-xs'
        style={{ maxHeight: 'calc(100% - 24px)' }}
        role='img'
        aria-label={title || 'Gráfico de horas por usuário'}
      >
        {data.map((item, index) => {
          const value = Number(item.hours) || 0;
          const bw = (value / max) * barAreaW;
          const y = index * rowH + 8;
          const color = item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
          return (
            <g key={index}>
              <text x={0} y={y + 12} fontSize='10' fill='var(--content-secondary)' dominantBaseline='middle'>
                {item.user}
              </text>
              <rect x={labelW} y={y} width={bw} height={16} fill={color} rx='3'>
                <title>{`${item.user}: ${value}h`}</title>
              </rect>
              <text x={labelW + bw + 4} y={y + 12} fontSize='9' fill='var(--content-muted)' dominantBaseline='middle'>
                {value}h
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default UserHoursBarChart;
