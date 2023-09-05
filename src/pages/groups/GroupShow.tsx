import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";
import { GroupList } from "features/dm/group/views/GroupList";

export const GroupShow: React.FC = () => {
  return (
    <>
      <HStack>
        <BackIconButton />
        <HeadingH1>グループ</HeadingH1>
      </HStack>
      <GroupList />
    </>
  );
};
