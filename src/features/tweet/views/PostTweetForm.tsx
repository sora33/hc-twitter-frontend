import { Stack, Flex, Icon, Image, Box } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TweetParams } from "features/tweet/tweetApis";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useState, useEffect, useContext } from "react";
import { postTweet } from "features/tweet/tweetApis";
import { AiOutlinePicture, AiFillCloseCircle } from "react-icons/ai";
import { MainAvatar } from "components/avatar/MainAvatar";
import { TweetContext } from "pages/Home";
import { useAuth } from "features/auth/useAuth";
import { checkFileSize } from "lib/functions/checkFileSize";

export const PostTweetForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { setRefreshTweets } = useContext(TweetContext);
  const { currentUser } = useAuth();

  const { toastMessage } = useToastMessage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TweetParams>();

  const { image } = watch();
  useEffect(() => {
    if (image && image[0]) {
      setPreviewUrl(URL.createObjectURL(image[0]));
    } else {
      setPreviewUrl(null);
    }
  }, [image]);

  const onRemoveImage = () => {
    setValue("image", null);
    setPreviewUrl(null);
  };

  const onSubmit: SubmitHandler<TweetParams> = async (form) => {
    try {
      setIsLoading(true);
      await postTweet(form);
      toastMessage({ title: "ツイートできました" });
      reset();
      setRefreshTweets(true);
    } catch (error) {
      toastMessage({ title: `ツイートに失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex pb="2" borderBottom="1px solid" borderColor="gray.200">
      <MainAvatar
        mr="4"
        src={currentUser?.avatarImage ?? ""}
        link={`/users/${currentUser?.id ?? ""}`}
      />
      <Stack as="form" spacing="2" w="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder="今どうしてる？"
          type="textarea"
          register={register("content", {
            required: "必須項目です",
            maxLength: { value: 140, message: "140文字以内で入力してください" },
          })}
          error={errors.content?.message}
        />
        {previewUrl && (
          <Box position="relative">
            <Image
              src={previewUrl}
              alt="preview"
              h="300px"
              w="100%"
              rounded="2xl"
              objectFit="cover"
            />
            <Icon
              onClick={onRemoveImage}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              as={AiFillCloseCircle}
              cursor="pointer"
              position="absolute"
              top="-1rem"
              right="-1rem"
              w="8"
              h="8"
            />
          </Box>
        )}

        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <FormInput
              type="file"
              label={
                <Icon
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  as={AiOutlinePicture}
                  mt="2"
                  w={6}
                  h={6}
                  color="blue.500"
                  cursor="pointer"
                />
              }
              register={register("image", {
                validate: {
                  checkFileSize,
                },
              })}
              error={errors.image?.message}
            />
          </Box>
          <MainButton type="submit" variant="solid" isLoading={isLoading} size="sm" rounded="3xl">
            ツイートする
          </MainButton>
        </Flex>
      </Stack>
    </Flex>
  );
};