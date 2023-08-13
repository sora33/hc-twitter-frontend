import { apiClient } from "lib/axios/apiClient";

export const getFavorites = async () => {
  try {
    const res = await apiClient.get(`favorites`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postFavorite = async (tweetId: number) => {
  try {
    const res = await apiClient.post(`tweets/${tweetId}/favorites`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteFavorite = async (tweetId: number) => {
  try {
    const res = await apiClient.delete(`tweets/${tweetId}/favorites`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
