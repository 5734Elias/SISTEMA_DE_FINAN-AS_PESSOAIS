import { useState, useEffect } from 'react';

const INITIAL_TRANSACTIONS = [
  { id: '1', description: 'Salário Mensal', amount: 4200.0, type: 'income', category: 'Trabalho', date: '2026-09-05' },
  { id: '2', description: 'Supermercado Central', amount: 450.0, type: 'expense', category: 'Alimentação', date: '2026-09-08' },
  { id: '3', description: 'Plano de Internet Fibra', amount: 120.0, type: 'expense', category: 'Serviços', date: '2026-09-02' },
  { id: '4', description: 'Freelance UI Design', amount: 850.0, type: 'income', category: 'Serviços', date: '2026-09-09' },
  { id: '5', description: 'Combustível Posto Ipiranga', amount: 210.0, type: 'expense', category: 'Transporte', date: '2026-09-10' },
];

const STORAGE_KEY = '@finances:transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // Ignora erro de cota ou indisponibilidade de storage
    }
  }, [transactions]);

  const addTransaction = (newTx) => {
    const txWithId = {
      ...newTx,
      id: Date.now().toString(),
    };
    setTransactions((prev) => [txWithId, ...prev]);
  };

  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return {
    transactions,
    addTransaction,
    removeTransaction,
  };
};
