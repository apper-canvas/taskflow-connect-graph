import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Checkbox from '@/components/atoms/Checkbox';

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const formatDueDate = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'default';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work': return 'primary';
      case 'Personal': return 'success';
      case 'Study': return 'info';
      default: return 'default';
    }
  };

  const isOverdue = isPast(new Date(task.dueDate)) && task.status === 'Active';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, scale: 1.02 }}
      className={`
        bg-white rounded-lg border shadow-elevation-2 hover:shadow-elevation-3
        transition-all duration-200 ease-out p-4
        ${task.status === 'Completed' ? 'opacity-75' : ''}
        ${isOverdue ? 'border-red-300 bg-red-50/50' : 'border-surface-200'}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-1">
            <Checkbox
              checked={task.status === 'Completed'}
              onChange={() => onToggleComplete(task.Id)}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`
                font-semibold text-surface-900 truncate
                ${task.status === 'Completed' ? 'line-through opacity-60' : ''}
              `}>
                {task.title}
              </h3>
              {isOverdue && (
                <Badge variant="danger" size="sm">
                  <ApperIcon name="AlertCircle" className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
            
            {task.description && (
              <p className={`
                text-sm text-surface-600 mb-3 line-clamp-2
                ${task.status === 'Completed' ? 'line-through opacity-60' : ''}
              `}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={getCategoryColor(task.category)} size="sm">
                {task.category}
              </Badge>
              <Badge variant={getPriorityColor(task.priority)} size="sm">
                {task.priority}
              </Badge>
              <div className="flex items-center text-xs text-surface-500">
                <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
                {formatDueDate(new Date(task.dueDate))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(task)}
            className="p-2 text-surface-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <ApperIcon name="Edit2" className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(task.Id)}
            className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;