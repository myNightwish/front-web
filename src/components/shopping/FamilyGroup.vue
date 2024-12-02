<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold">群名：{{ family.familyName }}</h3>
        <div class="flex justify-center gap-10 items-center">
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
          <button
            v-if="isSelectionMode && selectedItems.length > 0"
            @click="$emit('confirm-batch', family.familyId)"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            确认批量操作
          </button>
          <button
            @click="$emit('add-item', family.familyId);"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            添加物品
          </button>
        </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      <ShoppingItem
        v-for="item in family.items"
        :key="item.id"
        :item="item"
        :show-checkbox="isSelectionMode"
        :is-selected="selectedItems.includes(item.id)"
        @toggle-select="(itemId) => $emit('toggle-select', { familyId: family.familyId, itemId })"
      />
    </div>
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

const emit = defineEmits(['select-all', 'confirm-batch', 'toggle-select', 'add-item']);
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