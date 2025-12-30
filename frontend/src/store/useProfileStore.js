import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useProfileStore = create((set) => ({
  profileImages: [],
  userProfile: null,
  isLoading: false,
  isFetched: false,
  isNotFound: false,

  fetchUserProfile: async (username) => {
    if (!username) return;

    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/profile/${username}`);

      set({
        userProfile: res.data.data.user,
        profileImages: res.data.data.images,
        isFetched: true,
        isNotFound: false,
      });
    } catch (err) {
      console.error('Failed to public profile', err);
      if (err.response?.status === 404) {
        set({ isNotFound: true });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
