import { Tweet } from "features/tweet/tweetTypes";
import { apiClient } from "lib/axios/apiClient";

export type TweetParams = Pick<Tweet, "content" | "image">;

export const getTweets = async (page: number, perPage?: number) => {
  perPage = perPage || 10;
  try {
    const res = await apiClient.get<Tweet[]>(
      `tweets?limit=${perPage}&offset=${page * perPage}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTweet = async (id: number) => {
  try {
    const res = await apiClient.get<Tweet>(`tweets/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postTweet = async (params: TweetParams) => {
  const { content, image } = params;
  try {
    const res = await apiClient.post<Tweet>("tweets", { content });
    console.log(image);
    if (!image || image.length === 0) {
      return res;
    } else {
      const tweetId = res.data.id;
      const formData = new FormData();
      formData.append("imageable_type", "tweet");
      formData.append("imageable_id", tweetId.toString());
      formData.append("image", image[0], image[0].name);
      const resImg = await apiClient.post(`images`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return resImg;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
