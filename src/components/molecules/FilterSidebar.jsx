import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const categories = ['Work', 'Personal', 'Study'];
  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['Active', 'Completed'];

  const handleCategoryChange = (category, checked) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handlePriorityChange = (priority, checked) => {
    const newPriorities = checked
      ? [...filters.priorities, priority]
      : filters.priorities.filter(p => p !== priority);
    
    onFiltersChange({ ...filters, priorities: newPriorities });
  };

  const handleStatusChange = (status) => {
    onFiltersChange({ ...filters, status });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priorities: [],
      status: 'All'
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.priorities.length > 0 || 
                          filters.status !== 'All';

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        className={`
          fixed top-0 left-0 h-full w-80 bg-white border-r border-surface-200 z-50
          shadow-elevation-4 overflow-y-auto
          lg:relative lg:translate-x-0 lg:shadow-none lg:z-auto
        `}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
                <ApperIcon name="Filter" className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-surface-900">Filters</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  Clear All
                </Button>
              )}
              <button
                className="lg:hidden p-2 text-surface-400 hover:text-surface-600 rounded-lg hover:bg-surface-100"
                onClick={onClose}
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-surface-700 mb-3">Status</h3>
            <div className="space-y-2">
              {['All', ...statuses].map((status) => (
                <label key={status} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={filters.status === status}
                    onChange={() => handleStatusChange(status)}
                    className="sr-only"
                  />
                  <div className={`
                    w-4 h-4 rounded-full border-2 mr-3 transition-all duration-200
                    ${filters.status === status
                      ? 'bg-primary-500 border-primary-500'
                      : 'border-surface-300 group-hover:border-primary-400'
                    }
                  `}>
                    {filters.status === status && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="text-sm text-surface-700 group-hover:text-surface-900">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-surface-700 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Checkbox
                  key={category}
                  checked={filters.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  label={category}
                  className="text-sm"
                />
              ))}
            </div>
          </div>

          {/* Priority Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-surface-700 mb-3">Priority</h3>
            <div className="space-y-2">
              {priorities.map((priority) => (
                <Checkbox
                  key={priority}
                  checked={filters.priorities.includes(priority)}
                  onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                  label={priority}
                  className="text-sm"
                />
              ))}
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary-50 rounded-lg border border-primary-200"
            >
              <h4 className="text-sm font-medium text-primary-800 mb-2">Active Filters</h4>
              <div className="space-y-1 text-xs text-primary-700">
                {filters.status !== 'All' && (
                  <div>Status: {filters.status}</div>
                )}
                {filters.categories.length > 0 && (
                  <div>Categories: {filters.categories.join(', ')}</div>
                )}
                {filters.priorities.length > 0 && (
                  <div>Priority: {filters.priorities.join(', ')}</div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default FilterSidebar;