import { useState } from 'react';
import { Card, Button } from '../../components/common';
import { Modal } from '../../components/feedback';
import { formatCurrency } from '../../utils/formatCurrency';
import { useAccounts } from './useAccounts';
import { AccountForm } from './components/AccountForm';
import './AccountsPage.scss';

export const AccountsPage = () => {
  const { accounts, cards, totalBalance, totalInvoices, addAccount, removeAccount } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAccount = (data) => {
    addAccount(data);
    setIsModalOpen(false);
  };

  return (
    <div className="accounts-page">
      <header className="accounts-page__header">
        <div>
          <h1 className="accounts-page__title">Contas e Cartões</h1>
          <p className="accounts-page__subtitle">
            Gerencie seu patrimônio distribuído e faturas de crédito.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nova Conta
        </Button>
      </header>

      {/* Resumo Consolidado */}
      <section className="accounts-page__summary">
        <Card className="account-stat-card">
          <Card.Body>
            <span className="account-stat-card__title">Total em Contas</span>
            <p className="account-stat-card__value text-success">{formatCurrency(totalBalance)}</p>
          </Card.Body>
        </Card>
        <Card className="account-stat-card">
          <Card.Body>
            <span className="account-stat-card__title">Faturas em Aberto</span>
            <p className="account-stat-card__value text-danger">{formatCurrency(totalInvoices)}</p>
          </Card.Body>
        </Card>
        <Card className="account-stat-card">
          <Card.Body>
            <span className="account-stat-card__title">Saldo Líquido</span>
            <p className="account-stat-card__value">{formatCurrency(totalBalance - totalInvoices)}</p>
          </Card.Body>
        </Card>
      </section>

      {/* Grid de Contas Bancárias */}
      <section className="accounts-page__section">
        <h2 className="accounts-page__section-title">Minhas Contas</h2>
        <div className="accounts-grid">
          {accounts.map((acc) => (
            <Card key={acc.id} className="account-item-card">
              <Card.Header
                title={acc.name}
                subtitle={acc.type === 'checking' ? 'Conta Corrente' : acc.type === 'investment' ? 'Investimentos' : 'Poupança'}
                action={
                  <button 
                    className="action-btn-delete"
                    onClick={() => removeAccount(acc.id)}
                    title="Remover conta"
                  >
                    Excluir
                  </button>
                }
              />
              <Card.Body>
                <div className="account-item-card__balance-label">Saldo Disponível</div>
                <div className="account-item-card__balance-value">{formatCurrency(acc.balance)}</div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      {/* Grid de Cartões de Crédito */}
      <section className="accounts-page__section">
        <h2 className="accounts-page__section-title">Cartões de Crédito</h2>
        <div className="cards-grid">
          {cards.map((card) => {
            const usagePercent = Math.min(100, Math.round((card.currentInvoice / card.limit) * 100));
            return (
              <div key={card.id} className="credit-card-ui" style={{ borderColor: card.color }}>
                <div className="credit-card-ui__header">
                  <span className="credit-card-ui__name">{card.name}</span>
                  <span className="credit-card-ui__brand">VISA / MASTER</span>
                </div>
                <div className="credit-card-ui__invoice">
                  <span className="credit-card-ui__invoice-label">Fatura Atual</span>
                  <span className="credit-card-ui__invoice-value">{formatCurrency(card.currentInvoice)}</span>
                </div>
                <div className="credit-card-ui__progress-bar">
                  <div 
                    className="credit-card-ui__progress-fill" 
                    style={{ width: `${usagePercent}%`, backgroundColor: usagePercent > 80 ? 'var(--color-danger)' : 'var(--color-primary)' }}
                  />
                </div>
                <div className="credit-card-ui__footer">
                  <span>Limite: {formatCurrency(card.limit)}</span>
                  <span>Fecha dia {card.closingDay}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Cadastrar Nova Conta"
      >
        <AccountForm 
          onSubmit={handleCreateAccount}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
