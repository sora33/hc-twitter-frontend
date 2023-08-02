import { Stack, Box, Text } from "@chakra-ui/react";
import { useUser } from "features/user/useUser";
import { MainSpinner } from "components/loading/MainSpinner";
import { MainLoading } from "components/loading/MainLoading";
import { useParams } from "react-router-dom";
import { TweetCard } from "features/tweet/views/TweetCard";
import { UserProfile } from "features/user/views/UserProfile";
import { UserTabs } from "features/user/views/UserTabs";
import { useAuth } from "features/auth/useAuth";

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, setRefetch, isRefetching } = useUser(Number(id));
  const { currentUser } = useAuth();

  if (isLoading) {
    return <MainSpinner />;
  }

  if (error || !data) {
    return <Text>{error?.message || "データがありません"}</Text>;
  }
  const { tweets, ...user } = data;
  const isMyPage = currentUser?.id === user.id;

  return (
    <Box>
      {isRefetching && <MainLoading />}
      <UserProfile user={user} setRefetch={setRefetch} isMyPage={isMyPage} />
      <UserTabs />

      <Stack spacing={4}>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            tweetUser={user}
            isDeletable={isMyPage}
            setRefetch={setRefetch}
          />
        ))}
        {isLoading && <MainSpinner />}
      </Stack>
    </Box>
  );
};
