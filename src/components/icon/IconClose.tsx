import { Icon, IconProps } from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";

export const IconClose: React.FC<IconProps> = (props) => (
  <Icon
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    as={AiFillCloseCircle}
    cursor="pointer"
    position="absolute"
    top="-1rem"
    right="-1rem"
    w="8"
    h="8"
    {...props}
  />
);
