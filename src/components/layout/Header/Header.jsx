import { useTheme } from '../../../context/ThemeContext';
import './Header.scss';

export const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

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
            // Ícone da Lua (Dark mode)
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
            // Ícone do Sol (Light mode)
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

        <div className="header__user">
          <div className="header__avatar">ER</div>
          <span className="header__user-name">Elias Ribeiro</span>
        </div>
      </div>
    </header>
  );
};
