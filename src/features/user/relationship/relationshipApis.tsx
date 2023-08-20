import { apiClient } from "lib/axios/apiClient";

export const postFollow = async (userId: number) => {
  try {
    const res = await apiClient.post(`users/${userId}/follow`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteFollow = async (userId: number) => {
  try {
    const res = await apiClient.delete(`users/${userId}/unfollow`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
