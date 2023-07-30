import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { Tweet } from "features/tweet/tweetTypes";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineMessage,
} from "react-icons/ai";

export const TweetCard: React.FC<Tweet> = (tweet) => {
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
    <Flex borderBottom="1px solid" borderColor="gray.200" pb="2" fontSize="sm">
      <MainAvatar mr="4" />
      <Stack spacing="2" flex="1">
        <HStack>
          <Text fontWeight="bold">{tweet.user.name}</Text>
          <Text>{formatDate(tweet.createdAt)}</Text>
          <Text fontSize="xs" color="gray.300">
            （Tweet_id:{tweet.id}）
          </Text>
        </HStack>
        <Text whiteSpace="pre-line" lineHeight="shorter">
          {tweet.content}
        </Text>
        {image && (
          <Image src={image} h="300px" rounded="2xl" objectFit="cover" />
        )}
        <HStack justifyContent="space-between" maxW="240px">
          <Button
            leftIcon={<AiOutlineMessage />}
            size="sm"
            variant="ghost"
            colorScheme="gray"
            color="gray.400"
          >
            12
          </Button>
          <Button
            leftIcon={<AiOutlineHeart />}
            size="sm"
            variant="ghost"
            colorScheme="pink"
            color="gray.400"
          >
            12
          </Button>
          <Button
            leftIcon={<AiOutlineRetweet />}
            size="sm"
            variant="ghost"
            colorScheme="green"
            color="gray.400"
          >
            12
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
};
