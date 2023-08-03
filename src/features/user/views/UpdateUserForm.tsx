import { Stack, Flex, Image, Box } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useState } from "react";
import { checkFileSize } from "lib/functions/checkFileSize";
import { User } from "features/user/userTypes";
import { putProfile, PutProfileParams } from "features/user/userApis";
import { MainAvatar } from "components/avatar/MainAvatar";
import { formatDate } from "lib/functions/formatDate";
type UpdateUserFormProps = {
  user: Omit<User, "tweets">;
  onClose: () => void;
};

export const UpdateUserForm: React.FC<UpdateUserFormProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PutProfileParams>({
    defaultValues: {
      name: props.user.name,
      description: props.user.description,
      place: props.user.place,
      website: props.user.website,
      birthday: formatDate(props.user.birthday, "yyyy-mm-dd"),
    },
  });

  const { headerImage, avatarImage } = watch();
  const onSubmit: SubmitHandler<PutProfileParams> = async (form) => {
    try {
      setIsLoading(true);
      await putProfile(form);
      toastMessage({ title: "プロフィールを更新しました" });
      reset();
      props.onClose();
    } catch (error) {
      toastMessage({
        title: `プロフィールの更新に失敗しました`,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex pb="2">
      <Stack as="form" spacing="2" w="100%" onSubmit={handleSubmit(onSubmit)} position="relative">
        <FormInput
          type="file"
          label={
            <Image
              src={
                headerImage && headerImage[0]
                  ? URL.createObjectURL(headerImage[0])
                  : props.user.headerImage ||
                    "https://images.unsplash.com/photo-1523805009345-7448845a9e53"
              }
              h="160px"
              w="100%"
              objectFit="cover"
              _hover={{
                opacity: 0.9,
                cursor: "pointer",
                border: "2px solid blue",
              }}
            />
          }
          register={register("headerImage", { validate: { checkFileSize } })}
          error={errors.headerImage?.message}
        />

        <Box position="absolute" top="28" left="4">
          <FormInput
            type="file"
            label={
              <MainAvatar
                size="xl"
                src={
                  avatarImage && avatarImage[0]
                    ? URL.createObjectURL(avatarImage[0])
                    : props.user.avatarImage || ""
                }
                border={"4px solid white"}
                _hover={{
                  opacity: 0.9,
                  cursor: "pointer",
                  borderColor: "blue",
                }}
              />
            }
            register={register("avatarImage", { validate: { checkFileSize } })}
            error={errors.avatarImage?.message}
          />
        </Box>
        <MainButton
          type="submit"
          variant="solid"
          isLoading={isLoading}
          size="sm"
          w="80px"
          ml="auto"
          rounded="3xl"
        >
          保存
        </MainButton>

        <FormInput
          label="名前"
          register={register("name", { required: "必須項目です" })}
          error={errors.name?.message}
        />
        <FormInput
          label="自己紹介"
          type="textarea"
          register={register("description", {
            maxLength: { value: 160, message: "160文字以内で入力してください" },
          })}
          error={errors.description?.message}
        />
        <FormInput label="場所" register={register("place")} error={errors.place?.message} />
        <FormInput
          label="ウェブサイト"
          register={register("website", {
            pattern: {
              value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              message: "有効なウェブサイトURLを入力してください",
            },
          })}
          error={errors.website?.message}
        />

        <FormInput
          type="date"
          label="生年月日"
          register={register("birthday")}
          error={errors.birthday?.message}
        />
      </Stack>
    </Flex>
  );
};
