import { Stack, Box, Text } from "@chakra-ui/react";
import { useUser } from "features/user/useUser";
import { MainSpinner } from "components/loading/MainSpinner";
import { useParams } from "react-router-dom";
import { TweetCard } from "features/tweet/views/TweetCard";
import { UserProfile } from "features/user/views/UserProfile";
import { UserTabs } from "features/user/views/UserTabs";

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, setRefetch } = useUser(Number(id));

  if (isLoading) {
    return <MainSpinner />;
  }

  if (error || !data) {
    return <Text>{error?.message || "データがありません"}</Text>;
  }

  const { tweets, ...user } = data;
  return (
    <Box>
      <UserProfile user={user} setRefetch={setRefetch} />
      <UserTabs />

      <Stack spacing={4}>
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} tweetUser={user} />
        ))}
        {isLoading && <MainSpinner />}
      </Stack>
    </Box>
  );
};
