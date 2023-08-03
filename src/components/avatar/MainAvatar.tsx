import { Avatar, AvatarProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
type MainAvatarProps = AvatarProps & {
  link?: string;
};

export const MainAvatar: React.FC<MainAvatarProps> = (props) => {
  const { link } = props;
  if (link) {
    return <Avatar size="sm" as={RouterLink} to={link} {...props} _hover={{ opacity: 0.8 }} />;
  }
  return <Avatar size="sm" {...props} />;
};
