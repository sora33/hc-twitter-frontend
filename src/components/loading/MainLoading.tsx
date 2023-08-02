import { Flex, Spinner, FlexProps } from "@chakra-ui/react";

export const MainLoading: React.FC<FlexProps> = (props) => {
  return (
    <>
      <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center" {...props}>
        <Spinner />
      </Flex>
    </>
  );
};
