import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';

export const useImageStore = create((set) => ({
  images: [],
  userImages: [],
  isLoading: false,
  isFetched: false,

  fetchImages: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get('/get-images');

      set({
        images: res.data.data,
        isFetched: true,
      });
    } catch (err) {
      console.error('Failed to load images', err);
    } finally {
      set({ isLoading: false });
    }
  },

  userImagesFetch: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get('/user-images');
      set({
        userImages: res.data.data,
        isFetched: true,
      });
    } catch (error) {
      console.error('Failed to load user images', err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
