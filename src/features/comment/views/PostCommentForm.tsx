import { Stack, HStack, Text, Flex, Box } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CommentParams } from "features/comment/commentApis";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useState } from "react";
import { postComment } from "features/comment/commentApis";
import { MainAvatar } from "components/avatar/MainAvatar";
import { useAuth } from "features/auth/useAuth";
import { checkFileSize } from "lib/functions/checkFileSize";
import { MainImage } from "components/image/MainImage";
import { IconClose } from "components/icon/IconClose";
import { IconInputImage } from "components/icon/IconInputImage";
import { Tweet } from "features/tweet/tweetTypes";
import { User } from "features/user/userTypes";
import { formatDate } from "lib/functions/formatDate";
import { useComments } from "features/comment/useComments";

type PostCommentFormProps = {
  tweet: Omit<Tweet, "user">;
  tweetUser: Omit<User, "tweets">;
  hundleSubmit: () => void;
};
export const PostCommentForm: React.FC<PostCommentFormProps> = ({
  tweet,
  tweetUser,
  hundleSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const { setRefetch } = useComments();

  const { toastMessage } = useToastMessage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CommentParams>();

  const { image } = watch();
  const onSubmit: SubmitHandler<CommentParams> = async (form) => {
    try {
      setIsLoading(true);
      await postComment({ ...form, tweetId: tweet.id });
      toastMessage({ title: "コメントできました" });
      reset();
      setRefetch(true);
      void hundleSubmit();
    } catch (error) {
      toastMessage({ title: `コメントに失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Flex borderBottom="1px solid" borderColor="gray.200" pb="2" mb="2">
        <MainAvatar mr="4" src={tweetUser.avatarImage ?? ""} link={`/users/${tweetUser.id}`} />
        <Stack position="relative" spacing="2" flex="1">
          <Stack spacing="2">
            <HStack>
              <Text fontWeight="bold">{tweetUser.name}</Text>
              <Text size="sm" color="gray">
                {formatDate(tweet.createdAt)}
              </Text>
            </HStack>
            <Text whiteSpace="pre-line" lineHeight="shorter">
              {tweet.content}
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex pb="2" borderBottom="1px solid" borderColor="gray.200">
        <MainAvatar
          mr="4"
          src={currentUser?.avatarImage ?? ""}
          link={`/users/${currentUser?.id ?? ""}`}
        />
        <Stack as="form" spacing="2" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            placeholder="Post your replys!"
            type="textarea"
            register={register("content", {
              required: "必須項目です",
              maxLength: { value: 140, message: "140文字以内で入力してください" },
            })}
            error={errors.content?.message}
          />
          {image?.[0] && (
            <Box position="relative">
              <MainImage src={URL.createObjectURL(image[0])} alt="preview" />
              <IconClose onClick={() => setValue("image", null)} />
            </Box>
          )}

          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <FormInput
                type="file"
                label={<IconInputImage />}
                register={register("image", {
                  validate: {
                    checkFileSize,
                  },
                })}
                error={errors.image?.message}
              />
            </Box>
            <MainButton type="submit" variant="solid" isLoading={isLoading} size="sm" rounded="3xl">
              返信
            </MainButton>
          </Flex>
        </Stack>
      </Flex>
    </Stack>
  );
};
