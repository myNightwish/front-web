<template>
  <div class="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-medium mb-4">添加新物品</h3>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">物品名称</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">数量</label>
          <input
            v-model.number="form.quantity"
            type="number"
            min="1"
            class="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">描述</label>
          <textarea
            v-model="form.description"
            class="w-full px-3 py-2 border rounded-lg"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">图片链接</label>
          <input
            v-model="form.image"
            type="url"
            class="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            添加
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  families: {
    type: Array,
    required: true
  },
  curFamilyId: {
    type: Number,  // 如果确实是数字类型，可以去掉注释
    required: true
  },
});
const form = ref({
  name: '',
  familyId: 0,
  quantity: 1,
  description: '',
  image: ''
});
// 观察 curFamilyId 的变化，更新 form.familyId
watch(() => props.curFamilyId, (newFamilyId) => {
  form.value.familyId = newFamilyId;
}, { immediate: true }); // immediate: true 表示初始化时也会触发一次更新

const emit = defineEmits(['close', 'add-item']);

const handleSubmit = () => {
  emit('add-item', { ...form.value });
};
</script>