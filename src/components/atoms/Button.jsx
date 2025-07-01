import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white border-transparent hover:from-primary-700 hover:to-primary-800 focus:ring-primary-500 shadow-elevation-2 hover:shadow-elevation-3',
    secondary: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white border-transparent hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500 shadow-elevation-2 hover:shadow-elevation-3',
    outline: 'bg-white text-primary-700 border-primary-300 hover:bg-primary-50 focus:ring-primary-500 shadow-elevation-1 hover:shadow-elevation-2',
    ghost: 'bg-transparent text-surface-700 border-transparent hover:bg-surface-100 focus:ring-surface-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white border-transparent hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-elevation-2 hover:shadow-elevation-3'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;