import { apiClient } from "lib/axios/apiClient";
import { Tweet } from "features/tweet/tweetTypes";

export const getBookmarks = async () => {
  try {
    const res = await apiClient.get<Tweet[]>(`bookmarks`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postBookmark = async (tweetId: number) => {
  try {
    const res = await apiClient.post(`tweets/${tweetId}/bookmarks`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteBookmark = async (tweetId: number) => {
  try {
    const res = await apiClient.delete(`tweets/${tweetId}/bookmarks`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
