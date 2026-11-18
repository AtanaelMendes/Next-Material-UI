import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Title, Subtitle, Caption } from './Typography';
import { Blockquote } from './Blockquote';
import { PillsBadge } from '../buttons/PillsBadge';

describe('Server rendering', () => {
  it('renders presentational components to HTML strings', () => {
    const html = renderToString(
      <div>
        <Title>Servidor</Title>
        <Subtitle>Subtítulo</Subtitle>
        <Caption>Legenda</Caption>
        <Blockquote type='success'>Aviso</Blockquote>
        <PillsBadge type='success'>Ativo</PillsBadge>
      </div>,
    );

    expect(html).toContain('Servidor');
    expect(html).toContain('bg-success-subtle');
    expect(html).toContain('Ativo');
  });
});
