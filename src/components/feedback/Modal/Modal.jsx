import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Button } from '../../common';
import './Modal.scss';

/**
 * Componente Modal acessível via React Portal
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={clsx('modal', className)} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <button 
            type="button" 
            className="modal__close-btn" 
            onClick={onClose}
            aria-label="Fechar janela"
          >
            &times;
          </button>
        </div>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
