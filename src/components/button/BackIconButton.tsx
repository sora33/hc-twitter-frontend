import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const BackIconButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton
        onClick={() => navigate("/home")}
        aria-label="戻る"
        icon={<AiOutlineArrowLeft />}
        size="sm"
        rounded="full"
        variant="ghost"
      />
    </Box>
  );
};
