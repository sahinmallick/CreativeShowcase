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
  const { authUser, checkAuth } = useAuthStore();

  const { username } = useParams();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUp /> : <Navigate to="/" replace />}
          />
          <Route path="/profile/:username" element={<PublicProfile />} />
          <Route
            path="/profile"
            element={authUser ? <PrivateDashboard /> : <Navigate to="/" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
