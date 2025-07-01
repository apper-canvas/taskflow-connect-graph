import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import { format } from 'date-fns';

const QuickAddBar = ({ onAddTask, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('Medium');

  const categoryOptions = [
    { value: 'Work', label: 'Work' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Study', label: 'Study' }
  ];

  const priorityOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title: title.trim(),
      description: '',
      dueDate: new Date(dueDate).toISOString(),
      category,
      priority,
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onAddTask(newTask);
    setTitle('');
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      layout
      className={`bg-white rounded-lg border border-surface-200 shadow-elevation-2 ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center gap-3 text-left text-surface-600 hover:text-surface-900 transition-colors group"
            >
              <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg group-hover:from-primary-600 group-hover:to-primary-700 transition-all">
                <ApperIcon name="Plus" className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Add a new task...</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="p-4 space-y-4"
          >
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium"
              autoFocus
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                type="date"
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions}
              />
              
              <Select
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                options={priorityOptions}
              />
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!title.trim()}
              >
                <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuickAddBar;