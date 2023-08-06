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
  setRefetchComments?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CommentButton: React.FC<CommentButtonProps> = ({
  tweet,
  tweetUser,
  setRefetchComments,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentsCount, setCommentsCoute] = useState(tweet.commentsCount ?? 0);

  const hundleSubmit = () => {
    setCommentsCoute((commentsCount) => commentsCount + 1);
    setRefetchComments && setRefetchComments(true);
    onClose();
  };
  return (
    <>
      <TweetCardButton type="comment" onClick={onOpen}>
        {commentsCount}
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
