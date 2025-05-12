import React, {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home/home'));
const About = lazy(() => import('./pages/About/about'));
const Login = lazy(() => import('./pages/Login/login'));
const ResetPassword = lazy(() => import('./pages/Login/reset-password'));
const Register = lazy(() => import('./pages/Login/register'));
const Favorites = lazy(() => import('./pages/Favorites/favorites'));
const FavoriteList = lazy(() => import('./pages/Favorites/favorite-list'));

const App: React.FC = () => {
  return (
    <Router>  
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favorite-list" element={<FavoriteList />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
