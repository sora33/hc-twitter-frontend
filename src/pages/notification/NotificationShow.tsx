import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { NotificationList } from "features/notification/views/NotificationList";

export const NotificationShow: React.FC = () => {
  return (
    <>
      <HStack>
        <HeadingH1>通知</HeadingH1>
      </HStack>
      <NotificationList />
    </>
  );
};
