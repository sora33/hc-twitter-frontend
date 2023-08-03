import { MainButton } from "components/button/MainButton";
import { useToastMessage } from "hooks/useToastMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "features/auth/authApis";
import { useAuth } from "features/auth/useAuth";

export const SignOutButton: React.FC = () => {
  const { handleGetCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage } = useToastMessage();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await signOut();
      await handleGetCurrentUser();
      toastMessage({ title: "ログアウトしました。" });
      navigate("/auth/signIn");
    } catch (error) {
      toastMessage({ title: `ログアウトに失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainButton isLoading={isLoading} onClick={handleClick} colorScheme="gray" fontSize="sm">
      ログアウト
    </MainButton>
  );
};
