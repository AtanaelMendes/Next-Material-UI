import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, generateButtonClass } from './Button';

describe('Button', () => {
  it('renders its children and handles clicks', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies semantic variant, size and shape classes', () => {
    const classes = generateButtonClass('danger', true, false, 'small', true, false, false, false);
    expect(classes).toContain('bg-danger');
    expect(classes).toContain('rounded-full');
    expect(classes).toContain('py-1');
    expect(classes).toContain('w-full');
  });

  it('is disabled and non-interactive when disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Bloqueado
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Bloqueado' });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('merges className overrides', () => {
    render(<Button className='custom-class'>Ok</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
