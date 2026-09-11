import clsx from 'clsx';
import './Card.scss';

export const Card = ({ children, className, ...props }) => {
  return (
    <div className={clsx('card', className)} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, className, action, ...props }) => {
  return (
    <div className={clsx('card__header', className)} {...props}>
      <div className="card__header-content">
        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </div>
      {action && <div className="card__header-action">{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className, ...props }) => {
  return (
    <div className={clsx('card__body', className)} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div className={clsx('card__footer', className)} {...props}>
      {children}
    </div>
  );
};

// Vinculando subcomponentes para facilitar import (ex: <Card.Body>)
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
