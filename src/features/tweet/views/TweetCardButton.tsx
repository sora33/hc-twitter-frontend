import { ReactNode, ReactElement } from "react";
import { Button } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from "react-icons/ai";

type TweetCardButtonProps = {
  type: "good" | "comment" | "retweet";
  children: ReactNode;
};

export const TweetCardButton: React.FC<TweetCardButtonProps> = ({ type, children }) => {
  let IconComponent: ReactElement, colorScheme: string;

  switch (type) {
    case "good":
      IconComponent = <AiOutlineHeart />;
      colorScheme = "pink";
      break;
    case "comment":
      IconComponent = <AiOutlineMessage />;
      colorScheme = "gray";
      break;
    case "retweet":
      IconComponent = <AiOutlineRetweet />;
      colorScheme = "green";
      break;
    default:
      throw new Error("Invalid type prop");
  }

  return (
    <Button
      leftIcon={IconComponent}
      size="sm"
      variant="ghost"
      colorScheme={colorScheme}
      color="gray.400"
    >
      {children}
    </Button>
  );
};
