<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-3 focus:outline-none"
      ref="triggerRef"
    >
      <div class="relative">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="User avatar"
          class="h-8 w-8 rounded-full object-cover"
        />
        <div v-else class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <span class="text-indigo-600 font-medium text-sm">
            {{ username.charAt(0).toUpperCase() }}
          </span>
        </div>
        <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
      </div>
      <span class="hidden md:block text-sm font-medium text-gray-700">{{ username }}</span>
      <svg
        class="h-5 w-5 text-gray-400"
        :class="{ 'transform rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1"
        role="menu"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900">{{ username }}</p>
          <p class="text-sm text-gray-500 truncate">{{ email }}</p>
        </div>

        <div class="py-1">
          <a
            href="#settings"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            设置
          </a>
        </div>

        <div class="border-t border-gray-100">
          <button
            @click="$emit('logout')"
            class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            role="menuitem"
          >
          {{ $t('auth.logout') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  username: {
    type: String,
    default: '',
    required: true
  },
  email: {
    type: String,
    default: '',
    required: true
  },
  avatarUrl: {
    type: String,
    default: ''
  }
});

defineEmits(['logout']);

const isOpen = ref(false);
const triggerRef = ref(null);

const handleClickOutside = (event) => {
  if (triggerRef.value && !triggerRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>