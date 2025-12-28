import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LogInPage from './pages/Login';

const App = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <Toaster />
      <Routes>
        <Route path="/" element={<LogInPage />} />
      </Routes>
    </div>
  );
};

export default App;
