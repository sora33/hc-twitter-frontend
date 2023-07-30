import { Flex, HStack, Stack, Text, Image } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { BooleanLink } from "components/link/BooleanLink";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton";

type TweetCardProps = Tweet & {
  isTweetDetail?: boolean;
};
export const TweetCard: React.FC<TweetCardProps> = ({
  isTweetDetail = false,
  ...tweet
}) => {
  const image = typeof tweet.image === "string" ? tweet.image : null;

  function formatDate(isoDateString: Date, locale = "ja-JP") {
    const date = new Date(isoDateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    });
  }

  return (
    <BooleanLink isLink={isTweetDetail} link={`/tweets/${tweet.id}`}>
      <Flex
        borderBottom="1px solid"
        borderColor="gray.200"
        pb="2"
        fontSize={isTweetDetail ? "md" : "sm"}
      >
        <MainAvatar mr="4" />
        <Stack spacing="2" flex="1">
          <HStack>
            <Text fontWeight="bold">{tweet.user?.name}</Text>
            <Text>{formatDate(tweet.createdAt)}</Text>
            <Text fontSize="xs" color="gray.300">
              （Tweet_id:{tweet.id}）
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
          <HStack justifyContent="space-between" maxW="240px">
            <TweetCardButton type="good">12</TweetCardButton>
            <TweetCardButton type="comment">12</TweetCardButton>
            <TweetCardButton type="retweet">12</TweetCardButton>
          </HStack>
        </Stack>
      </Flex>
    </BooleanLink>
  );
};
