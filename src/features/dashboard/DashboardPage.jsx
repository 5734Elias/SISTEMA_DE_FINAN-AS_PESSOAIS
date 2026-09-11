import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SummaryCard } from './components/SummaryCard';
import { Card, Button } from '../../components/common';
import { Modal } from '../../components/feedback';
import { useTransactions } from '../transactions/useTransactions';
import { useAccounts } from '../accounts/useAccounts';
import { TransactionForm } from '../transactions/components/TransactionForm';
import { formatCurrency } from '../../utils/formatCurrency';
import { ROUTES } from '../../routes/routePaths';
import './DashboardPage.scss';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { transactions, addTransaction } = useTransactions();
  const { accounts, cards, totalBalance, totalInvoices } = useAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cálculos dinâmicos em tempo real a partir das transações
  const totalIncomes = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  // Saldo geral considerando saldo das contas + fluxo de caixa
  const netBalance = totalBalance - totalInvoices;

  // Cálculo dinâmico das despesas por categoria
  const expensesByCategory = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

  const categoryEntries = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]);
  const recentTransactions = transactions.slice(0, 5);

  const handleCreateTransaction = (data) => {
    addTransaction(data);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Visão Geral</h1>
          <p className="dashboard__subtitle">
            Acompanhe o fluxo de caixa, contas e despesas em tempo real.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>+ Nova Transação</Button>
      </header>

      {/* Cards de Resumo Conectados aos Dados Reais */}
      <section className="dashboard__summary">
        <SummaryCard 
          title="Saldo Líquido Total" 
          value={netBalance} 
          variant="primary"
          icon="💰"
        />
        <SummaryCard 
          title="Total de Receitas" 
          value={totalIncomes} 
          variant="success"
          icon="📈"
        />
        <SummaryCard 
          title="Total de Despesas" 
          value={totalExpenses} 
          variant="danger"
          icon="📉"
        />
      </section>

      <div className="dashboard__grid">
        {/* Histórico Recente Conectado */}
        <Card className="dashboard__transactions">
          <Card.Header 
            title="Transações Recentes" 
            action={
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(ROUTES.TRANSACTIONS)}
              >
                Ver todas
              </Button>
            } 
          />
          <Card.Body>
            {recentTransactions.length > 0 ? (
              <ul className="dashboard__list">
                {recentTransactions.map((tx) => (
                  <li key={tx.id} className="dashboard__list-item">
                    <div className="dashboard__list-info">
                      <span className="dashboard__list-desc">{tx.description}</span>
                      <span className="dashboard__list-date">{tx.date} • {tx.category}</span>
                    </div>
                    <span className={`dashboard__list-amount ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">
                <span className="empty-state__icon">📂</span>
                <p>Nenhuma transação registrada ainda.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Gráfico / Distribuição de Despesas por Categoria Real */}
        <Card className="dashboard__category-distribution">
          <Card.Header title="Despesas por Categoria" />
          <Card.Body>
            {categoryEntries.length > 0 && totalExpenses > 0 ? (
              <div className="category-bars">
                {categoryEntries.map(([category, amount]) => {
                  const percent = Math.round((amount / totalExpenses) * 100);
                  return (
                    <div key={category} className="category-bars__item">
                      <div className="category-bars__label-group">
                        <span className="category-bars__name">{category}</span>
                        <span className="category-bars__value">
                          {formatCurrency(amount)} ({percent}%)
                        </span>
                      </div>
                      <div className="category-bars__track">
                        <div 
                          className="category-bars__fill" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state__icon">📊</span>
                <p>Nenhuma despesa para exibir no gráfico.</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação Rápida"
      >
        <TransactionForm
          onSubmit={handleCreateTransaction}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
