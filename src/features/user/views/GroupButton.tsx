import { MainButton } from "components/button/MainButton";
import { postGroup } from "features/dm/group/groupApis";
import { UserBase } from "features/user/userTypes";
import { useNavigate } from "react-router-dom";

type GroupButtonProps = {
  user: UserBase;
};
export const GroupButton: React.FC<GroupButtonProps> = ({ user }) => {
  const navigate = useNavigate();

  const hundleGroup = async () => {
    try {
      const res = await postGroup([user.id]);
      console.log(res);
      navigate(`/messages/${res.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainButton
        size="sm"
        variant="solid"
        rounded="3xl"
        colorScheme="blackAlpha"
        onClick={hundleGroup}
      >
        DM
      </MainButton>
    </>
  );
};
