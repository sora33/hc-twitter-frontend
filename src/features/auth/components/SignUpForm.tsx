import { Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignUpParams } from "features/auth/authTypes";
import { signUp } from "features/auth/authApis";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpParams>();

  const onSubmit: SubmitHandler<SignUpParams> = async (form) => {
    try {
      setIsLoading(true);
      await signUp(form);
      toastMessage({ title: "アカウントを作成しました", status: "success" });
      navigate("/auth/signIn");
    } catch (error) {
      toastMessage({
        title: "アカウントの作成に失敗しました",
        status: "error",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack as="form" spacing="4" w="100%" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="名前"
        register={register("name", { required: "必須項目です" })}
        error={errors.name?.message}
      />
      <FormInput
        label="メールアドレス"
        register={register("email", {
          required: "必須項目です",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "無効なメールアドレスです",
          },
        })}
        error={errors.email?.message}
      />
      <FormInput
        label="パスワード"
        register={register("password", { required: "必須項目です" })}
        error={errors.password?.message}
      />
      <FormInput
        label="パスワード（確認）"
        register={register("passwordConfirmation", {
          required: "必須項目です",
        })}
        error={errors.passwordConfirmation?.message}
      />
      <MainButton type="submit" variant="solid" isLoading={isLoading}>
        登録
      </MainButton>
    </Stack>
  );
};
