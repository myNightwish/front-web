<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">注册</h2>
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              v-model="username"
              type="text"
              required
              class="input"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              v-model="email"
              type="email"
              required
              class="input"
              placeholder="请输入邮箱"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              v-model="password"
              type="password"
              required
              class="input"
              placeholder="请输入密码"
            />
          </div>
          
          <button type="submit" class="btn btn-primary w-full">
            注册
          </button>
        </form>
        
        <p class="mt-4 text-center text-sm text-gray-600">
          已有账号？
          <router-link to="/login" class="text-blue-500 hover:text-blue-600">
            立即登录
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import axios from 'axios';
const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  try {
    const response = await axios.post('/api/register', {
      username: username.value,
      email: email.value,
      password: password.value,
    });
    authStore.setAuth(response.data);
    // 处理注册成功后的逻辑，比如跳转到登录页面
    console.log('注册成功', response.data);
  } catch (error) {
    console.error('注册失败', error);
  }
}
</script>