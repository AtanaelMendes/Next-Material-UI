import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputText } from './InputText';
import { Combobox } from './Combobox';
import { Select } from './Select';
import { Checkbox } from './Checkbox';

describe('Inputs', () => {
  it('applies the phone mask and reports the masked value', () => {
    const onChange = vi.fn();
    render(<InputText id='phone' mask='phone' onChange={onChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '11987654321' } });
    expect(input).toHaveValue('(11) 98765-4321');
    expect(onChange).toHaveBeenCalledWith('phone', '(11) 98765-4321');
  });

  it('formats currency input', () => {
    render(<InputText id='price' mask='currency' />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '123456' } });
    expect(input).toHaveValue('1.234,56');
  });

  it('clears the field and notifies the parent', () => {
    const onChange = vi.fn();
    render(<InputText id='name' value='Ana' clearable onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Limpar campo' }));
    expect(onChange).toHaveBeenCalledWith('name', '');
  });

  it('exposes the required error message', () => {
    render(<InputText id='name' required={{ name: { error: true, errorMsg: 'Obrigatório' } }} />);
    expect(screen.getByText('Obrigatório')).toBeInTheDocument();
  });

  it('selects an option in the accessible combobox', () => {
    const onChange = vi.fn();
    render(
      <Combobox
        id='state'
        options={[
          { value: 'sp', label: 'São Paulo' },
          { value: 'sc', label: 'Santa Catarina' },
        ]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Santa Catarina' }));
    expect(onChange).toHaveBeenCalledWith('state', 'sc');
  });

  it('renders a native select and emits its value', () => {
    const onChange = vi.fn();
    render(
      <Select
        id='uf'
        options={[
          { value: 'sp', label: 'SP' },
          { value: 'sc', label: 'SC' },
        ]}
        onChange={onChange}
      />,
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'sc' } });
    expect(onChange).toHaveBeenCalledWith('uf', 'sc');
  });

  it('toggles a checkbox', () => {
    const onChange = vi.fn();
    render(<Checkbox id='terms' label='Aceito' onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith('terms', true);
  });
});
