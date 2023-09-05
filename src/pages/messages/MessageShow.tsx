import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";
import { MessageList } from "features/dm/message/views/MessageList";

export const MessageShow: React.FC = () => {
  return (
    <>
      <HStack>
        <BackIconButton />
        <HeadingH1>メッセージ</HeadingH1>
      </HStack>
      <MessageList />
    </>
  );
};
