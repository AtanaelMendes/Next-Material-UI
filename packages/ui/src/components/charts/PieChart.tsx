'use client';

import { useMemo } from 'react';

export interface PieChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data?: PieChartDatum[];
  chartData?: PieChartDatum[];
  nmChart?: string;
  title?: string;
  height?: string;
  emptyLabel?: string;
}

const DEFAULT_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#ec4899'];

/** Donut/pie chart rendered with plain SVG. */
export function PieChart({
  data,
  chartData,
  nmChart,
  title,
  height = '260px',
  emptyLabel = 'Sem dados para exibir',
}: PieChartProps) {
  const items = useMemo(() => {
    const source = data || chartData || [];
    return source.map((item, index) => ({
      label: item.label ?? '',
      value: Number(item.value) || 0,
      color: item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
  }, [data, chartData]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.value, 0), [items]);

  const slices = useMemo(() => {
    let angle = -Math.PI / 2;
    return items.map((item) => {
      const ratio = total > 0 ? item.value / total : 0;
      const startAngle = angle;
      angle += ratio * 2 * Math.PI;
      return { ...item, ratio, startAngle, endAngle: angle };
    });
  }, [items, total]);

  const radius = 80;
  const cx = 100;
  const cy = 100;

  const cartesian = (angle: number) => ({
    x: Number((cx + radius * Math.cos(angle)).toFixed(6)),
    y: Number((cy + radius * Math.sin(angle)).toFixed(6)),
  });

  const describeSlice = (startAngle: number, endAngle: number) => {
    const start = cartesian(startAngle);
    const end = cartesian(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  };

  if (!items.length || total === 0) {
    return (
      <div className='flex items-center justify-center text-content-muted text-sm' style={{ height }}>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div id={nmChart} className='flex flex-col items-center w-full' style={{ height }}>
      {title && <p className='text-sm font-semibold text-content mb-2 text-center'>{title}</p>}
      <div className='flex flex-col sm:flex-row items-center gap-4 w-full'>
        <svg viewBox='0 0 200 200' className='w-36 h-36 shrink-0' role='img' aria-label={title || 'Gráfico de pizza'}>
          {slices.map((slice, index) => (
            <path
              key={index}
              d={describeSlice(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              stroke='var(--surface)'
              strokeWidth='2'
            >
              <title>{`${slice.label}: ${slice.value} (${(slice.ratio * 100).toFixed(1)}%)`}</title>
            </path>
          ))}
          <circle cx={cx} cy={cy} r={36} fill='var(--surface)' />
          <text x={cx} y={cy - 6} textAnchor='middle' fontSize='14' fontWeight='bold' fill='var(--content)'>
            {total}
          </text>
          <text x={cx} y={cy + 10} textAnchor='middle' fontSize='8' fill='var(--content-muted)'>
            total
          </text>
        </svg>
        <ul className='flex flex-col gap-1.5 text-xs min-w-0 flex-1'>
          {slices.map((slice, index) => (
            <li key={index} className='flex items-center gap-2 truncate'>
              <span className='w-3 h-3 rounded-sm shrink-0' style={{ background: slice.color }} />
              <span className='text-content-secondary truncate'>{slice.label}</span>
              <span className='ml-auto font-semibold text-content shrink-0'>
                {(slice.ratio * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PieChart;
