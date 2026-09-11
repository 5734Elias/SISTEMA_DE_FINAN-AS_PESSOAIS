import { useState, useEffect } from 'react';

const INITIAL_ACCOUNTS = [
  { id: '1', name: 'Nubank', type: 'checking', balance: 8450.50, color: '#820ad1' },
  { id: '2', name: 'Itaú Personalité', type: 'checking', balance: 5200.00, color: '#ec7000' },
  { id: '3', name: 'Inter Investimentos', type: 'investment', balance: 12800.00, color: '#ff7a00' },
];

const INITIAL_CARDS = [
  { id: 'c1', name: 'Nubank Ultravioleta', limit: 15000, currentInvoice: 2450.80, closingDay: 28, dueDay: 5, color: '#820ad1' },
  { id: 'c2', name: 'XP Visa Infinite', limit: 25000, currentInvoice: 4120.00, closingDay: 20, dueDay: 27, color: '#111827' },
];

const STORAGE_ACCOUNTS_KEY = '@finances:accounts';
const STORAGE_CARDS_KEY = '@finances:cards';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CARDS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_CARDS;
    } catch {
      return INITIAL_CARDS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(accounts));
    } catch {}
  }, [accounts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CARDS_KEY, JSON.stringify(cards));
    } catch {}
  }, [cards]);

  const addAccount = (newAcc) => {
    setAccounts((prev) => [...prev, { ...newAcc, id: Date.now().toString() }]);
  };

  const removeAccount = (id) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== id));
  };

  const addCard = (newCard) => {
    setCards((prev) => [...prev, { ...newCard, id: Date.now().toString() }]);
  };

  const removeCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);
  const totalInvoices = cards.reduce((acc, curr) => acc + curr.currentInvoice, 0);

  return {
    accounts,
    cards,
    totalBalance,
    totalInvoices,
    addAccount,
    removeAccount,
    addCard,
    removeCard,
  };
};
