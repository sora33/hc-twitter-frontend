import { Text, Box } from "@chakra-ui/react";

import { Comment } from "features/comment/commentTypes";
import { CommentCard } from "features/comment/views/CommentCard";

type commentListProps = {
  comments: Comment[];
};

export const CommentList: React.FC<commentListProps> = ({ comments }) => {
  return (
    <Box>
      <Text fontWeight="bold" py="2">
        コメント一覧
      </Text>
      {comments?.length > 0 ? (
        comments?.map((commentItem) => {
          const { user, ...comment } = commentItem;
          return <CommentCard key={comment.id} comment={comment} user={user} />;
        })
      ) : (
        <Text fontSize="sm">コメントはありません</Text>
      )}
    </Box>
  );
};
