import { useState } from 'react';
import { Button } from '../../../components/common';
import { Input } from '../../../components/forms';

export const AssetForm = ({ onSubmit, onCancel }) => {
  const [ticker, setTicker] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('stocks');
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticker.trim()) {
      setError('O código (Ticker) do ativo é obrigatório.');
      return;
    }

    const parsedQty = parseFloat(quantity.replace(',', '.'));
    const parsedPrice = parseFloat(avgPrice.replace(',', '.'));

    if (isNaN(parsedQty) || parsedQty <= 0) {
      setError('Informe uma quantidade válida.');
      return;
    }

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Informe um preço médio válido.');
      return;
    }

    setError('');
    onSubmit({
      ticker: ticker.trim().toUpperCase(),
      name: name.trim() || ticker.trim().toUpperCase(),
      type,
      quantity: parsedQty,
      avgPrice: parsedPrice,
      currentPrice: parsedPrice, // Inicialmente igual ao preço de compra
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      {error && <div className="transaction-form__error">{error}</div>}

      <div className="transaction-form__row">
        <Input
          label="Código / Ticker"
          placeholder="Ex: PETR4, BTC, MXRF11"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />

        <div className="input-group">
          <label className="input-group__label">Tipo de Ativo</label>
          <select 
            className="input-group__field"
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="stocks">Ação (B3 / Exterior)</option>
            <option value="fiis">Fundo Imobiliário (FII)</option>
            <option value="crypto">Criptomoeda</option>
            <option value="fixed">Renda Fixa / Tesouro</option>
          </select>
        </div>
      </div>

      <Input
        label="Nome da Empresa / Projeto (Opcional)"
        placeholder="Ex: Petrobras, Bitcoin, Banco do Brasil"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="transaction-form__row">
        <Input
          label="Quantidade"
          placeholder="Ex: 100 ou 0.05"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <Input
          label="Preço Médio Pago (R$)"
          placeholder="0,00"
          value={avgPrice}
          onChange={(e) => setAvgPrice(e.target.value)}
          required
        />
      </div>

      <div className="transaction-form__actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Adicionar à Carteira
        </Button>
      </div>
    </form>
  );
};
