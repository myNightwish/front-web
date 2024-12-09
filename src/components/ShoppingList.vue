<template>
    <div v-if="groupedItems.length === 0" class="text-center text-gray-500">
      You have no shoppingLists.
    </div>
    <div v-for="family in groupedItems" :key="family.familyId" class="space-y-4">
      <FamilyGroup
        :family="family"
        :selected-items="selectedItems[family.familyId] || []"
        @select-all="handleSelectAll"
        @confirm-batch="handleBatchPurchase"
        @toggle-select="handleToggleSelect"
        @add-item="handleAddBtn"
      />
    </div>
    <AddItemModal
      v-if="showAddItemModal"
      @close="showAddItemModal = false"
      @add-item="handleAddItem"
      :families="groupedItems"
      :curFamilyId = "addBtnId"
    />

    <ConfirmationModal
      v-if="showConfirmModal"
      :message="confirmationMessage"
      @confirm="handleConfirmPurchase"
      @cancel="showConfirmModal = false"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from '@/composables/useToast';
import { useShoppingItems } from '@/composables/useShoppingItems';
import FamilyGroup from './shopping/FamilyGroup.vue';
import AddItemModal from './shopping/AddItemModal.vue';
import ConfirmationModal from './shopping/ConfirmationModal.vue';

const { success, error } = useToast();
const showAddItemModal = ref(false);
const showConfirmModal = ref(false);
const confirmationMessage = ref('');
const pendingAction = ref(null);
const addBtnId = ref(0);

const { toast } = useToast();
const {
  groupedItems,
  selectedItems,
  fetchItems,
  markItemsAsPurchased,
  addNewItem
} = useShoppingItems();

const handleSelectAll = (familyId) => {
  const family = groupedItems.value.find(f => f.familyId === familyId);
  if (!selectedItems.value[familyId]) {
    selectedItems.value[familyId] = [];
  }
  selectedItems.value[familyId] = family.items
    .filter(item => !item.purchased)
    .map(item => item.id);
};
const handleAddBtn = (id) => {
  showAddItemModal.value = true;
  addBtnId.value = id;
}

const handleToggleSelect = ({ familyId, itemId }) => {
  if (!selectedItems.value[familyId]) {
    selectedItems.value[familyId] = [];
  }
  const index = selectedItems.value[familyId].indexOf(itemId);
  if (index === -1) {
    selectedItems.value[familyId].push(itemId);
  } else {
    selectedItems.value[familyId].splice(index, 1);
  }
};

const handleBatchPurchase = (familyId) => {
  const itemCount = selectedItems.value[familyId]?.length || 0;
  confirmationMessage.value = `是否确认将选中的 ${itemCount} 个物品标记为已购买？`;
  pendingAction.value = { type: 'batch', familyId };
  showConfirmModal.value = true;
};

const handleConfirmPurchase = async () => {
  try {
    if (pendingAction.value.type === 'batch') {
      const { familyId } = pendingAction.value;
      await markItemsAsPurchased(familyId, selectedItems.value[familyId]);
      selectedItems.value[familyId] = [];
      success('物品已成功更新');
    }
  } catch (err) {
    error('更新失败，请重试');
  } finally {
    showConfirmModal.value = false;
    pendingAction.value = null;
  }
};

const handleAddItem = async (newItem) => {
  try {
    await addNewItem(newItem);
    showAddItemModal.value = false;
    success('物品添加成功');
    await fetchItems();
  } catch (_) {
    error('添加失败，请重试');
  }
};

onMounted(fetchItems);
</script>