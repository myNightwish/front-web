<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">登录</h2>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
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
            登录
          </button>
        </form>
        
        <p class="mt-4 text-center text-sm text-gray-600">
          还没有账号？
          <router-link to="/register" class="text-blue-500 hover:text-blue-600">
            立即注册
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userApi } from '@/api/user';

const router = useRouter();
const {userLogin} = userApi;
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  userLogin({
    email: email.value,
    password: password.value
  }).then(res => {
    authStore.setAuth(res);
    router.push('/lists');
  }).catch(error=> {
    console.error('登录失败', error);
  })
}
</script>