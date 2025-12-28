import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/me');
      console.log('Checking Auth Response: ', res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log('Error checking auth!', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post('/auth/register', data);
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
      set({ authUser: res.data.user });
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
      set({ authUser: null });
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
