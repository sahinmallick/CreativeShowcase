import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isAuthenticated: false,
  isSigninUp: false,
  isLogginIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        set({ authUser: null, isAuthenticated: false });
        return;
      }

      const res = await axiosInstance.get("/auth/me");

      set({
        authUser: res.data.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem("accessToken");
      set({
        authUser: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      localStorage.setItem("accessToken", res.data.accessToken);

      set({
        authUser: res.data.data.user,
        isAuthenticated: true,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      set({ authUser: null, isAuthenticated: false });
    } finally {
      set({ isLogginIn: false });
    }
  },

  signup: async (formData) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      set({
        authUser: null,
        isAuthenticated: false,
      });
    }
  },

  changePassword: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post("/auth/change-password", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      set({ isLogginIn: false });
    }
  },
}));
