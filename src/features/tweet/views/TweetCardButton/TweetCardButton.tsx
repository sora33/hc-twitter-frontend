import { ReactNode, ReactElement } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from "react-icons/ai";

type TweetCardButtonProps = {
  type: "good" | "comment" | "retweet";
  children: ReactNode;
  isColor?: boolean;
} & Omit<ButtonProps, "type" | "children">;

export const TweetCardButton: React.FC<TweetCardButtonProps> = ({
  type,
  children,
  isColor = false,
  ...buttonProps
}) => {
  let IconComponent: ReactElement, colorScheme: string;
  switch (type) {
    case "good":
      IconComponent = <AiOutlineHeart />;
      colorScheme = "pink";
      break;
    case "comment":
      IconComponent = <AiOutlineMessage />;
      colorScheme = "blue";
      break;
    case "retweet":
      IconComponent = <AiOutlineRetweet />;
      colorScheme = "green";
      break;
    default:
      throw new Error("Invalid type prop");
  }

  return (
    <>
      <Button
        leftIcon={IconComponent}
        size="sm"
        variant="ghost"
        colorScheme={colorScheme}
        color={isColor ? colorScheme : "gray.400"}
        {...buttonProps}
      >
        {children}
      </Button>
    </>
  );
};
