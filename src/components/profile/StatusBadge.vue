<template>
  <span 
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="statusClasses"
  >
    {{ statusText }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    required: true
  }
});

const statusClasses = computed(() => ({
  'bg-yellow-100 text-yellow-800': props.status === 'pending',
  'bg-green-100 text-green-800': props.status === 'active',
  'bg-gray-100 text-gray-800': props.status === 'inactive'
}));

const statusText = computed(() => ({
  'pending': '待成组',
  'active': '已确认',
  'inactive': '待确认'
}[props.status]));
</script>