import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ROUTES } from './routePaths';

// Pages
import Dashboard from '../pages/Dashboard';

// Placeholder pages (serão substituídas nas próximas fases)
const Transactions = () => <div><h2>Transações</h2><p>Em construção...</p></div>;
const Accounts = () => <div><h2>Contas</h2><p>Em construção...</p></div>;
const Budgets = () => <div><h2>Orçamentos</h2><p>Em construção...</p></div>;
const NotFound = () => <div><h2>Página não encontrada</h2></div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.ACCOUNTS} element={<Accounts />} />
        <Route path={ROUTES.BUDGETS} element={<Budgets />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
