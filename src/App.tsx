import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/home'));
const DetailPage = lazy(() => import('./pages/Detail/detail'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const NavigationHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenLanding = localStorage.getItem('hasSeenLanding');
    if (location.pathname === '/' && hasSeenLanding === 'true') {
      navigate('/home');
    }
  }, [location, navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <NavigationHandler />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
