import { Flex, HStack, Stack, Text, Image } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { MainButton } from "components/button/MainButton";
import { BooleanLink } from "components/link/BooleanLink";
import { Tweet } from "features/tweet/tweetTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton";
import { User } from "features/user/userTypes";
import { formatDate } from "lib/functions/formatDate";
import { deleteTweet } from "features/tweet/tweetApis";
import { useToastMessage } from "hooks/useToastMessage";

type TweetCardProps = {
  isTweetDetail?: boolean;
  tweet: Omit<Tweet, "user">;
  tweetUser: Omit<User, "tweets">;
  isDeletable?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const TweetCard: React.FC<TweetCardProps> = ({
  isTweetDetail = false,
  tweet: tweet,
  tweetUser: tweetUser,
  isDeletable = false,
  setRefetch,
}) => {
  const { toastMessage } = useToastMessage();
  const image = typeof tweet.image === "string" ? tweet.image : null;
  const avatarImage = typeof tweetUser.avatarImage === "string" ? tweetUser.avatarImage : null;

  const onClickDelete = async (id: number) => {
    if (window.confirm("このツイートを削除しますか？")) {
      try {
        await deleteTweet(id);
        setRefetch && setRefetch(true);
        toastMessage({ title: "ツイートを削除できました" });
      } catch (error) {
        toastMessage({ title: "ツイートを削除に失敗しました。", status: "error" });
      }
    }
  };

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="gray.200"
      pb="2"
      fontSize={isTweetDetail ? "md" : "sm"}
    >
      <MainAvatar mr="4" src={avatarImage ?? ""} link={`/users/${tweetUser.id}`} />
      <Stack position="relative" spacing="2" flex="1">
        {isDeletable && (
          <MainButton
            position="absolute"
            right="0"
            colorScheme="red"
            size="sm"
            ml="auto"
            onClick={() => onClickDelete(tweet.id)}
          >
            削除
          </MainButton>
        )}
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