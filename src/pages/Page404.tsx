import { HStack, Text } from "@chakra-ui/react";
import { BackIconButton } from "components/button/BackIconButton";
export const Page404: React.FC = () => {
  return (
    <HStack>
      <BackIconButton />
      <Text>ページが存在しません。</Text>
    </HStack>
  );
};
