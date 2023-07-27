import { Flex, Spinner, FlexProps } from "@chakra-ui/react";

export const MainSpinner: React.FC<FlexProps> = (props) => {
  return (
    <>
      <Flex w="100%" alignItems="center" justifyContent="center" {...props}>
        <Spinner />
      </Flex>
    </>
  );
};
