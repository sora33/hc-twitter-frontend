import { Stack, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "features/user/useUser";
import { MainSpinner } from "components/loading/MainSpinner";
import { useParams } from "react-router-dom";
import { TweetCard } from "features/tweet/views/TweetCard";
import { UserProfile } from "features/user/views/UserProfile";
import { UserTabs } from "features/user/views/UserTabs";
import { useAuth } from "features/auth/useAuth";
import { CommentCard } from "features/comment/views/CommentCard";

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, setRefetch, isRefetching } = useUser(Number(id));
  const { currentUser } = useAuth();
  const [tabState, setTabState] = useState<"tweets" | "comments" | "goods">("tweets");

  if (isLoading) {
    return <MainSpinner />;
  }
  if (error || !data) {
    return <Text>{error?.message || "データがありません"}</Text>;
  }

  const { tweets, comments, ...user } = data;
  const isMyPage = currentUser?.id === user.id;

  let contents;
  switch (tabState) {
    case "tweets":
      contents = tweets.map((tweet) => (
        <TweetCard
          key={tweet.id}
          tweet={tweet}
          tweetUser={user}
          isDeletable={isMyPage}
          setRefetch={setRefetch}
        />
      ));
      break;
    case "comments":
      contents = comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          user={user}
          isDeletable={isMyPage}
          setRefetch={setRefetch}
        />
      ));
      break;
    case "goods":
      break;
    default:
      break;
  }

  return (
    <Box>
      {isRefetching && <MainSpinner variant="allView" />}
      <UserProfile user={user} setRefetch={setRefetch} isMyPage={isMyPage} />
      <UserTabs tabState={tabState} setTabState={setTabState} />

      <Stack spacing={4}>
        {contents}
        {isLoading && <MainSpinner />}
      </Stack>
    </Box>
  );
};
