import { Container, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "components/layout/Header";

export const AuthLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <VStack as="main" spacing={4} mt="12">
          <Outlet />
        </VStack>
      </Container>
    </>
  );
};
