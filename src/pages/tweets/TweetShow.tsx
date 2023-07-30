import { TweetDetail } from "features/tweet/views/TweetDetail";
import { HeadingH1 } from "components/heading/HeadingH1";
import { HStack } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";

export const TweetShow: React.FC = () => {
  return (
    <>
      <HStack>
        <BackIconButton />
        <HeadingH1>ツイート</HeadingH1>
      </HStack>
      <TweetDetail />
    </>
  );
};
