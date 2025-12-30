import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const LogoutButton = ({ children }) => {
  const { logout } = useAuthStore();

  const onLogout = async () => {
    await logout();
  };

  return (
    <button
      onClick={onLogout}
      className="w-full flex p-2 rounded-lg
             bg-black text-white text-sm font-medium
             transition-all duration-200
             hover:bg-white hover:text-gray-900
             border border-gray-200
             active:scale-[0.98] cursor-pointer"
    >
      {children}
    </button>
  );
};

export default LogoutButton;
