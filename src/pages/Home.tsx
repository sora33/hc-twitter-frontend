import { useState, createContext } from "react";
import { PostTweetForm } from "features/tweet/views/PostTweetForm";
import { TweetList } from "features/tweet/views/TweetList";
import { HeadingH1 } from "components/heading/HeadingH1";

export const TweetContext = createContext({
  refreshTweets: false,
  setRefreshTweets: (refresh: boolean) => {
    refresh;
  },
});

export const Home: React.FC = () => {
  const [refreshTweets, setRefreshTweets] = useState(false);

  return (
    <TweetContext.Provider value={{ refreshTweets, setRefreshTweets }}>
      <HeadingH1>ホーム</HeadingH1>
      <PostTweetForm />
      <TweetList />
    </TweetContext.Provider>
  );
};
