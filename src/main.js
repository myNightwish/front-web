import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { i18n } from './i18n';
import App from './App.vue';
import { useAuthStore } from '@/stores/auth';
import ShoppingList from '@/components/ShoppingList.vue';
import FamilyGroups from '@/components/FamilyGroups.vue';
import Summary from '@/views/Summary.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import InvitationList from '@/views/InvitationList.vue';
import './style.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/lists' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { 
      path: '/lists',
      component: ShoppingList,
      meta: { requiresAuth: true }
    },
    { 
      path: '/groups',
      component: FamilyGroups,
      meta: { requiresAuth: true }
    },
    { 
      path: '/summary',
      component: Summary,
      meta: { requiresAuth: true }
    },
    { 
      path: '/invitations',
      component: InvitationList,
      meta: { requiresAuth: true }
    }
  ],
});

// Navigation guard
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);

// Initialize auth state
const authStore = useAuthStore();
await authStore.init();
app.mount('#app');