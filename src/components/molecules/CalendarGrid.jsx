import { motion } from 'framer-motion';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isSameDay
} from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const CalendarGrid = ({ currentDate, tasks, onDateClick, onTaskClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getTasksForDate = (date) => {
    return tasks.filter(task => 
      isSameDay(new Date(task.dueDate), date)
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-amber-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-surface-400';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-surface-200 shadow-elevation-2 overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 bg-surface-50 border-b border-surface-200">
        {weekdays.map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-surface-700 border-r border-surface-200 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className={`
                min-h-[120px] p-2 border-r border-b border-surface-200 
                cursor-pointer hover:bg-surface-50 transition-colors
                ${!isCurrentMonth ? 'bg-surface-25 text-surface-400' : 'bg-white'}
                ${isDayToday ? 'bg-primary-50' : ''}
                last:border-r-0
              `}
              onClick={() => onDateClick(day)}
            >
              {/* Date Number */}
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  text-sm font-medium
                  ${isDayToday 
                    ? 'bg-primary-500 text-white w-6 h-6 rounded-full flex items-center justify-center' 
                    : isCurrentMonth ? 'text-surface-900' : 'text-surface-400'
                  }
                `}>
                  {format(day, 'd')}
                </span>
                {dayTasks.length > 0 && (
                  <Badge variant="primary" size="sm">
                    {dayTasks.length}
                  </Badge>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <motion.div
                    key={task.Id}
                    whileHover={{ scale: 1.02 }}
                    className={`
                      text-xs p-1.5 rounded cursor-pointer
                      ${getPriorityColor(task.priority)} text-white
                      truncate font-medium
                      ${task.status === 'Completed' ? 'opacity-60 line-through' : ''}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTaskClick(task);
                    }}
                    title={task.title}
                  >
                    {task.title}
                  </motion.div>
                ))}
                
                {dayTasks.length > 3 && (
                  <div className="text-xs text-surface-500 text-center py-1">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;