import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { PieChart } from './PieChart';
import { AnswersChart } from './AnswersChart';
import { UserHoursBarChart } from './UserHoursBarChart';

describe('Charts', () => {
  it('renders an accessible pie chart', () => {
    render(<PieChart data={[{ label: 'A', value: 3 }]} title='Distribuição' />);
    expect(screen.getByRole('img', { name: 'Distribuição' })).toBeInTheDocument();
  });

  it('renders the empty state', () => {
    render(<PieChart data={[]} />);
    expect(screen.getByText('Sem dados para exibir')).toBeInTheDocument();
  });

  it('renders bar charts', () => {
    render(<AnswersChart data={[{ label: 'A', value: 1 }]} />);
    render(<UserHoursBarChart data={[{ user: 'Ana', hours: 8 }]} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('server-renders pure display components without browser APIs', () => {
    const html = renderToString(<PieChart data={[{ label: 'A', value: 1 }]} title='SSR' />);
    expect(html).toContain('SSR');
  });
});
