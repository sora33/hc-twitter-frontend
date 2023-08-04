import { Image, ImageProps } from "@chakra-ui/react";

export const MainImage: React.FC<ImageProps> = (props) => (
  <Image src="" h="300px" w="100%" rounded="2xl" objectFit="cover" {...props} />
);
