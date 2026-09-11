import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { ROUTES } from './routePaths';
import { useAuth } from '../context/AuthContext';

// Pages
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Accounts from '../pages/Accounts';
import Budgets from '../pages/Budgets';
import Investments from '../pages/Investments';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Proteção de rotas autenticadas
const ProtectedLayout = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <AppLayout />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Rotas Privadas / Internas */}
      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS} element={<Transactions />} />
        <Route path={ROUTES.ACCOUNTS} element={<Accounts />} />
        <Route path={ROUTES.BUDGETS} element={<Budgets />} />
        <Route path={ROUTES.INVESTMENTS} element={<Investments />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};
