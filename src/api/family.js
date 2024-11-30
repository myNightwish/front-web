import axios from 'axios';

export const createFamily = async (name) => {
  const response = await axios.post('/api/families/create', { 
    name
   });
   return response.data;
};

// 解散群组
export const deleteFamily = async (familyId) => {
    const response =  await axios.delete(`/api/families/${familyId}`);
    return response.data;
};

export const inviteFamily = async (familyId, email) => {
  const response = await axios.post(`/api/families/${familyId}/invite`, { email });
  return response.data;
};