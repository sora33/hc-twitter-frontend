import { Box, Flex, Link, HStack, Stack, Text, Icon } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { Notification } from "features/notification/notificationTypes";
import { AiFillHeart, AiFillMessage, AiOutlineUser } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";
type NotificationCardProps = {
  notification: Notification;
};

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { actor, action, detail } = notification;
  let actionString = "";
  switch (action) {
    case "favorite":
      actionString = "いいね";
      break;
    case "comment":
      actionString = "コメント";
      break;
    case "follow":
      actionString = "フォロー";
      break;
    default:
      break;
  }

  return (
    <Flex borderBottom="1px solid" borderColor="gray.200" pb="2" fontSize="sm">
      <Box mr="4">
        {
          {
            favorite: <Icon as={AiFillHeart} color="red" boxSize="8" />, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            comment: <Icon as={AiFillMessage} color="gray" boxSize="8" />, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            follow: <Icon as={AiOutlineUser} color="blue" boxSize="8" />, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
          }[action]
        }
      </Box>
      <Stack position="relative" spacing="2" flex="1">
        <Stack spacing="2">
          <HStack>
            <MainAvatar src={actor.avatarImage ?? ""} link={`/users/${actor.id}`} />
            <Text fontWeight="bold">{actor.name}</Text>
            <Text>{`さんに「${actionString}」されました。`}</Text>
          </HStack>
          {
            {
              favorite: (
                <Link
                  as={RouterLink}
                  to={`/tweets/${detail?.id}`}
                  whiteSpace="pre-line"
                  lineHeight="shorter"
                  color="gray"
                >
                  {detail?.content}
                </Link>
              ),
              comment: (
                <Text whiteSpace="pre-line" lineHeight="shorter">
                  {detail?.content}
                </Text>
              ),
              follow: null,
            }[action]
          }
        </Stack>
      </Stack>
    </Flex>
  );
};
