import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Header = ({ onToggleFilters, showFilterToggle = false }) => {
  const navItems = [
    { to: '/tasks', label: 'Tasks', icon: 'List' },
    { to: '/calendar', label: 'Calendar', icon: 'Calendar' }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-surface-200 shadow-elevation-1 sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg">
              <ApperIcon name="CheckSquare" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                TaskFlow Pro
              </h1>
              <p className="text-xs text-surface-600 -mt-1">Smart Task Management</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 ease-out
                  ${isActive
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-elevation-2'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }
                `}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Filter Toggle (Mobile) */}
          {showFilterToggle && (
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleFilters}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;