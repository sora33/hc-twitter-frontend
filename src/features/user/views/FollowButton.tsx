import { useState } from "react";
import { MainButton } from "components/button/MainButton";
import { postFollow, deleteFollow } from "features/user/relationship/relationshipApis";
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
      toastMessage({ title: "フォローしました", duration: 1000 });
      setIsFollowing((prev) => !prev);
    } catch (error) {
      toastMessage({ title: "フォローに失敗しました", status: "error" });
    }
    setIsLoading(false);
  };
  const hundleUnfollow = async () => {
    setIsLoading(true);
    try {
      await deleteFollow(user.id);
      toastMessage({ title: "フォローを解除しました", duration: 1000 });
      setIsFollowing((prev) => !prev);
    } catch (error) {
      toastMessage({ title: "フォロー解除に失敗しました", status: "error" });
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
          onClick={hundleUnfollow}
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
