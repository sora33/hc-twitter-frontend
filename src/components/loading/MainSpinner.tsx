import { Flex, Spinner, FlexProps } from "@chakra-ui/react";

type MainSpinnerProps = FlexProps & {
  variant?: "normal" | "allView";
};

export const MainSpinner: React.FC<MainSpinnerProps> = ({ variant = "normal", ...props }) => {
  if (variant === "allView") {
    return (
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
        color="blue.500"
        {...props}
      >
        <Spinner />
      </Flex>
    );
  } else if (variant === "normal") {
    return (
      <Flex w="100%" py="4" alignItems="center" justifyContent="center" color="blue.500" {...props}>
        <Spinner />
      </Flex>
    );
  }
};
