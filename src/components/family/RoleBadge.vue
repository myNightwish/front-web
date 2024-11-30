<template>
  <span 
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="roleClasses"
  >
    {{ roleText }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  role: {
    type: String,
    required: true
  }
});

const roleClasses = computed(() => ({
  'bg-purple-100 text-purple-800': props.role === 'admin',
  'bg-blue-100 text-blue-800': props.role === 'member'
}));

const roleText = computed(() => ({
  'admin': '管理员',
  'member': '成员'
}[props.role]));
</script>