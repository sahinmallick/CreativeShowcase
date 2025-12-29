import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingAuth: false,
  isAuthenticated: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${token}`;

      const res = await axiosInstance.get('/auth/me');

      set({
        authUser: res.data.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log('Error checking auth!', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (formData) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post('/auth/register', formData);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log('Error registering user!', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      set({ authUser: null });
    } finally {
      set({ isSigninUp: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      localStorage.setItem('accessToken', res.data.accessToken);
      set({ authUser: res.data.data.user, isAuthenticated: true });
      toast.success(res.data.message);
    } catch (error) {
      console.log('Error Logging user!', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      set({ authUser: null });
    } finally {
      set({ isLogginIn: false });
    }
  },

  logout: async () => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.get('/auth/logout');
      localStorage.removeItem('accessToken');
      delete axiosInstance.defaults.headers.common['Authorization'];

      set({
        authUser: null,
        isAuthenticated: false,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log('Error while log out user!', error);
      set({
        authUser: null,
      });
    } finally {
      set({
        authUser: null,
        isLogginIn: false,
      });
    }
  },

  changePassword: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post('/auth/change-password', data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log('Error changing password user!', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      set({ authUser: null });
    } finally {
      set({ isLogginIn: false });
    }
  },
}));
