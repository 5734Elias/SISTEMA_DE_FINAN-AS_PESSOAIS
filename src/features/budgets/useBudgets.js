import { useState, useEffect } from 'react';

const INITIAL_BUDGETS = [
  { id: '1', category: 'Alimentação', limit: 1200.00, spent: 780.50, icon: '🍔' },
  { id: '2', category: 'Transporte', limit: 600.00, spent: 450.00, icon: '🚗' },
  { id: '3', category: 'Lazer', limit: 500.00, spent: 520.00, icon: '🎬' },
  { id: '4', category: 'Serviços', limit: 400.00, spent: 220.00, icon: '💡' },
];

const INITIAL_GOALS = [
  { id: 'g1', title: 'Reserva de Emergência', target: 20000.00, current: 14500.00, deadline: '2026-12-31', icon: '🛡️' },
  { id: 'g2', title: 'Viagem de Férias', target: 8000.00, current: 3200.00, deadline: '2027-02-15', icon: '✈️' },
];

const STORAGE_BUDGETS_KEY = '@finances:budgets';
const STORAGE_GOALS_KEY = '@finances:goals';

export const useBudgets = () => {
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BUDGETS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
    } catch {
      return INITIAL_BUDGETS;
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GOALS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BUDGETS_KEY, JSON.stringify(budgets));
    } catch {}
  }, [budgets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_GOALS_KEY, JSON.stringify(goals));
    } catch {}
  }, [goals]);

  const addBudget = (item) => {
    setBudgets((prev) => [...prev, { ...item, id: Date.now().toString(), spent: 0 }]);
  };

  const removeBudget = (id) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  const addGoal = (item) => {
    setGoals((prev) => [...prev, { ...item, id: Date.now().toString() }]);
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const totalLimit = budgets.reduce((acc, curr) => acc + curr.limit, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);

  return {
    budgets,
    goals,
    totalLimit,
    totalSpent,
    addBudget,
    removeBudget,
    addGoal,
    removeGoal,
  };
};
