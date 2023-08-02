import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import { useTweets } from "features/tweet/useTweets";
import { MainSpinner } from "components/loading/MainSpinner";
import { TweetCard } from "features/tweet/views/TweetCard";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetContext } from "pages/Home";
import { getTweets } from "features/tweet/tweetApis";

export const TweetList = () => {
  const [page, setPage] = useState(0);
  const [initial, setInitial] = useState(true);
  const { data: newTweets, isLoading, error } = useTweets(page);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const loadingRef = useRef(false);
  const { refreshTweets, setRefreshTweets } = useContext(TweetContext);

  useEffect(() => {
    if (newTweets && newTweets.length > 0 && page > 0) {
      setTweets((prevTweets) => [...prevTweets, ...newTweets]);
      loadingRef.current = false;
      console.log("tweets", tweets);
    }
  }, [newTweets]);

  useEffect(() => {
    if (initial && newTweets && newTweets.length > 0) {
      setTweets(newTweets);
      setInitial(false);
    }
  }, [initial, newTweets]);

  useEffect(() => {
    const fetchLatestTweets = async () => {
      const res = await getTweets(0);
      console.log(res);
      setTweets(res);
      setPage(0);
      loadingRef.current = false;
      setRefreshTweets(false);
    };

    if (refreshTweets) {
      void fetchLatestTweets();
    }
  }, [refreshTweets, setRefreshTweets]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      if (!loadingRef.current) {
        setPage((page) => page + 1);
        loadingRef.current = true;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Box>
      <Stack spacing={4}>
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} tweetUser={tweet.user} />
        ))}
        {isLoading && <MainSpinner />}
      </Stack>
    </Box>
  );
};
