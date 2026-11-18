import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TooltipComponent } from './Tooltip';
import { Confirm } from './Confirm';
import { Dialog } from './Dialog';

describe('Overlays', () => {
  it('wires aria-describedby and shows the tooltip on hover when asChild is used', () => {
    render(
      <TooltipComponent asChild content='Ajuda' side='top'>
        <button type='button'>Foco</button>
      </TooltipComponent>,
    );
    const trigger = screen.getByRole('button', { name: 'Foco' });
    expect(trigger).toHaveAttribute('aria-describedby');
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Ajuda');
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('invokes confirm callbacks and closes', () => {
    const setVisible = vi.fn();
    const confirmActionCallback = vi.fn();
    render(
      <Confirm
        visible
        setVisible={setVisible}
        primaryText='Excluir?'
        btnAccept='Sim'
        btnDecline='Não'
        confirmActionCallback={confirmActionCallback}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Sim' }));
    expect(confirmActionCallback).toHaveBeenCalled();
    expect(setVisible).toHaveBeenCalledWith(false);
  });

  it('validates the dialog textarea minimum length without confirming', () => {
    const onConfirm = vi.fn();
    const onValidateError = vi.fn();
    render(
      <Dialog open title='Motivo' textAreaMinLength={10} onConfirm={onConfirm} onValidateError={onValidateError} />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onValidateError).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
