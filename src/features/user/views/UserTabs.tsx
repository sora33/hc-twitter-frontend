import { HStack } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";

const UserTabButton = ({ children }: { children: React.ReactNode }) => {
  return <MainButton colorScheme="gray">{children}</MainButton>;
};

export const UserTabs = () => {
  return (
    <HStack spacing={1} mt="4" mb="4" pb="2" borderBottom="1px solid" borderColor="gray.200">
      <UserTabButton>ツイート</UserTabButton>
      <UserTabButton>返信</UserTabButton>
      <UserTabButton>いいね</UserTabButton>
    </HStack>
  );
};
