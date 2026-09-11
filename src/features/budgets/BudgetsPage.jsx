import { useState } from 'react';
import { Card, Button } from '../../components/common';
import { Modal } from '../../components/feedback';
import { formatCurrency } from '../../utils/formatCurrency';
import { useBudgets } from './useBudgets';
import { BudgetForm } from './components/BudgetForm';
import './BudgetsPage.scss';

export const BudgetsPage = () => {
  const { budgets, goals, totalLimit, totalSpent, addBudget, removeBudget } = useBudgets();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBudget = (data) => {
    addBudget(data);
    setIsModalOpen(false);
  };

  const percentSpentTotal = totalLimit > 0 ? Math.round((totalSpent / totalLimit) * 100) : 0;

  return (
    <div className="budgets-page">
      <header className="budgets-page__header">
        <div>
          <h1 className="budgets-page__title">Orçamentos & Metas</h1>
          <p className="budgets-page__subtitle">
            Defina limites de gastos mensais e acompanhe suas metas financeiras.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          + Definir Orçamento
        </Button>
      </header>

      {/* Visão Macro do Teto de Gastos */}
      <Card className="budget-overview-card">
        <Card.Body>
          <div className="budget-overview-card__header">
            <div>
              <span className="budget-overview-card__label">Limite Global Mensal</span>
              <h2 className="budget-overview-card__value">
                {formatCurrency(totalSpent)} <span className="budget-overview-card__total">/ {formatCurrency(totalLimit)}</span>
              </h2>
            </div>
            <div className="budget-overview-card__badge">
              {percentSpentTotal}% Consumido
            </div>
          </div>
          <div className="budget-progress-bar">
            <div 
              className="budget-progress-bar__fill" 
              style={{
                width: `${Math.min(percentSpentTotal, 100)}%`,
                backgroundColor: percentSpentTotal > 100 ? 'var(--color-danger)' : percentSpentTotal > 85 ? 'var(--color-warning)' : 'var(--color-primary)'
              }}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Tetos por Categoria */}
      <section className="budgets-page__section">
        <h2 className="budgets-page__section-title">Limites por Categoria</h2>
        <div className="budgets-grid">
          {budgets.map((item) => {
            const percentage = item.limit > 0 ? Math.round((item.spent / item.limit) * 100) : 0;
            const isExceeded = percentage > 100;
            const isWarning = percentage >= 80 && !isExceeded;

            return (
              <Card key={item.id} className="budget-item-card">
                <Card.Body>
                  <div className="budget-item-card__header">
                    <div className="budget-item-card__info">
                      <span className="budget-item-card__icon">{item.icon}</span>
                      <span className="budget-item-card__title">{item.category}</span>
                    </div>
                    <button 
                      type="button" 
                      className="action-btn-delete"
                      onClick={() => removeBudget(item.id)}
                      title="Excluir orçamento"
                    >
                      Excluir
                    </button>
                  </div>

                  <div className="budget-item-card__values">
                    <span className="budget-item-card__spent">{formatCurrency(item.spent)}</span>
                    <span className="budget-item-card__limit">de {formatCurrency(item.limit)}</span>
                  </div>

                  <div className="budget-progress-bar">
                    <div 
                      className="budget-progress-bar__fill"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: isExceeded ? 'var(--color-danger)' : isWarning ? 'var(--color-warning)' : 'var(--color-success)'
                      }}
                    />
                  </div>

                  <div className="budget-item-card__footer">
                    <span className={`budget-item-card__status ${isExceeded ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'}`}>
                      {isExceeded ? `Excedido em ${formatCurrency(item.spent - item.limit)}` : `Disponível: ${formatCurrency(item.limit - item.spent)}`}
                    </span>
                    <span className="budget-item-card__percent">{percentage}%</span>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Metas e Sonhos */}
      <section className="budgets-page__section">
        <h2 className="budgets-page__section-title">Metas Financeiras</h2>
        <div className="goals-grid">
          {goals.map((goal) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));

            return (
              <Card key={goal.id} className="goal-item-card">
                <Card.Body>
                  <div className="goal-item-card__header">
                    <div className="goal-item-card__icon">{goal.icon}</div>
                    <div>
                      <h3 className="goal-item-card__title">{goal.title}</h3>
                      <span className="goal-item-card__deadline">Prazo: {goal.deadline}</span>
                    </div>
                  </div>

                  <div className="goal-item-card__progress-text">
                    <span>{formatCurrency(goal.current)}</span>
                    <span className="text-secondary">de {formatCurrency(goal.target)} ({progress}%)</span>
                  </div>

                  <div className="budget-progress-bar">
                    <div 
                      className="budget-progress-bar__fill"
                      style={{ width: `${progress}%`, backgroundColor: 'var(--color-primary)' }}
                    />
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Definir Novo Teto Orçamentário"
      >
        <BudgetForm 
          onSubmit={handleCreateBudget}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
