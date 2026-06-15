import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader/Loader';

function App() {
  return (
    <div className="app-shell">
      <Suspense fallback={<Loader />}> 
        <AppRoutes />
      </Suspense>
      <ToastContainer position="top-right" theme="colored" autoClose={2200} />
    </div>
  );
}

export default App;
