import { useState } from 'react';
import { Button } from '../../../components/common';
import { Input } from '../../../components/forms';

export const BudgetForm = ({ onSubmit, onCancel }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [icon, setIcon] = useState('💰');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim()) {
      setError('A categoria é obrigatória.');
      return;
    }

    const numericLimit = parseFloat(limit.replace(',', '.'));
    if (isNaN(numericLimit) || numericLimit <= 0) {
      setError('Informe um valor de teto válido e positivo.');
      return;
    }

    setError('');
    onSubmit({
      category: category.trim(),
      limit: numericLimit,
      icon,
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {error && <div className="transaction-form__error">{error}</div>}

      <Input
        label="Categoria ou Nome do Teto"
        placeholder="Ex: Assinaturas, Mercado, Farmácia"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <div className="transaction-form__row">
        <Input
          label="Limite Máximo Mensal (R$)"
          placeholder="0,00"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />

        <div className="input-group">
          <label className="input-group__label">Ícone</label>
          <select 
            className="input-group__field"
            value={icon} 
            onChange={(e) => setIcon(e.target.value)}
          >
            <option value="🍔">🍔 Alimentação</option>
            <option value="🚗">🚗 Transporte</option>
            <option value="🎬">🎬 Lazer</option>
            <option value="💡">💡 Serviços / Contas</option>
            <option value="🛍️">🛍️ Compras</option>
            <option value="🏥">🏥 Saúde</option>
            <option value="📚">📚 Educação</option>
            <option value="💰">💰 Outros</option>
          </select>
        </div>
      </div>

      <div className="transaction-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Salvar Orçamento
        </Button>
      </div>
    </form>
  );
};

