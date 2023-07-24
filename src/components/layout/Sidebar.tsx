import { Stack } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";
import { useLocation } from "react-router-dom";

const SidebarList = [
  { name: "ホーム", link: "/home" },
  { name: "通知", link: "/notification" },
  { name: "メッセージ", link: "/message" },
  { name: "ブックマーク", link: "/bookmark" },
  { name: "プロフィール", link: "/profile" },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Stack as="nav" spacing={4} w="250px" pr="8">
      {SidebarList.map((item) => (
        <MainButton
          link={item.link}
          justifyContent="start"
          colorScheme="gray"
          variant={location.pathname === item.link ? "solid" : "ghost"}
          key={item.name}
        >
          {item.name}
        </MainButton>
      ))}
    </Stack>
  );
};
