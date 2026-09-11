import { useState } from 'react';
import { Button } from '../../../components/common';
import { Input } from '../../../components/forms';

export const AccountForm = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('checking');
  const [color, setColor] = useState('#2563eb');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('O nome da conta é obrigatório.');
      return;
    }

    const numericBalance = parseFloat(balance.replace(',', '.'));
    if (isNaN(numericBalance)) {
      setError('Informe um saldo inicial válido.');
      return;
    }

    setError('');
    onSubmit({
      name: name.trim(),
      balance: numericBalance,
      type,
      color,
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {error && <div className="transaction-form__error">{error}</div>}

      <Input
        label="Nome da Instituição ou Conta"
        placeholder="Ex: Nubank, Bradesco, Carteira"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="transaction-form__row">
        <Input
          label="Saldo Inicial (R$)"
          placeholder="0,00"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />

        <div className="input-group">
          <label className="input-group__label">Tipo de Conta</label>
          <select 
            className="input-group__field"
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="checking">Conta Corrente</option>
            <option value="savings">Poupança</option>
            <option value="investment">Investimento</option>
            <option value="cash">Dinheiro Físico</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label className="input-group__label">Cor de Identificação</label>
        <input 
          type="color" 
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
        />
      </div>

      <div className="transaction-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Salvar Conta
        </Button>
      </div>
    </form>
  );
};

