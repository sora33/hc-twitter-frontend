import { useState } from "react";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton/TweetCardButton";
import { postFavorite, deleteFavorite } from "features/favorite/favoriteApis";
import { useToastMessage } from "hooks/useToastMessage";

type FavoriteButtonProps = {
  tweet: Omit<Tweet, "user">;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ tweet }) => {
  const [favoritesCount, setFavoritesCoute] = useState(tweet.favorites.count ?? 0);
  const [isFavorited, setIsFavoriteed] = useState(tweet.favorites.isFavorited ?? false);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();

  const handleClick = async () => {
    setIsLoading(true);
    if (isFavorited) {
      try {
        await deleteFavorite(tweet.id);
        setFavoritesCoute((favoritesCount) => favoritesCount - 1);
        setIsFavoriteed((isFavorited) => !isFavorited);
      } catch (error) {
        toastMessage({ title: "いいねを取り消しに失敗しました", status: "error" });
      }
    } else {
      try {
        await postFavorite(tweet.id);
        setFavoritesCoute((favoritesCount) => favoritesCount + 1);
        setIsFavoriteed((isFavorited) => !isFavorited);
      } catch (error) {
        toastMessage({ title: "いいねに失敗しました", status: "error" });
        console.log(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      <TweetCardButton
        type="favorite"
        onClick={handleClick}
        isColor={isFavorited}
        isLoading={isLoading}
      >
        {favoritesCount}
      </TweetCardButton>
    </>
  );
};
