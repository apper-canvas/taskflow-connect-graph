import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths } from 'date-fns';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import CalendarGrid from '@/components/molecules/CalendarGrid';
import TaskModal from '@/components/molecules/TaskModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService } from '@/services/api/taskService';

const CalendarView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleTaskClick = (task) => {
    setEditingTask(task);
    setSelectedDate(null);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ));
        toast.success('Task updated successfully!');
      } else {
        // If creating from date click, use selected date
        const newTaskData = selectedDate
          ? { ...taskData, dueDate: selectedDate.toISOString() }
          : taskData;
        
        const newTask = await taskService.create(newTaskData);
        setTasks(prev => [newTask, ...prev]);
        toast.success('Task created successfully!');
      }
      setEditingTask(null);
      setSelectedDate(null);
    } catch (err) {
      toast.error(editingTask ? 'Failed to update task.' : 'Failed to create task.');
      console.error('Error saving task:', err);
    }
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
    setSelectedDate(null);
  };

  if (loading) {
    return <Loading type="calendar" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">Calendar</h1>
          <p className="text-surface-600">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        
        <Button
          variant="primary"
          onClick={() => setShowTaskModal(true)}
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">New Task</span>
        </Button>
      </div>

      {/* Calendar Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between bg-white rounded-lg border border-surface-200 shadow-elevation-2 p-4"
      >
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousMonth}
          >
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
          >
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
          </Button>
          
          <h2 className="text-xl font-semibold text-surface-900 ml-2">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToday}
        >
          <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
          Today
        </Button>
      </motion.div>

      {/* Calendar */}
      {tasks.length === 0 ? (
        <Empty
          title="No tasks in calendar"
          description="Create your first task to see it appear in the calendar view!"
          actionLabel="Create Task"
          onAction={() => setShowTaskModal(true)}
          icon="Calendar"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CalendarGrid
            currentDate={currentDate}
            tasks={tasks}
            onDateClick={handleDateClick}
            onTaskClick={handleTaskClick}
          />
        </motion.div>
      )}

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={handleCloseModal}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default CalendarView;