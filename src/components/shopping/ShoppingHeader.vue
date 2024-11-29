<template>
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-semibold">购物清单</h2>
    <button
      @click="$emit('add-item')"
      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
    >
      添加物品
    </button>
  </div>
</template>

<script setup>
defineEmits(['add-item']);
</script>