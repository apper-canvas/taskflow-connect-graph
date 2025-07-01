import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import ListView from '@/components/pages/ListView';
import CalendarView from '@/components/pages/CalendarView';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route path="tasks" element={<ListView />} />
            <Route path="calendar" element={<CalendarView />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="!top-6 !right-6"
          toastClassName="!mb-2 !rounded-lg !shadow-elevation-3"
          bodyClassName="!p-0"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;