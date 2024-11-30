import axios from 'axios';

export const userApi = {
  async getCurUserInfo() {
    const response = await axios.get('/api/user/info');
    return response.data;
  }
}