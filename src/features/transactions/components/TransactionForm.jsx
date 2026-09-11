import { useState } from 'react';
import { Button } from '../../../components/common';
import { Input } from '../../../components/forms';
import './TransactionForm.scss';

export const TransactionForm = ({ onSubmit, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('A descrição é obrigatória.');
      return;
    }

    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Informe um valor válido e positivo.');
      return;
    }

    setError('');
    onSubmit({
      description: description.trim(),
      amount: numericAmount,
      type,
      category,
      date,
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {error && <div className="transaction-form__error">{error}</div>}

      <div className="transaction-form__type-selector">
        <button
          type="button"
          className={`transaction-form__type-btn ${type === 'income' ? 'transaction-form__type-btn--income-active' : ''}`}
          onClick={() => setType('income')}
        >
          Entrada (+)
        </button>
        <button
          type="button"
          className={`transaction-form__type-btn ${type === 'expense' ? 'transaction-form__type-btn--expense-active' : ''}`}
          onClick={() => setType('expense')}
        >
          Saída (-)
        </button>
      </div>

      <Input
        label="Descrição"
        placeholder="Ex: Supermercado, Salário, Internet"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="transaction-form__row">
        <Input
          label="Valor (R$)"
          placeholder="0,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <div className="input-group">
          <label className="input-group__label">Categoria</label>
          <select 
            className="input-group__field"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Moradia">Moradia</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
            <option value="Serviços">Serviços</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
      </div>

      <Input
        label="Data"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <div className="transaction-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Salvar Transação
        </Button>
      </div>
    </form>
  );
};

