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
import { ref } from 'vue';
import UserProfileDropdown from './UserProfileDropdown.vue';
import { userApi } from '@/api/user';
// import { useUserStore } from '@/stores/user'
// import { userApi } from '@/api/user';

// const userStore = useUserStore();

const userData = ref({});
const {getCurUserInfo} = userApi;

const emit = defineEmits(['logout']);

getCurUserInfo().then((res) => {
  userData.value = res;
}).catch((err) => {
  console.log(err);
});

const handleLogout = () => {
  emit('logout');
};
</script>