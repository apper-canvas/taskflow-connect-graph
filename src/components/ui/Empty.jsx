import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ 
  title = 'No items found', 
  description = 'Get started by creating your first item.',
  actionLabel = 'Get Started',
  onAction,
  icon = 'Inbox',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 px-4 ${className}`}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <ApperIcon name={icon} className="w-10 h-10 text-primary-600" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-surface-900 mb-2">
            {title}
          </h3>
          <p className="text-surface-600 mb-8 leading-relaxed">
            {description}
          </p>
          
          {onAction && (
            <Button
              onClick={onAction}
              variant="primary"
              size="lg"
              className="inline-flex items-center"
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              {actionLabel}
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;