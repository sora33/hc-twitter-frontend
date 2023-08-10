import { ReactNode, ReactElement } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
  AiFillHeart,
  AiFillMessage,
} from "react-icons/ai";

type TweetCardButtonProps = {
  type: "favorite" | "comment" | "retweet";
  children: ReactNode;
  isColor?: boolean;
} & Omit<ButtonProps, "type" | "children">;

export const TweetCardButton: React.FC<TweetCardButtonProps> = ({
  type,
  children,
  isColor = false,
  ...buttonProps
}) => {
  let IconComponent: ReactElement, IconComponentFilled: ReactElement, colorScheme: string;
  switch (type) {
    case "favorite":
      IconComponent = <AiOutlineHeart />;
      IconComponentFilled = <AiFillHeart />;
      colorScheme = "red";
      break;
    case "comment":
      IconComponent = <AiOutlineMessage />;
      IconComponentFilled = <AiFillMessage />;
      colorScheme = "blue";
      break;
    case "retweet":
      IconComponent = <AiOutlineRetweet />;
      IconComponentFilled = IconComponent;
      colorScheme = "green";
      break;
    default:
      throw new Error("Invalid type prop");
  }

  return (
    <>
      <Button
        leftIcon={isColor ? IconComponentFilled : IconComponent}
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
