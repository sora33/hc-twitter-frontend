import { Flex, Spinner, FlexProps } from "@chakra-ui/react";

export const MainLoading: React.FC<FlexProps> = (props) => {
  return (
    <>
      <Flex
        w="100vw"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        bg="rgba(0, 0, 0, 0.1)"
        left="0"
        zIndex="1000"
        {...props}
      >
        <Spinner />
      </Flex>
    </>
  );
};
