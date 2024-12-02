import { userApi } from '@/api/user';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const {getCurUserInfo} = userApi;

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null,
    token: null,
  }),

  actions: {
    getUserInfo() {
      getCurUserInfo().then((res) => {
        this.userData =res;
      }).catch(_ => {
        toast.error('Error userInfo！', 3000);
      });
    }
  }
});