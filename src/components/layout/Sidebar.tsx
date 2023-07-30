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

const iconStyle = { marginTop: "-4px" };

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
    link: "/profile",
    icon: <AiOutlineUser style={iconStyle} />,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

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
