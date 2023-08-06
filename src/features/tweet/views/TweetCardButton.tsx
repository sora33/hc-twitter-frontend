import { ReactNode, ReactElement, useState } from "react";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineMessage, AiOutlineRetweet } from "react-icons/ai";
import { ChildrenModal } from "components/modal/ChildrenModal";
import { PostCommentForm } from "features/comment/views/PostCommentForm";
import { Tweet } from "features/tweet/tweetTypes";
import { User } from "features/user/userTypes";

type CommentButtonProps = {
  tweet: Omit<Tweet, "user">;
  tweetUser: Omit<User, "tweets">;
};
export const CommentButton: React.FC<CommentButtonProps> = ({ tweet, tweetUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentCoute, setCommentCoute] = useState(11);

  const hundleSubmit = () => {
    setCommentCoute((commentCoute) => commentCoute + 1);
    onClose();
  };
  return (
    <>
      <TweetCardButton type="comment" onClick={onOpen}>
        {commentCoute}
      </TweetCardButton>
      <ChildrenModal isOpen={isOpen} onClose={onClose} title="コメント投稿">
        <PostCommentForm tweet={tweet} tweetUser={tweetUser} hundleSubmit={hundleSubmit} />
      </ChildrenModal>
    </>
  );
};

type TweetCardButtonProps = {
  type: "good" | "comment" | "retweet";
  children: ReactNode;
} & Omit<ButtonProps, "type" | "children">;

export const TweetCardButton: React.FC<TweetCardButtonProps> = ({
  type,
  children,
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
        color="gray.400"
        {...buttonProps}
      >
        {children}
      </Button>
    </>
  );
};
