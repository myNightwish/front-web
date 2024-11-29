import { ref } from 'vue';

export function useToast() {
  const message = ref('');
  const type = ref('');
  const show = ref(false);

  const toast = {
    success(msg) {
      message.value = msg;
      type.value = 'success';
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 3000);
    },
    error(msg) {
      message.value = msg;
      type.value = 'error';
      show.value = true;
      setTimeout(() => {
        show.value = false;
      }, 3000);
    }
  };

  return {
    message,
    type,
    show,
    toast
  };
}