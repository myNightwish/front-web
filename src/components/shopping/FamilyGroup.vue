<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-xl font-semibold">{{ family.familyName }}</h3>
      <button
        @click="toggleSelectionMode"
        :class="[
          'px-4 py-2 rounded-lg',
          hasUnpurchasedItems
            ? isSelectionMode
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
        ]"
        :disabled="!hasUnpurchasedItems"
      >
        {{ isSelectionMode ? '标记为已购' : '批量勾选' }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ShoppingItem
        v-for="item in family.items"
        :key="item.id"
        :item="item"
        :show-checkbox="isSelectionMode"
        :is-selected="selectedItems.includes(item.id)"
        @toggle-select="(itemId) => $emit('toggle-select', { familyId: family.familyId, itemId })"
      />
    </div>

    <button
      v-if="isSelectionMode && selectedItems.length > 0"
      @click="$emit('confirm-batch', family.familyId)"
      class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      确认批量操作
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ShoppingItem from './ShoppingItem.vue';

const props = defineProps({
  family: {
    type: Object,
    required: true
  },
  selectedItems: {
    type: Array,
    default: () => []
  }
});

const isSelectionMode = ref(false);

const emit = defineEmits(['select-all', 'confirm-batch', 'toggle-select']);

const hasUnpurchasedItems = computed(() => 
  props.family.items.some(item => !item.purchased)
);

const toggleSelectionMode = () => {
  if (isSelectionMode.value) {
    // If already in selection mode, trigger select-all
    isSelectionMode.value = false;
    emit('select-all', props.family.familyId);
  } else {
    // Enter selection mode
    isSelectionMode.value = true;
  }
};
</script>