import { Flex, HStack, Text, Stack } from "@chakra-ui/react";
import { MainAvatar } from "components/avatar/MainAvatar";
import { formatDate } from "lib/functions/formatDate";
import { MainImage } from "components/image/MainImage";
import { Comment } from "features/comment/commentTypes";
import { UserBase } from "features/user/userTypes";
import { useToastMessage } from "hooks/useToastMessage";
import { deleteComment } from "features/comment/commentApis";
import { MainButton } from "components/button/MainButton";

type CommentCardProps = {
  comment: Omit<Comment, "user">;
  user: UserBase;
  isDeletable?: boolean;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CommentCard: React.FC<CommentCardProps> = ({
  comment,
  user,
  isDeletable = false,
  setRefetch,
}) => {
  const { toastMessage } = useToastMessage();

  const onClickDelete = async (id: number) => {
    if (window.confirm("このコメントを削除しますか？")) {
      try {
        await deleteComment(id);
        setRefetch && setRefetch(true);
        toastMessage({ title: "コメントを削除できました" });
      } catch (error) {
        toastMessage({ title: "コメントを削除に失敗しました。", status: "error" });
      }
    }
  };

  return (
    <Flex borderBottom="1px solid" borderColor="gray.200" py="2" pb="4" fontSize="sm">
      <MainAvatar mr="4" src={user.avatarImage ?? ""} link={`/users/${user.id}`} />
      <Stack position="relative" spacing="2" flex="1">
        <Stack spacing="2">
          <HStack>
            <Text fontWeight="bold">{user.name}</Text>
            <Text size="sm" color="gray">
              {formatDate(comment.createdAt)}
            </Text>
            {isDeletable && (
              <MainButton
                position="absolute"
                right="0"
                size="sm"
                colorScheme="red"
                onClick={() => onClickDelete(comment.id)}
              >
                削除
              </MainButton>
            )}
          </HStack>
          <Text whiteSpace="pre-line" lineHeight="shorter">
            {comment.content}
          </Text>
          {comment.image && <MainImage src={comment.image} />}
        </Stack>
      </Stack>
    </Flex>
  );
};
