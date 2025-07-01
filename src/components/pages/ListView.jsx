import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import TaskCard from '@/components/molecules/TaskCard';
import QuickAddBar from '@/components/molecules/QuickAddBar';
import FilterSidebar from '@/components/molecules/FilterSidebar';
import TaskModal from '@/components/molecules/TaskModal';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import { taskService } from '@/services/api/taskService';

const ListView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortBy, setSortBy] = useState('dueDate');
  const [filters, setFilters] = useState({
    categories: [],
    priorities: [],
    status: 'All'
  });

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'createdAt', label: 'Created Date' },
    { value: 'title', label: 'Title' }
  ];

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

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply status filter
    if (filters.status !== 'All') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(task => filters.categories.includes(task.category));
    }

    // Apply priority filter
    if (filters.priorities.length > 0) {
      filtered = filtered.filter(task => filters.priorities.includes(task.priority));
    }

    // Apply sorting
    filtered.sort((a, b) => {
switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority': {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        case 'createdAt':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, filters, sortBy]);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task created successfully!');
    } catch (err) {
      toast.error('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
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
        const newTask = await taskService.create(taskData);
        setTasks(prev => [newTask, ...prev]);
        toast.success('Task created successfully!');
      }
      setEditingTask(null);
    } catch (err) {
      toast.error(editingTask ? 'Failed to update task.' : 'Failed to create task.');
      console.error('Error saving task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success('Task deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const task = tasks.find(t => t.Id === taskId);
      if (!task) return;

      const updatedTask = await taskService.update(taskId, {
        ...task,
        status: task.status === 'Completed' ? 'Active' : 'Completed'
      });

      setTasks(prev => prev.map(t => 
        t.Id === taskId ? updatedTask : t
      ));

      toast.success(
        updatedTask.status === 'Completed' 
          ? 'Task marked as completed!' 
          : 'Task marked as active!'
      );
    } catch (err) {
      toast.error('Failed to update task status.');
      console.error('Error updating task:', err);
    }
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(null);
  };

  if (loading) {
    return <Loading type="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />;
  }

  return (
    <div className="flex gap-6 min-h-[calc(100vh-8rem)]">
      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-surface-900 mb-2">Tasks</h1>
            <p className="text-surface-600">
              {filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={sortOptions}
              className="w-40"
            />
            
            <Button
              variant="primary"
              onClick={() => setShowTaskModal(true)}
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">New Task</span>
            </Button>
          </div>
        </div>

        {/* Quick Add Bar */}
        <QuickAddBar onAddTask={handleAddTask} className="mb-6" />

        {/* Task List */}
        {filteredAndSortedTasks.length === 0 ? (
          <Empty
            title="No tasks found"
            description={
              tasks.length === 0
                ? "Create your first task to get started with TaskFlow Pro!"
                : "No tasks match your current filters. Try adjusting your search criteria."
            }
            actionLabel="Create Task"
            onAction={() => setShowTaskModal(true)}
            icon="CheckSquare"
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedTasks.map((task) => (
                <TaskCard
                  key={task.Id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

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

export default ListView;