import { Stack, Flex, Box } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TweetParams } from "features/tweet/tweetApis";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useState, useContext } from "react";
import { postTweet } from "features/tweet/tweetApis";
import { MainAvatar } from "components/avatar/MainAvatar";
import { TweetContext } from "pages/Home";
import { useAuth } from "features/auth/useAuth";
import { checkFileSize } from "lib/functions/checkFileSize";
import { MainImage } from "components/image/MainImage";
import { IconClose } from "components/icon/IconClose";
import { IconInputImage } from "components/icon/IconInputImage";

export const PostTweetForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setRefreshTweets } = useContext(TweetContext);
  const { currentUser } = useAuth();
  console.log(currentUser, "currentUser");

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
            ツイートする
          </MainButton>
        </Flex>
      </Stack>
    </Flex>
  );
};
