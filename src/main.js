import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { i18n } from './i18n';
import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/auth';

import './style.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

// Initialize auth state
const authStore = useAuthStore();
await authStore.init();
app.mount('#app');