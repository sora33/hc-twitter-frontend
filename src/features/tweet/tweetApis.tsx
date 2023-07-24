import { Tweet } from "features/tweet/tweetTypes";
import { apiClient } from "lib/axios/apiClient";

export type TweetParams = Pick<Tweet, "content" | "image">;

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
      formData.append("tweet_id", tweetId.toString());
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
