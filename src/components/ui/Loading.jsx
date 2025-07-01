import { motion } from 'framer-motion';

const Loading = ({ type = 'list' }) => {
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-surface-200 shadow-elevation-2 p-4"
          >
            <div className="flex items-start gap-4">
              <div className="shimmer w-5 h-5 bg-surface-200 rounded mt-1" />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="shimmer h-5 bg-surface-200 rounded flex-1" />
                  <div className="shimmer w-16 h-4 bg-surface-200 rounded" />
                </div>
                <div className="shimmer h-4 bg-surface-200 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="shimmer w-16 h-6 bg-surface-200 rounded-full" />
                  <div className="shimmer w-16 h-6 bg-surface-200 rounded-full" />
                  <div className="shimmer w-20 h-6 bg-surface-200 rounded-full" />
                </div>
              </div>
              <div className="flex gap-1">
                <div className="shimmer w-8 h-8 bg-surface-200 rounded-lg" />
                <div className="shimmer w-8 h-8 bg-surface-200 rounded-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'calendar') {
    return (
      <div className="bg-white rounded-lg border border-surface-200 shadow-elevation-2 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-surface-50 border-b border-surface-200">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="p-3 text-center border-r border-surface-200 last:border-r-0">
              <div className="shimmer h-4 bg-surface-200 rounded mx-auto w-8" />
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {[...Array(42)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.01 }}
              className="min-h-[120px] p-2 border-r border-b border-surface-200 last:border-r-0"
            >
              <div className="shimmer h-4 w-6 bg-surface-200 rounded mb-2" />
              <div className="space-y-1">
                {Math.random() > 0.5 && (
                  <>
                    <div className="shimmer h-6 bg-surface-200 rounded" />
                    {Math.random() > 0.7 && (
                      <div className="shimmer h-6 bg-surface-200 rounded" />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;