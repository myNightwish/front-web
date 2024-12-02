<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start">
      <div class="">
        <h3 class="text-xl font-semibold text-gray-900">群组名：{{ family.name }}</h3>
        <div class="mt-2 space-y-1 gap-8 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">角色:</span>
            <RoleBadge :role="family.role" />
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-600">状态:</span>
            <StatusBadge :status="family.status" />
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2 flex-col">
        <button 
        class="text-indigo-600 hover:text-indigo-800"
        @click="$emit('view-details', family.id)"
      >
        查看详情
      </button>
        <button 
          class="mt-4 text-red-500 hover:text-red-700" 
          @click="$emit('delete-family', family.id)">
          解散群组
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import RoleBadge from './RoleBadge.vue';
import StatusBadge from './StatusBadge.vue';

defineProps({
  family: {
    type: Object,
    required: true
  }
});

defineEmits(['view-details', 'delete-family']);

</script>