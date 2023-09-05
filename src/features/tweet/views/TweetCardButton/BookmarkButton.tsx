import { useState } from "react";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton/TweetCardButton";
import { postBookmark, deleteBookmark } from "features/bookmark/bookmarkApis";
import { useToastMessage } from "hooks/useToastMessage";

type BookmarkButtonProps = {
  tweet: Omit<Tweet, "user">;
};

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ tweet }) => {
  const [isBookmarked, setIsBookmarked] = useState(tweet.isBookmarked ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();

  const handleClick = async () => {
    setIsLoading(true);
    if (isBookmarked) {
      try {
        await deleteBookmark(tweet.id);
        setIsBookmarked((isBookmarked) => !isBookmarked);
      } catch (error) {
        toastMessage({ title: "ブックマークを取り消しに失敗しました", status: "error" });
      }
    } else {
      try {
        await postBookmark(tweet.id);
        setIsBookmarked((isBookmarked) => !isBookmarked);
      } catch (error) {
        toastMessage({ title: "ブックマークに失敗しました", status: "error" });
        console.log(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <TweetCardButton
      type="bookmark"
      onClick={handleClick}
      isColor={isBookmarked}
      isLoading={isLoading}
    />
  );
};
