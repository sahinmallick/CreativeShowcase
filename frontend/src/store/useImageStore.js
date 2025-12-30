import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useImageStore = create((set) => ({
  images: [],
  userImages: [],
  isLoading: false,
  isFetched: false,
  isDeleting: false,

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

  uploadImage: async (data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post('/upload-image', data);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Failed to upload image!', error);
      toast.error('Failed to upload image');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteImage: async (id) => {
    try {
      set({ isDeleting: true });
      const res = await axiosInstance.delete(`/delete-image/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      console.error('Failed to delete images', error);
    } finally {
      set({ isDeleting: false });
    }
  },
}));
