import { defineStore } from 'pinia';
import { userApi } from '@/api/user';
const {getCurUserInfo} = userApi;

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
  }),
  actions: {
    getUserInfo() {
      getCurUserInfo().then((res) => {
        this.userData = res;
      }).catch(_ => {});
    }
  }
});