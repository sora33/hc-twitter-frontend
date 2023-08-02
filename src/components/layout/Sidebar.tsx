import { Stack, Box } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";
import { useLocation } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineVerticalAlignBottom,
  AiOutlineUser,
} from "react-icons/ai";
import { useAuth } from "features/auth/useAuth";

const iconStyle = { marginTop: "-4px" };

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.id;

  const SidebarList = [
    {
      name: "ホーム",
      link: "/home",
      icon: <AiOutlineHome style={iconStyle} />,
    },
    {
      name: "通知",
      link: "/notification",
      icon: <AiOutlineBell style={iconStyle} />,
    },
    {
      name: "メッセージ",
      link: "/message",
      icon: <AiOutlineMail style={iconStyle} />,
    },
    {
      name: "ブックマーク",
      link: "/bookmark",
      icon: <AiOutlineVerticalAlignBottom style={iconStyle} />,
    },
    {
      name: "プロフィール",
      link: `/users/${currentUserId!}`,
      icon: <AiOutlineUser style={iconStyle} />,
    },
  ];

  return (
    <Box as="nav">
      <Stack spacing={4} w="180px" position="sticky" top="14">
        {SidebarList.map((item) => (
          <MainButton
            link={item.link}
            justifyContent="start"
            colorScheme="gray"
            variant={location.pathname === item.link ? "solid" : "ghost"}
            key={item.name}
            leftIcon={item.icon}
          >
            {item.name}
          </MainButton>
        ))}
      </Stack>
    </Box>
  );
};
