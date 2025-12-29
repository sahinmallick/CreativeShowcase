import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === 'development'
      ? `${import.meta.env.BACKEND_URL_LOCAL}/api/v1`
      : `${import.meta.env.BACKEND_URL_PROD}/api/v1`,
  withCredentials: true,
});
