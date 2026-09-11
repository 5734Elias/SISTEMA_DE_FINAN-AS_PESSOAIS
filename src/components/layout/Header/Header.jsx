import './Header.scss';

export const Header = ({ onMenuClick }) => {
  return (
    <header className="header">
      <button 
        className="header__menu-btn" 
        onClick={onMenuClick}
        aria-label="Abrir menu"
      >
        &#9776; {/* Menu icon */}
      </button>
      
      <div className="header__content">
        <div className="header__user">
          <div className="header__avatar">ER</div>
          <span className="header__user-name">Elias Ribeiro</span>
        </div>
      </div>
    </header>
  );
};

