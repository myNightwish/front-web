import { defineStore } from 'pinia';
import axios from 'axios';
import { io } from 'socket.io-client';

export const useShoppingStore = defineStore('shopping', {
  state: () => ({
    items: [],
    socket: null,
    connected: false
  }),

  actions: {
    async init(familyId) {
      this.socket = io('http://localhost:7001', {
        query: { familyId }
      });

      this.socket.on('connect', () => {
        this.connected = true;
      });

      this.socket.on('listUpdated', ({ type, item, itemId }) => {
        if (type === 'itemAdded') {
          this.items.push(item);
        } else if (type === 'itemPurchased') {
          const index = this.items.findIndex(i => i._id === itemId);
          if (index !== -1) {
            this.items[index].purchased = true;
          }
        }
      });
    },

    async addItem(item) {
      try {
        const response = await axios.post('http://localhost:7001/api/shopping-list', {
          familyId: 'current-family-id', // Replace with actual family ID
          item
        });
        return response.data;
      } catch (error) {
        console.error('Failed to add item:', error);
        throw error;
      }
    },

    async markAsPurchased(itemId) {
      try {
        const response = await axios.post('http://localhost:7001/api/shopping-list/purchase', {
          familyId: 'current-family-id', // Replace with actual family ID
          itemId
        });
        return response.data;
      } catch (error) {
        console.error('Failed to mark item as purchased:', error);
        throw error;
      }
    }
  }
});