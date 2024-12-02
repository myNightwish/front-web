<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h2 class="text-2xl font-bold text-center mb-6">Your Invitations</h2>

    <div v-if="invitations.length === 0" class="text-center text-gray-500">
      You have no pending invitations.
    </div>
    <div v-for="invitation in invitations" :key="invitation.id" class="bg-white p-4 shadow-md rounded-lg mb-4">
      <p class="text-lg font-semibold">群组名: {{ invitation.family.name }}</p>
      <p class="text-sm text-gray-600">邀请人id: {{ invitation.invitedById }}</p>
      <!-- <p class="text-sm text-gray-500">当前状态: {{ invitation.status }}</p> -->

      <div v-if="invitation.status === 'pending'" class="mt-4 flex gap-4">
        <button 
          @click="handleInvitation('accept', invitation.id)" 
          :class="buttonClass('green')"
        >
          Accept
        </button>
        <button 
          @click="handleInvitation('reject', invitation.id)" 
          :class="buttonClass('red')"
        >
          Reject
        </button>
      </div>
      <div v-else class="mt-4 text-sm text-gray-500">
        Invitation is {{ invitation.status }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { invitationsApi } from '@/api/invitations';
const {getInvitations, changeInvitationsAction} = invitationsApi;

const invitations = ref([]); // 响应式数据

// 页面加载时获取邀请列表
const fetchInvitations = async () => {
  getInvitations().then(res => {
    invitations.value = res;
  }).catch(err => {
    console.error('Error fetching invitations', err);
  });
};

// 统一处理接受和拒绝邀请
const handleInvitation = async (action, invitationId) => {
  changeInvitationsAction({invitationId, action}).then(res => {
    const invitation = invitations.value.find(i => i.id === invitationId);
    if (invitation) {
      invitation.status = action === 'accept' ? 'accepted' : 'rejected';
    }
  }).catch(error => {
    console.error(`Error ${action} invitation`, error);
  });
};

// 在组件挂载后获取邀请列表
onMounted(fetchInvitations);

// 动态生成按钮样式
const buttonClass = (color) => {
  const baseClass = 'px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2';
  const hoverClass = color === 'green' ? 'hover:bg-green-600 focus:ring-green-400' : 'hover:bg-red-600 focus:ring-red-400';
  const colorClass = color === 'green' ? 'bg-green-500' : 'bg-red-500';
  return `${baseClass} ${colorClass} ${hoverClass}`;
};
</script>
