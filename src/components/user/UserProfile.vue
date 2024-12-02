<template>
  <nav class="bg-white">
    <div class="flex items-center">
      <UserProfileDropdown 
        :username="userData.username"
        :email="userData.email"
        @logout="handleLogout"
      />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import UserProfileDropdown from './UserProfileDropdown.vue';
import { useUserStore } from '@/stores/user'
const userStore = useUserStore();

const emit = defineEmits(['logout']);
// 监听 store 数据变化，如果 userData 变化了，更新本地状态
const userData = ref(userStore.userData);

watch(
  () => userStore.userData,  // 监听 store 中的 userData 变化
  (newUserData) => {
    userData.value = newUserData;  // 更新本地变量
  }
);
// 在组件挂载时调用异步接口
onMounted(async () => {
  try {
    // 获取用户信息
    const res = await userStore.getUserInfo(); // 确保 getUserInfo 是异步返回数据
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    userData.value = { username: 'Error', email: 'Error' }; // 错误时更新为错误信息
  }
});

const handleLogout = () => {
  emit('logout');
};
</script>