import axios from '@/utils/axios';

export const shoppingApi = {
  async getAllLists() {
    const response = await axios.get('/api/lists/all');
    return response.data;
  },

  async addItem(item) {
    const response = await axios.post('/api/lists/create', { item });
    return response.data;
  },

  async markItemsAsPurchased(familyId, itemIds) {
    const response = await axios.post('/api/lists/markpurchased', { familyId, itemIds });
    return response.data;
  }
};