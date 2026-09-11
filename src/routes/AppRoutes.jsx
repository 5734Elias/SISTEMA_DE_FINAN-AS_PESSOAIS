import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ROUTES } from './routePaths';

// Pages
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Accounts from '../pages/Accounts';

// Placeholder pages
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
