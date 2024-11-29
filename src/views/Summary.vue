<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">{{ $t('nav.summary') }}</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="family in families" :key="family._id" 
           class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium mb-4">{{ family.name }}</h3>
        
        <div class="space-y-4">
          <div v-for="item in family.shoppingList" :key="item._id"
               class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ $t('shopping.quantity') }}: {{ item.quantity }}
              </p>
            </div>
            <button @click="markAsPurchased(family._id, item._id)"
                    class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {{ $t('shopping.markPurchased') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useShoppingStore } from '@/stores/shopping';
import { useFamilyStore } from '@/stores/family';

const shoppingStore = useShoppingStore();
const familyStore = useFamilyStore();
const families = ref([]);

onMounted(async () => {
  await familyStore.getFamilies();
  families.value = await Promise.all(
    familyStore.families.map(async (family) => {
      const list = await shoppingStore.getListByFamilyId(family._id);
      return {
        ...family,
        shoppingList: list.items.filter(item => !item.purchased)
      };
    })
  );
});

const markAsPurchased = async (familyId, itemId) => {
  await shoppingStore.markAsPurchased(familyId, itemId);
  // Update the local list
  const familyIndex = families.value.findIndex(f => f._id === familyId);
  if (familyIndex !== -1) {
    families.value[familyIndex].shoppingList = 
      families.value[familyIndex].shoppingList.filter(item => item._id !== itemId);
  }
};
</script>