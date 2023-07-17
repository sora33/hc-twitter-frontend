import { Heading, HeadingProps } from "@chakra-ui/react";

type HeadingH1Props = HeadingProps & {
  children: React.ReactNode;
};

export const HeadingH1: React.FC<HeadingH1Props> = ({ children }) => {
  return (
    <>
      <Heading as="h1" size="lg">
        {children}
      </Heading>
    </>
  );
};
