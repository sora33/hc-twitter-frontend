import { Flex, Text, Stack } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { formatDate } from "lib/functions/formatDate";
import { Message } from "features/dm/message/messageTypes";
import { useAuth } from "features/auth/useAuth";

type MessageCardProps = {
  message: Message;
};

export const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const { currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === message.user.id;

  return (
    <Flex py="2" pb="4" fontSize="sm" maxW="420px" w="70%" ml={isCurrentUser ? "auto" : "0"}>
      <MainAvatar mr="4" src={message.user.avatarImage ?? ""} link={`/users/${message.user.id}`} />
      <Stack spacing="0" flex="1">
        <Text
          whiteSpace="pre-line"
          lineHeight="shorter"
          bg={isCurrentUser ? "blue.400" : "gray.100"}
          color={isCurrentUser ? "white" : undefined}
          p="2"
          rounded="lg"
        >
          {message.content}
        </Text>
        <Text color="gray" fontSize="xs">
          {formatDate(message.createdAt)}
        </Text>
      </Stack>
    </Flex>
  );
};
