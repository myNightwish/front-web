import axios from '@/utils/axios'; 

export const userApi = {
  async getCurUserInfo() {
    const response = await axios.get('/api/user/info');
    return response.data;
  },
  async userLogin({email, password}) {
    const response = await axios.post('/api/login', {
      email,
      password,
    });
    return response.data;
  },
  async userRegister({username, email, password}) {
      const response = await axios.post('/api/register', {
        username,
        email,
        password
      });
      return response.data;
  }
}