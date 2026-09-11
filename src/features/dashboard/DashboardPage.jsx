import { SummaryCard } from './components/SummaryCard';
import { Card, Button } from '../../components/common';
import './DashboardPage.scss';

export const DashboardPage = () => {
  // Dados mockados temporariamente
  const summaryData = {
    balance: 14500.50,
    incomes: 4200.00,
    expenses: 1850.75,
  };

  const recentTransactions = [
    { id: 1, desc: 'Supermercado', amount: -450.00, date: '11/09/2026' },
    { id: 2, desc: 'Salário', amount: 4200.00, date: '05/09/2026' },
    { id: 3, desc: 'Internet', amount: -120.00, date: '02/09/2026' },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Visão Geral</h1>
          <p className="dashboard__subtitle">Acompanhe suas finanças deste mês.</p>
        </div>
        <Button>Nova Transação</Button>
      </header>

      <section className="dashboard__summary">
        <SummaryCard 
          title="Saldo Atual" 
          value={summaryData.balance} 
          variant="primary"
          icon="💰"
        />
        <SummaryCard 
          title="Receitas" 
          value={summaryData.incomes} 
          variant="success"
          icon="📈"
        />
        <SummaryCard 
          title="Despesas" 
          value={summaryData.expenses} 
          variant="danger"
          icon="📉"
        />
      </section>

      <div className="dashboard__grid">
        <Card className="dashboard__transactions">
          <Card.Header title="Transações Recentes" action={<Button variant="ghost" size="sm">Ver todas</Button>} />
          <Card.Body>
            {recentTransactions.length > 0 ? (
              <ul className="dashboard__list">
                {recentTransactions.map(tx => (
                  <li key={tx.id} className="dashboard__list-item">
                    <div className="dashboard__list-info">
                      <span className="dashboard__list-desc">{tx.desc}</span>
                      <span className="dashboard__list-date">{tx.date}</span>
                    </div>
                    <span className={`dashboard__list-amount ${tx.amount > 0 ? 'text-success' : ''}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-state">Nenhuma transação recente.</div>
            )}
          </Card.Body>
        </Card>

        <Card className="dashboard__chart-placeholder">
          <Card.Header title="Despesas por Categoria" />
          <Card.Body className="dashboard__chart-body">
            <div className="empty-state">
              <span className="empty-state__icon">📊</span>
              <p>Gráfico em desenvolvimento</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

