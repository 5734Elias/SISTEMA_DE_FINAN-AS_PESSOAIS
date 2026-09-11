import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import './Input.scss';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  id,
  className,
  fullWidth = true,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={clsx('input-group', { 'input-group--full': fullWidth }, className)}>
      {label && (
        <label htmlFor={inputId} className="input-group__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={clsx('input-group__field', { 'input-group__field--error': error })}
        {...props}
      />
      {(error || helperText) && (
        <span className={clsx('input-group__helper', { 'input-group__helper--error': error })}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

