import clsx from 'clsx';
import './Button.scss';

/**
 * Componente de Botão
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Ocupa 100% da largura
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        { 'btn--full': fullWidth },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
