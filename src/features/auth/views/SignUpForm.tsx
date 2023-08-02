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
    watch,
    formState: { errors },
  } = useForm<SignUpParams>();

  const onSubmit: SubmitHandler<SignUpParams> = async (form) => {
    try {
      setIsLoading(true);
      await signUp(form);
      toastMessage({
        title: "アカウントの仮登録ができました",
        description: "確認メールを送信していますので、そちらでアカウント本登録をお願いします。",
        duration: 9000,
      });
      navigate("/auth/signIn");
    } catch (error) {
      const errorMessage = String(error);
      toastMessage({
        title: `${errorMessage}`,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordWatch = watch("password");

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
        type="password"
        label="パスワード"
        register={register("password", {
          required: "必須項目です",
          minLength: { value: 6, message: "6文字以上で入力してください" },
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/,
            message: "英数字を混ぜてください",
          },
        })}
        error={errors.password?.message}
      />
      <FormInput
        type="password"
        label="パスワード（確認）"
        register={register("passwordConfirmation", {
          required: "必須項目です",
          validate: (value) => value === passwordWatch || "パスワードが一致していません",
        })}
        error={errors.passwordConfirmation?.message}
      />
      <MainButton type="submit" variant="solid" isLoading={isLoading}>
        登録
      </MainButton>
    </Stack>
  );
};
