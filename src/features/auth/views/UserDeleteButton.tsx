import { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";
import { deleteCurrentUser } from "features/auth/authApis";
import { ChildrenModal } from "components/modal/ChildrenModal";
import { useToastMessage } from "hooks/useToastMessage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "features/auth/useAuth";

export const UserDeleteButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { toastMessage } = useToastMessage();
  const { handleGetCurrentUser } = useAuth();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await deleteCurrentUser();
      await handleGetCurrentUser();
      toastMessage({ title: "アカウント削除しました。" });
      navigate("/auth/signIn");
    } catch (error) {
      toastMessage({ title: `アカウント削除に失敗しました`, status: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <MainButton colorScheme="red" onClick={onOpen} display={{ base: "none", sm: "inherit" }}>
        アカウント削除
      </MainButton>
      <ChildrenModal
        isOpen={isOpen}
        onClose={onClose}
        title="本当にアカウントを削除しますか？"
        size="sm"
      >
        <Flex justifyContent="flex-end">
          <MainButton onClick={onClose} colorScheme="gray" variant="solid" mr="4">
            キャンセル
          </MainButton>
          <MainButton onClick={handleClick} colorScheme="red" variant="solid" isLoading={isLoading}>
            削除
          </MainButton>
        </Flex>
      </ChildrenModal>
    </>
  );
};
