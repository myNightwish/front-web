<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center space-x-4">
      <div class="bg-indigo-100 rounded-full p-3">
        <svg class="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ username }}</h1>
        <p class="text-gray-600">{{ email }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    default: '',
    required: true
  }
});
</script>