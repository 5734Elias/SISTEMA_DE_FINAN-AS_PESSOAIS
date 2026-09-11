import { useTheme } from '../../../context/ThemeContext';
import { useAuth } from '../../../context/AuthContext';
import './Header.scss';

export const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'US';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="header">
      <button 
        className="header__menu-btn" 
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        &#9776;
      </button>
      
      <div className="header__content">
        {/* Botão de Alternância de Tema */}
        <button
          type="button"
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
          title={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
        >
          {theme === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
        </button>

        {/* Informações do Usuário e Botão de Logout */}
        <div className="header__user">
          <div className="header__avatar">
            {getInitials(currentUser?.name)}
          </div>
          <div className="header__user-info">
            <span className="header__user-name">{currentUser?.name || 'Usuário'}</span>
            <span className="header__user-email">{currentUser?.email}</span>
          </div>
          <button 
            type="button" 
            className="header__logout-btn" 
            onClick={logout}
            title="Sair da conta"
            aria-label="Sair da conta"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};
