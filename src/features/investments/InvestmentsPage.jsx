import { useState } from 'react';
import { Card, Button } from '../../components/common';
import { Modal } from '../../components/feedback';
import { formatCurrency } from '../../utils/formatCurrency';
import { useInvestments } from './useInvestments';
import { AssetForm } from './components/AssetForm';
import './InvestmentsPage.scss';

export const InvestmentsPage = () => {
  const {
    portfolio,
    marketQuotes,
    news,
    loadingMarket,
    totalInvested,
    currentTotalValue,
    totalProfitLoss,
    profitPercentage,
    addAsset,
    removeAsset,
    refreshMarketData,
  } = useInvestments();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAsset = (data) => {
    addAsset(data);
    setIsModalOpen(false);
  };

  return (
    <div className="investments-page">
      <header className="investments-page__header">
        <div>
          <h1 className="investments-page__title">Investimentos & Mercado</h1>
          <p className="investments-page__subtitle">
            Acompanhe ações, fundos imobiliários, criptomoedas e o mercado financeiro em tempo real.
          </p>
        </div>
        <div className="investments-page__actions">
          <Button variant="secondary" onClick={refreshMarketData}>
            {loadingMarket ? 'Atualizando...' : '🔄 Atualizar Cotações'}
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            + Adicionar Ativo
          </Button>
        </div>
      </header>

      {/* Ticker / Cotações em Tempo Real (Internet Feed) */}
      <section className="market-ticker-section">
        <h2 className="market-ticker-section__title">
          <span className="live-indicator">●</span> Cotações ao Vivo do Mercado
        </h2>
        <div className="ticker-grid">
          {marketQuotes.map((quote) => {
            const isPositive = quote.change >= 0;
            return (
              <div key={quote.ticker} className="ticker-card">
                <div className="ticker-card__top">
                  <span className="ticker-card__symbol">{quote.ticker}</span>
                  <span className={`ticker-card__change ${isPositive ? 'positive' : 'negative'}`}>
                    {isPositive ? '▲ +' : '▼ '}{quote.change.toFixed(2)}%
                  </span>
                </div>
                <div className="ticker-card__name">{quote.name}</div>
                <div className="ticker-card__price">
                  {formatCurrency(quote.price)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Métricas Consolidadas da Carteira */}
      <section className="investments-page__summary">
        <Card className="investment-stat-card">
          <Card.Body>
            <span className="investment-stat-card__title">Total Aplicado</span>
            <p className="investment-stat-card__value">{formatCurrency(totalInvested)}</p>
          </Card.Body>
        </Card>
        <Card className="investment-stat-card">
          <Card.Body>
            <span className="investment-stat-card__title">Valor Atual da Carteira</span>
            <p className="investment-stat-card__value">{formatCurrency(currentTotalValue)}</p>
          </Card.Body>
        </Card>
        <Card className="investment-stat-card">
          <Card.Body>
            <span className="investment-stat-card__title">Rentabilidade Estimada</span>
            <p className={`investment-stat-card__value ${totalProfitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
              {totalProfitLoss >= 0 ? '+' : ''}{formatCurrency(totalProfitLoss)} ({profitPercentage.toFixed(2)}%)
            </p>
          </Card.Body>
        </Card>
      </section>

      {/* Grid Principal: Carteira de Ativos & Notícias ao Vivo */}
      <div className="investments-grid-layout">
        {/* Tabela de Ativos da Carteira */}
        <Card className="portfolio-card">
          <Card.Header title="Meus Ativos (Ações, FIIs e Cripto)" />
          <Card.Body>
            <div className="portfolio-table-wrapper">
              <table className="portfolio-table">
                <thead>
                  <tr>
                    <th>Ativo</th>
                    <th>Tipo</th>
                    <th>Qtd.</th>
                    <th>Preço Médio</th>
                    <th>Preço Atual</th>
                    <th>Total Atual</th>
                    <th>Retorno</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((asset) => {
                    const totalAssetVal = asset.quantity * asset.currentPrice;
                    const diff = (asset.currentPrice - asset.avgPrice) * asset.quantity;
                    const diffPercent = asset.avgPrice > 0 ? ((asset.currentPrice - asset.avgPrice) / asset.avgPrice) * 100 : 0;
                    const isProfitable = diff >= 0;

                    return (
                      <tr key={asset.id}>
                        <td>
                          <div className="asset-info">
                            <span className="asset-ticker">{asset.ticker}</span>
                            <span className="asset-name">{asset.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="asset-type-badge">
                            {asset.type === 'stocks' ? 'Ação' : asset.type === 'fiis' ? 'FII' : asset.type === 'crypto' ? 'Cripto' : 'Renda Fixa'}
                          </span>
                        </td>
                        <td>{asset.quantity}</td>
                        <td>{formatCurrency(asset.avgPrice)}</td>
                        <td>{formatCurrency(asset.currentPrice)}</td>
                        <td className="font-semibold">{formatCurrency(totalAssetVal)}</td>
                        <td className={isProfitable ? 'text-success font-semibold' : 'text-danger font-semibold'}>
                          {isProfitable ? '+' : ''}{diffPercent.toFixed(2)}%
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="action-btn-delete"
                            onClick={() => removeAsset(asset.id)}
                            title="Remover ativo"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>

        {/* Notícias do Mercado em Tempo Real */}
        <Card className="news-card">
          <Card.Header title="Notícias & Radar de Mercado" />
          <Card.Body>
            <div className="news-list">
              {news.map((item) => (
                <article key={item.id} className="news-item">
                  <div className="news-item__meta">
                    <span className="news-item__category">{item.category}</span>
                    <span className="news-item__time">{item.time}</span>
                  </div>
                  <h3 className="news-item__title">{item.title}</h3>
                  <span className="news-item__source">Fonte: {item.source}</span>
                </article>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Novo Ativo"
      >
        <AssetForm
          onSubmit={handleCreateAsset}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

