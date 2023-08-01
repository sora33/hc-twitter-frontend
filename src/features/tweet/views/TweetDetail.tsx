import { Box, Text } from "@chakra-ui/react";
import { useTweet } from "features/tweet/useTweet";
import { MainSpinner } from "components/loading/MainSpinner";
import { TweetCard } from "features/tweet/views/TweetCard";
import { useParams } from "react-router-dom";

export const TweetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: tweet, isLoading, error } = useTweet(Number(id));

  if (error) {
    return <Text>{error.message}</Text>;
  }
  if (isLoading) {
    return <MainSpinner />;
  }

  return (
    <Box>
      {tweet && (
        <TweetCard isTweetDetail tweet={tweet} tweetUser={tweet.user} />
      )}
    </Box>
  );
};
