import { Stack, Box, useMediaQuery } from "@chakra-ui/react";
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
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");
  console.log(isLargerThanMd, "isLargerThanMd");

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
      <Stack
        spacing={4}
        position={{ base: "fixed", sm: "sticky" }}
        top={{ base: "auto", sm: "14" }}
        bottom={{ base: "0", sm: "auto", md: "0" }}
        pl={{ base: "0", sm: "4" }}
        w={{ base: "100%", sm: "auto", md: "180px" }}
        flexDirection={{ base: "row", sm: "column" }}
        zIndex={1}
        bg={{ base: "white", sm: "transparent" }}
      >
        {SidebarList.map((item) => (
          <MainButton
            link={item.link}
            colorScheme="gray"
            variant={location.pathname === item.link ? "solid" : "ghost"}
            key={item.name}
            leftIcon={item.icon}
            justifyContent={{ base: "center", md: "flex-start" }}
            flex={{ base: "1", sm: "none" }}
            ml={{ base: "0", sm: "auto", md: "0" }}
            py={{ base: "6", sm: "0" }}
          >
            {isLargerThanMd && item.name}
          </MainButton>
        ))}
      </Stack>
    </Box>
  );
};
