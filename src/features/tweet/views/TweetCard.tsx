import { Flex, HStack, Stack, Text, Image } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { BooleanLink } from "components/link/BooleanLink";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton";
import { User } from "features/user/userTypes";
import { formatDate } from "lib/functions/formatDate";

type TweetCardProps = {
  isTweetDetail?: boolean;
  tweet: Omit<Tweet, "user">;
  tweetUser: Omit<User, "tweets">;
};
export const TweetCard: React.FC<TweetCardProps> = ({
  isTweetDetail = false,
  tweet: tweet,
  tweetUser: tweetUser,
}) => {
  const image = typeof tweet.image === "string" ? tweet.image : null;
  const avatarImage = typeof tweetUser.avatarImage === "string" ? tweetUser.avatarImage : null;

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="gray.200"
      pb="2"
      fontSize={isTweetDetail ? "md" : "sm"}
    >
      <MainAvatar mr="4" src={avatarImage ?? ""} link={`/users/${tweetUser.id}`} />
      <Stack spacing="2" flex="1">
        <BooleanLink isLink={isTweetDetail} link={`/tweets/${tweet.id}`}>
          <Stack spacing="2">
            <HStack>
              <Text fontWeight="bold">{tweetUser.name}</Text>
              <Text size="sm" color="gray">
                {formatDate(tweet.createdAt)}
              </Text>
            </HStack>
            <Text whiteSpace="pre-line" lineHeight="shorter">
              {tweet.content}
            </Text>
            {image && <Image src={image} h="300px" w="100%" rounded="2xl" objectFit="cover" />}
          </Stack>
        </BooleanLink>
        <HStack justifyContent="space-between" maxW="240px">
          <TweetCardButton type="good">12</TweetCardButton>
          <TweetCardButton type="comment">12</TweetCardButton>
          <TweetCardButton type="retweet">12</TweetCardButton>
        </HStack>
      </Stack>
    </Flex>
  );
};
