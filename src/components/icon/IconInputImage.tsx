import { Icon } from "@chakra-ui/react";
import { AiOutlinePicture } from "react-icons/ai";

export const IconInputImage = () => (
  <Icon
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    as={AiOutlinePicture}
    mt="2"
    w={6}
    h={6}
    color="blue.500"
    cursor="pointer"
  />
);
