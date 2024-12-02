import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router/index';
import { useToast } from '@/composables/useToast';

const toast = useToast();
// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5173', // 你的 API 基础 URL
  timeout: 10000, // 请求超时的时间
});

// 设置请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 可以在这里添加 token 或其他请求头
    const token = localStorage.getItem('token'); // 假设 token 存储在 localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();
      await authStore.logout();
      toast.warn('登录已过期，请重新登录');
      // 只有当不在登录页面时才重定向
      if (router.currentRoute.value.path !== '/login') {
        router.push('/login');
      }
    }
    // 如果是 400 错误，弹出统一的提示
    if (error.response && error.response.status === 400) {
      const msg = error.response.data?.message || '请求错误，请稍后再试';  // 根据接口返回的错误信息调整
      toast.warn(msg);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
