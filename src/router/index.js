import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import ShoppingList from '@/components/ShoppingList.vue';
import FamilyGroups from '@/components/FamilyGroups.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import InvitationList from '@/components/InvitationList.vue';

const routes = [
  { path: '/', redirect: '/lists' },
  { 
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  },
  { 
    path: '/register',
    component: Register,
    meta: { requiresGuest: true }
  },
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
    path: '/invitations',
    component: InvitationList,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }
  
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/lists');
    return;
  }
  
  next();
});

export default router;