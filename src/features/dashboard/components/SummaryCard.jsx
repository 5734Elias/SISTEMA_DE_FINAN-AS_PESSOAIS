import { Card } from '../../../components/common';
import { formatCurrency } from '../../../utils/formatCurrency';
import clsx from 'clsx';
import './SummaryCard.scss';

export const SummaryCard = ({ title, value, variant = 'default', icon }) => {
  return (
    <Card className={clsx('summary-card', `summary-card--${variant}`)}>
      <Card.Body className="summary-card__body">
        <div className="summary-card__content">
          <h3 className="summary-card__title">{title}</h3>
          <p className="summary-card__value">{formatCurrency(value)}</p>
        </div>
        {icon && <div className="summary-card__icon">{icon}</div>}
      </Card.Body>
    </Card>
  );
};
