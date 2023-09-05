import { Flex, HStack, Text, Stack } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { formatDate } from "lib/functions/formatDate";
import { Group } from "features/dm/group/groupTypes";
import { Link as RouterLink } from "react-router-dom";

type GroupCardProps = {
  group: Group;
};

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const { users } = group;

  return (
    <Flex borderBottom="1px solid" borderColor="gray.200" py="2" pb="4" fontSize="sm">
      <MainAvatar
        mr="4"
        src={users?.length > 1 ? "" : users[0].avatarImage ?? ""}
        link={users?.length > 1 ? "" : `/users/${users[0].id}`}
      />
      <Stack as={RouterLink} to={`./${group.id}`} spacing="2" flex="1">
        <HStack>
          {users.map((user, index) => (
            <HStack key={user.id}>
              <Text fontWeight="bold">{user.name}</Text>
              {index !== users.length - 1 && <Text>,</Text>}
            </HStack>
          ))}
          <Text size="sm" color="gray">
            {formatDate(group.lastMessage?.updatedAt)}
          </Text>
        </HStack>
        <Text whiteSpace="pre-line" lineHeight="shorter">
          {group.lastMessage?.content}
        </Text>
      </Stack>
    </Flex>
  );
};
