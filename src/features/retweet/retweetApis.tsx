import { apiClient } from "lib/axios/apiClient";

export const postRetweet = async (tweetId: number) => {
  try {
    const res = await apiClient.post(`tweets/${tweetId}/retweets`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const deleteRetweet = async (tweetId: number) => {
  try {
    const res = await apiClient.delete(`tweets/${tweetId}/retweets`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
