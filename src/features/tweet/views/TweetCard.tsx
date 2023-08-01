import { Flex, HStack, Stack, Text, Image } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { BooleanLink } from "components/link/BooleanLink";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton";
import { formatDate } from "lib/functions/formatDate";

type TweetCardProps = Tweet & {
  isTweetDetail?: boolean;
};
export const TweetCard: React.FC<TweetCardProps> = ({
  isTweetDetail = false,
  ...tweet
}) => {
  const image = typeof tweet.image === "string" ? tweet.image : null;

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="gray.200"
      pb="2"
      fontSize={isTweetDetail ? "md" : "sm"}
    >
      <MainAvatar mr="4" />
      <Stack spacing="2" flex="1">
        <BooleanLink isLink={isTweetDetail} link={`/tweets/${tweet.id}`}>
          <HStack>
            <Text fontWeight="bold">{tweet.user?.name}</Text>
            <Text size="sm" color="gray">
              {formatDate(tweet.createdAt)}
            </Text>
          </HStack>
          <Text whiteSpace="pre-line" lineHeight="shorter">
            {tweet.content}
          </Text>
          {image && (
            <Image
              src={image}
              h="300px"
              w="100%"
              rounded="2xl"
              objectFit="cover"
            />
          )}
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
