import { HStack } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";
interface UserTabButtonProps {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const UserTabButton = ({ children, isSelected, onClick }: UserTabButtonProps) => {
  return (
    <MainButton
      colorScheme="gray"
      color={isSelected ? "auto" : "gray"}
      borderBottom={isSelected ? "4px solid rgb(29, 155, 240)" : "none"}
      pb={isSelected ? "1" : "2"}
      pt={2}
      rounded={0}
      onClick={onClick}
    >
      {children}
    </MainButton>
  );
};

interface UserTabsProps {
  tabState: "tweets" | "comments" | "goods";
  setTabState: React.Dispatch<React.SetStateAction<"tweets" | "comments" | "goods">>;
}

export const UserTabs = ({ tabState, setTabState }: UserTabsProps) => {
  return (
    <HStack spacing={1} mt="4" mb="4" pb="2" borderBottom="1px solid" borderColor="gray.200">
      <UserTabButton isSelected={tabState === "tweets"} onClick={() => setTabState("tweets")}>
        ツイート
      </UserTabButton>
      <UserTabButton isSelected={tabState === "comments"} onClick={() => setTabState("comments")}>
        コメント
      </UserTabButton>
      <UserTabButton isSelected={tabState === "goods"} onClick={() => setTabState("goods")}>
        いいね
      </UserTabButton>
    </HStack>
  );
};
