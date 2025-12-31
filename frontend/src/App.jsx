import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Layout from './layout/Layout';
import { useAuthStore } from './store/useAuthStore';
import SignUp from './pages/SignUp';
import HomePage from './pages/HomePage';
import PublicProfile from './pages/PublicProfile';
import PrivateDashboard from './pages/PrivateDashboard';
import { useEffect } from 'react';
import NotFound from './pages/NotFound';

const App = () => {
  const { authUser, isAuthenticated, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/signup"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
          />

          <Route path="/profile/:username" element={<PublicProfile />} />

          <Route
            path="/profile"
            element={isAuthenticated ? <PrivateDashboard /> : <Navigate to="/" />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};


export default App;
