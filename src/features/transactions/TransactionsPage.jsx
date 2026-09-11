import { useState } from 'react';
import { Card, Button } from '../../components/common';
import { Modal } from '../../components/feedback';
import { formatCurrency } from '../../utils/formatCurrency';
import { useTransactions } from './useTransactions';
import { TransactionForm } from './components/TransactionForm';
import './TransactionsPage.scss';

export const TransactionsPage = () => {
  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const filteredTransactions = transactions.filter((tx) => {
    if (filterType === 'income') return tx.type === 'income';
    if (filterType === 'expense') return tx.type === 'expense';
    return true;
  });

  const handleCreate = (data) => {
    addTransaction(data);
    setIsModalOpen(false);
  };

  return (
    <div className="transactions-page">
      <header className="transactions-page__header">
        <div>
          <h1 className="transactions-page__title">Transações</h1>
          <p className="transactions-page__subtitle">
            Gerencie todas as entradas e saídas financeiras.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          + Nova Transação
        </Button>
      </header>

      <Card className="transactions-page__card">
        <Card.Header
          title="Histórico de Lançamentos"
          action={
            <div className="transactions-page__filters">
              <button
                className={`filter-btn ${filterType === 'all' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                Todas
              </button>
              <button
                className={`filter-btn ${filterType === 'income' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilterType('income')}
              >
                Entradas
              </button>
              <button
                className={`filter-btn ${filterType === 'expense' ? 'filter-btn--active' : ''}`}
                onClick={() => setFilterType('expense')}
              >
                Saídas
              </button>
            </div>
          }
        />
        <Card.Body className="transactions-page__body">
          {filteredTransactions.length === 0 ? (
            <div className="transactions-page__empty">
              <span className="transactions-page__empty-icon">📂</span>
              <h3>Nenhuma transação encontrada</h3>
              <p>Comece adicionando uma nova despesa ou receita.</p>
            </div>
          ) : (
            <div className="transactions-page__table-wrapper">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Data</th>
                    <th className="text-right">Valor</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="transactions-table__desc">{tx.description}</td>
                      <td>
                        <span className="category-tag">{tx.category}</span>
                      </td>
                      <td className="transactions-table__date">{tx.date}</td>
                      <td className={`text-right font-medium ${tx.type === 'income' ? 'amount-income' : 'amount-expense'}`}>
                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="action-btn-delete"
                          onClick={() => removeTransaction(tx.id)}
                          title="Remover transação"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adicionar Transação"
      >
        <TransactionForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

