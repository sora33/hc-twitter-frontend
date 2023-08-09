import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ChildrenModal } from "components/modal/ChildrenModal";
import { PostCommentForm } from "features/comment/views/PostCommentForm";
import { Tweet } from "features/tweet/tweetTypes";
import { UserBase } from "features/user/userTypes";
import { TweetCardButton } from "features/tweet/views/TweetCardButton/TweetCardButton";

type CommentButtonProps = {
  tweet: Omit<Tweet, "user">;
  tweetUser: UserBase;
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
