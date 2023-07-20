import { Stack } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignInParams } from "features/auth/authTypes";
import { signIn } from "features/auth/authApis";
import { MainButton } from "components/button/MainButton";
import { FormInput } from "components/form/FormInput";
import { useToastMessage } from "hooks/useToastMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "features/auth/useAuth";

export const SignInForm: React.FC = () => {
  const { handleGetCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({
    defaultValues: { email: "shuuuya0616@gmail.com", password: "asdf4535" },
  });

  const onSubmit: SubmitHandler<SignInParams> = async (form) => {
    try {
      setIsLoading(true);
      await signIn(form);
      await handleGetCurrentUser();
      toastMessage({ title: "ログインできました" });
      navigate("/home");
    } catch (error) {
      toastMessage({ title: `ログインに失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack as="form" spacing="4" w="100%" onSubmit={handleSubmit(onSubmit)}>
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
            value:
              /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/,
            message: "英数字を混ぜてください",
          },
        })}
        error={errors.password?.message}
      />

      <MainButton type="submit" variant="solid" isLoading={isLoading}>
        ログイン
      </MainButton>
    </Stack>
  );
};
