import { useState } from "react";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton/TweetCardButton";
import { postRetweet, deleteRetweet } from "features/retweet/retweetApis";
import { useToastMessage } from "hooks/useToastMessage";

type RetweetButtonProps = {
  tweet: Omit<Tweet, "user">;
};
export const RetweetButton: React.FC<RetweetButtonProps> = ({ tweet }) => {
  const [retweetsCount, setRetweetsCoute] = useState(tweet.retweets.count ?? 0);
  const [isRetweeted, setIsRetweeted] = useState(tweet.retweets.isRetweeted ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();

  const handleClick = async () => {
    setIsLoading(true);
    if (isRetweeted) {
      try {
        await deleteRetweet(tweet.id);
        setRetweetsCoute((retweetsCount) => retweetsCount - 1);
        setIsRetweeted((isRetweeted) => !isRetweeted);
      } catch (error) {
        toastMessage({ title: "リツイートを取り消しに失敗しました", status: "error" });
      }
    } else {
      try {
        await postRetweet(tweet.id);
        setRetweetsCoute((retweetsCount) => retweetsCount + 1);
        setIsRetweeted((isRetweeted) => !isRetweeted);
      } catch (error) {
        toastMessage({ title: "リツイートに失敗しました", status: "error" });
        console.log(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <TweetCardButton
        type="retweet"
        onClick={handleClick}
        isColor={isRetweeted}
        isLoading={isLoading}
      >
        {retweetsCount}
      </TweetCardButton>
    </>
  );
};
