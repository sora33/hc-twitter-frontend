import { HeadingH1 } from "components/heading/HeadingH1";
import { SignInForm } from "features/auth/views/SignInForm";

export const SignIn: React.FC = () => {
  return (
    <>
      <HeadingH1>Twiiterにログイン</HeadingH1>
      <SignInForm />
    </>
  );
};
