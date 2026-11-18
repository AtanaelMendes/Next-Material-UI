import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Drawer } from './Drawer';
import { DrawerContent } from './DrawerContent';
import { DrawerHeader } from './DrawerHeader';
import { DrawerToggle } from './DrawerToggle';

describe('Drawer', () => {
  it('renders controlled open state with WAI-ARIA attributes', () => {
    render(
      <Drawer open variant='persistent' dataTestId='test-drawer'>
        <DrawerHeader title='Painel' />
        <DrawerContent>Conteúdo</DrawerContent>
      </Drawer>,
    );
    const drawer = screen.getByTestId('test-drawer');
    expect(drawer).toHaveAttribute('data-state', 'open');
    expect(drawer).toHaveAttribute('data-side', 'left');
    expect(drawer).toHaveAttribute('aria-label', 'Navegação principal');
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });

  it('calls onOpenChange when the temporary drawer receives Escape', () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open variant='temporary' onOpenChange={onOpenChange} dataTestId='overlay'>
        <DrawerContent>Overlay</DrawerContent>
      </Drawer>,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('toggles from the toggle button and exposes aria-expanded', () => {
    const onToggle = vi.fn();
    render(<DrawerToggle side='left' open={false} onToggle={onToggle} />);
    const toggle = screen.getByTestId('left-drawer-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'left-drawer');
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('hydrates state from localStorage after mount without SSR mismatch', async () => {
    localStorage.setItem('drawer:test', 'true');
    render(
      <Drawer storageKey='drawer:test' variant='persistent' dataTestId='hydrated'>
        <DrawerContent>Hidratado</DrawerContent>
      </Drawer>,
    );
    await waitFor(() => {
      expect(screen.getByTestId('hydrated')).toHaveAttribute('data-state', 'open');
    });
  });

  it('closes on backdrop click in temporary mode', () => {
    const onOpenChange = vi.fn();
    render(
      <Drawer open variant='temporary' onOpenChange={onOpenChange}>
        <DrawerContent>Modal</DrawerContent>
      </Drawer>,
    );
    fireEvent.click(screen.getByTestId('drawer-backdrop'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
