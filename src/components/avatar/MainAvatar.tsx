import { Avatar, AvatarProps } from "@chakra-ui/react";

type MainAvatarProps = AvatarProps;

export const MainAvatar: React.FC<MainAvatarProps> = (props) => {
  return <Avatar size="sm" {...props} />;
};
