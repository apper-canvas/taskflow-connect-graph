import { forwardRef } from 'react';

const Input = forwardRef(({ 
  type = 'text', 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}, ref) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-surface-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={inputId}
        className={`
          block w-full px-4 py-2.5 text-surface-900 bg-white border rounded-lg
          transition-all duration-200 ease-out
          placeholder:text-surface-400
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed
          ${error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-surface-300 hover:border-surface-400'
          }
          shadow-elevation-1 hover:shadow-elevation-2 focus:shadow-elevation-2
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;