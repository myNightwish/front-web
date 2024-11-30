<template>
  <header class="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <router-link to="/" class="flex items-center space-x-2">
          <ShoppingBag class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span class="text-xl font-semibold">FamilyList</span>
        </router-link>
        <nav class="flex items-center space-x-6">
          <router-link 
            v-for="item in navItems" 
            :key="item.path" 
            :to="item.path"
            class="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {{ $t(item.name) }}  <!-- 动态翻译 -->
          </router-link>
          <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Sun v-if="isDark" class="h-5 w-5" />
            <Moon v-else class="h-5 w-5" />
          </button>
        </nav>
        <div>
          <button @click="changeLanguage('zh')">中文</button>
          <button @click="changeLanguage('en')">English</button>
        </div>
         <UserProfile @logout="quitLogin"></UserProfile>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { ShoppingBag, Sun, Moon } from 'lucide-vue-next';
import {i18n} from '@/i18n';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import UserProfile from '@/components/user/UserProfile.vue';

const auth = useAuthStore();
const router = useRouter()
// 定义一个函数来切换语言
const changeLanguage = (lang) => {
  i18n.global.locale.value = lang; // 动态修改全局语言
};

const navItems = [
  { name: 'nav.shoppingLists', path: '/lists' },
  { name: 'nav.familyGroups', path: '/groups' },
  { name: 'nav.invitations', path: '/invitations' }
];
const isDark = ref(false);
const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
};
const quitLogin = () => {
  auth.logout();
  router.push('/login');
};
</script>