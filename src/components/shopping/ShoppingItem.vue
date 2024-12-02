<template>
  <div
    :class="[
      'bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4',
      { 'opacity-50': item.purchased }
    ]"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-start gap-2">
        <input
          v-if="!item.purchased && showCheckbox"
          type="checkbox"
          :checked="isSelected"
          @change="$emit('toggle-select', item.id)"
          class="mt-1"
        />
        <div>
          <h3 class="font-medium">{{ item.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            数量: {{ item.quantity }}
          </p>
        </div>
      </div>
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="w-16 h-16 object-cover rounded"
      />
    </div>
    <p class="text-sm">描述: {{ item.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle-select']);
</script>