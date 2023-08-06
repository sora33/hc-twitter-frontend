import { Flex, HStack, Text, Stack, Box } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { formatDate } from "lib/functions/formatDate";
import { MainImage } from "components/image/MainImage";
import { Comment } from "features/comment/commentTypes";

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
        comments?.map((comment) => (
          <Flex borderBottom="1px solid" borderColor="gray.200" py="2">
            <MainAvatar
              mr="4"
              src={comment.user.avatarImage ?? ""}
              link={`/users/${comment.user.id}`}
            />
            <Stack position="relative" spacing="2" flex="1">
              <Stack spacing="2">
                <HStack>
                  <Text fontWeight="bold">{comment.user.name}</Text>
                  <Text size="sm" color="gray">
                    {formatDate(comment.createdAt)}
                  </Text>
                </HStack>
                <Text whiteSpace="pre-line" lineHeight="shorter">
                  {comment.content}
                </Text>
                {comment.image && <MainImage src={comment.image} />}
              </Stack>
            </Stack>
          </Flex>
        ))
      ) : (
        <Text fontSize="sm">コメントはありません</Text>
      )}
    </Box>
  );
};
