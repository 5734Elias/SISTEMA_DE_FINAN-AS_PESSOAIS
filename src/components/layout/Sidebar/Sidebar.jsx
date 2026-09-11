import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { ROUTES } from '../../../routes/routePaths';
import './Sidebar.scss';

export const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: 'Dashboard', path: ROUTES.DASHBOARD },
    { label: 'Transações', path: ROUTES.TRANSACTIONS },
    { label: 'Contas & Cartões', path: ROUTES.ACCOUNTS },
    { label: 'Orçamentos', path: ROUTES.BUDGETS },
    { label: 'Investimentos', path: ROUTES.INVESTMENTS },
  ];

  return (
    <>
      <div 
        className={clsx('sidebar__overlay', { 'sidebar__overlay--open': isOpen })}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={clsx('sidebar', { 'sidebar--open': isOpen })}>
        <div className="sidebar__header">
          <h2 className="sidebar__brand">Mestre Finanças</h2>
          <button className="sidebar__close-btn" onClick={onClose} aria-label="Fechar menu">
            &times;
          </button>
        </div>

        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {menuItems.map((item) => (
              <li key={item.path} className="sidebar__item">
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    clsx('sidebar__link', { 'sidebar__link--active': isActive })
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
