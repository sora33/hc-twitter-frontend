import { HeadingH1 } from "components/heading/HeadingH1";
import { SignUpForm } from "features/auth/views/SignUpForm";
export const SignUp: React.FC = () => {
  return (
    <>
      <HeadingH1>アカウント新規登録</HeadingH1>
      <SignUpForm />
    </>
  );
};
