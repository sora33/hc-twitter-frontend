import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";
import { BookmarkList } from "features/bookmark/views/BookmarkList";

export const BookmarkShow: React.FC = () => {
  return (
    <>
      <HStack>
        <BackIconButton />
        <HeadingH1>ブックマーク</HeadingH1>
      </HStack>
      <BookmarkList />
    </>
  );
};
