import { Text, Box, Stack } from "@chakra-ui/react";
import { MainSpinner } from "components/loading/MainSpinner";
import { useBookmarks } from "features/bookmark/useBookmarks";
import { TweetCard } from "features/tweet/views/TweetCard";

export const BookmarkList: React.FC = () => {
  const { data: tweets, isLoading, error } = useBookmarks();
  if (isLoading) {
    return <MainSpinner />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Box>
      <Stack spacing={4}>
        {tweets?.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} tweetUser={tweet.user} />
        ))}
      </Stack>
    </Box>
  );
};
