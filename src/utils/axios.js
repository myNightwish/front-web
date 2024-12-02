import axios from 'axios';

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
  error => {
    if (error.response && error.response.status === 401) {
      const { isTokenExpired } = error.response.data;

      if (isTokenExpired) {
        // 处理 token 过期，跳转到登录页面
        window.location.href = '/login'; // 根据你的路由配置修改
      } else {
        // 处理其他 401 错误
        console.error('Authentication error');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
