import { defineStore } from 'pinia';
import axios from 'axios';

export const useFamilyStore = defineStore('family', {
  state: () => ({
    families: [],
    currentFamily: null,
    invitations: []
  }),

  actions: {
    async createFamily(name) {
      try {
        const response = await axios.post('http://localhost:7001/api/families', { name });
        this.families.push(response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to create family:', error);
        throw error;
      }
    },

    async inviteMember(familyId, email) {
      try {
        const response = await axios.post(`http://localhost:7001/api/families/${familyId}/invite`, { email });
        return response.data;
      } catch (error) {
        console.error('Failed to invite member:', error);
        throw error;
      }
    },

    async acceptInvitation(invitationId) {
      try {
        const response = await axios.post(`http://localhost:7001/api/invitations/${invitationId}/accept`);
        this.families.push(response.data.family);
        this.invitations = this.invitations.filter(inv => inv.id !== invitationId);
        return response.data;
      } catch (error) {
        console.error('Failed to accept invitation:', error);
        throw error;
      }
    }
  }
});