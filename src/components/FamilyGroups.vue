<template>
  <div class="space-y-6">
    <div class="mt-8">
      <div class="flex items-center justify-end">
        <button 
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
          @click="openCreateModal">
          + Create New Group
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FamilyCard 
          v-for="family in userData.families" 
          :key="family.id" 
          :family="family"
          @delete-family="deleteFamilyClk"
          @view-details="viewDetails"
        />
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
            @click="handleCreateFamily">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {createFamily, deleteFamily, inviteFamily, getFamilies} from '@/api/family.js';
import FamilyCard from './family/FamilyCard.vue';
import { userApi } from '@/api/user';
import { useToast } from '@/composables/useToast';

const { success, error } = useToast();
const {getCurUserInfo} = userApi;
const userData = ref({});
const families = ref([]); // 存储群组数据
const showCreateModal = ref(false); // 控制模态框显示
const newFamilyName = ref(''); // 新群组名称
const inviteEmail = ref(''); // 邀请的邮箱

// 获取群组列表
const fetchFamilies = async () => {
  getFamilies().then((response) => {
    families.value = response;
  }).catch(_ => {
    error('Error fetching families！', 3000);
  });
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
const handleCreateFamily = async () => {
  createFamily(newFamilyName.value).then((response) => {
    const familyId = response.id;
    if (familyId && inviteEmail.value) {
      inviteFamily(familyId, inviteEmail.value).then(() => {
        fetchFamilies(); // 更新群组列表
        closeCreateModal(); // 关闭模态框
        success('创建成功，等待被邀请人同意！');
      });
    }
  }).catch((err) => {
    error('Error creating family！', 3000);
  });
};

// 解散群组
const deleteFamilyClk = async (familyId) => {
  deleteFamily(familyId).then(() => {
    success('解散群组成功！');
    fetchFamilies(); // 更新群组列表
  }).catch((error) => {
    error('Error deleting family！', 3000);
  });
};

const viewDetails = () => {
  console.log('view details');
};

// 初始加载
onMounted(() => {
  fetchFamilies();
  //  todo: 接口服务要改
  getCurUserInfo().then((res) => {
    userData.value = res;
  }).catch(_ => {
    error('Error userInfo！', 3000);
  });
});
</script>
