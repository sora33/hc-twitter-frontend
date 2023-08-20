import { useState } from "react";
import { MainButton } from "components/button/MainButton";
import { postFollow } from "features/user/relationship/relationshipApis";
import { useToastMessage } from "hooks/useToastMessage";
import { UserBase } from "features/user/userTypes";

type FollowButtonProps = {
  user: UserBase;
};
export const FollowButton: React.FC<FollowButtonProps> = ({ user }) => {
  const { toastMessage } = useToastMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing ?? false);

  const hundleFollow = async () => {
    setIsLoading(true);
    try {
      await postFollow(user.id);
      toastMessage({ title: "フォローしました" });
      setIsFollowing(true);
    } catch (error) {
      toastMessage({ title: "フォローに失敗しました", status: "error" });
    }
    setIsLoading(false);
  };

  const commonButtonProps = {
    size: "sm",
    minW: "150px",
    rounded: "3xl",
    isLoading: isLoading,
  };

  return (
    <>
      {isFollowing ? (
        <MainButton
          {...commonButtonProps}
          variant="outline"
          colorScheme={isHovered ? "red" : "gray"}
          onClick={() => alert("フォロー解除メソッドを実装予定")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? "フォロー解除" : "フォロー中"}
        </MainButton>
      ) : (
        <MainButton
          {...commonButtonProps}
          variant="solid"
          colorScheme="gray"
          onClick={hundleFollow}
        >
          フォローする
        </MainButton>
      )}
    </>
  );
};
