import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-all duration-200';
  
  const variants = {
    default: 'bg-surface-100 text-surface-800 border-surface-200',
    primary: 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border-primary-200',
    secondary: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border-accent-200',
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200',
    warning: 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border-accent-200',
    danger: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200',
    info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export default Badge;