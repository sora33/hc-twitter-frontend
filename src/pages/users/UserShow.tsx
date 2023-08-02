import { UserDetail } from "features/user/views/UserDetail";
import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";

export const UserShow: React.FC = () => {
  return (
    <>
      <HStack>
        <BackIconButton />
        <HeadingH1>プロフィール</HeadingH1>
      </HStack>
      <UserDetail />
    </>
  );
};
