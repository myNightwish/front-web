import axios from '@/utils/axios'; 

export const invitationsApi = {
  async getInvitations() {
    const response = await axios.get('/api/invitations');
    return response.data;
  },
  async changeInvitationsAction({invitationId, action}) {
    await axios.post(`/api/invitations/${invitationId}/${action}`);
  }
};