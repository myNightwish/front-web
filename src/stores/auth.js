import { defineStore } from 'pinia';
import axios from '@/utils/axios'; 
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setAuth(data) {
      this.token = data.token;
      this.user = jwtDecode(data.token);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },

    async init() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          this.token = token;
          this.user = jwtDecode(token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
          this.logout();
        }
      }
    }
  }
});