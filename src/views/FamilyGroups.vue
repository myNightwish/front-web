<template>
  <div class="space-y-6">
      <button 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
        @click="openCreateModal">
        Create New Group
      </button>

    <!-- 群组列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="family in families" 
        :key="family.id" 
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 class="text-lg font-medium mb-4">{{ family.name }}</h3>
        <div class="space-y-4">
          <div 
            v-for="member in family.members" 
            :key="member.id" 
            class="flex items-center space-x-3">
            <div 
              class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              {{ member.name[0] }}
            </div>
            <div>
              <p class="font-medium">{{ member.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ member.role }}</p>
            </div>
          </div>
        </div>
        <button 
          class="mt-4 text-red-500 hover:text-red-700" 
          @click="deleteFamily(family.id)">
          解散群组
        </button>
      </div>
    </div>

    <!-- 创建群组模态框 -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 space-y-4">
        <h3 class="text-lg font-medium">Create New Group</h3>
        <input 
          v-model="newFamilyName" 
          type="text" 
          placeholder="Group Name" 
          class="w-full px-4 py-2 border rounded">
        <input 
          v-model="inviteEmail" 
          type="email" 
          placeholder="Invite Member Email" 
          class="w-full px-4 py-2 border rounded">
        <div class="flex justify-end space-x-4">
          <button 
            class="bg-gray-300 px-4 py-2 rounded" 
            @click="closeCreateModal">
            Cancel
          </button>
          <button 
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
            @click="createFamily">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const families = ref([]); // 存储群组数据
const showCreateModal = ref(false); // 控制模态框显示
const newFamilyName = ref(''); // 新群组名称
const inviteEmail = ref(''); // 邀请的邮箱

// 获取群组列表
const fetchFamilies = async () => {
  try {
    const response = await axios.get('/api/families');
    families.value = response.data;
  } catch (error) {
    console.error('Error fetching families:', error);
  }
};

// 打开创建模态框
const openCreateModal = () => {
  showCreateModal.value = true;
};

// 关闭创建模态框
const closeCreateModal = () => {
  showCreateModal.value = false;
  newFamilyName.value = '';
  inviteEmail.value = '';
};

// 创建群组并邀请成员
const createFamily = async () => {
  try {
    const response = await axios.post('/api/families/create', { 
      name: newFamilyName.value,
     });
    const familyId = response.data.id;

    if (inviteEmail.value) {
      await axios.post(`/api/families/${familyId}/invite`, { email: inviteEmail.value });
    }

    fetchFamilies(); // 更新群组列表
    closeCreateModal(); // 关闭模态框
  } catch (error) {
    console.error('Error creating family:', error);
  }
};

// 解散群组
const deleteFamily = async (familyId) => {
  try {
    await axios.delete(`/api/families/${familyId}`);
    fetchFamilies(); // 更新群组列表
  } catch (error) {
    console.error('Error deleting family:', error);
  }
};

// 初始加载
onMounted(() => {
  fetchFamilies();
});
</script>
