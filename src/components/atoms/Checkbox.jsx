import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label, 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const checkboxId = props.id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={`
            w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200
            flex items-center justify-center
            ${checked 
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500' 
              : 'bg-white border-surface-300 hover:border-primary-400'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            shadow-elevation-1 hover:shadow-elevation-2
          `}
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
        >
          <motion.div
            initial={false}
            animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ApperIcon name="Check" className="w-3 h-3 text-white" />
          </motion.div>
        </motion.div>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={`ml-3 text-sm text-surface-700 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;