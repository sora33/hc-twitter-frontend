import { Box, Container, VStack, Stack, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "components/layout/Header";
import { Sidebar } from "components/layout/Sidebar";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxW="container.md">
        <Flex mt="12">
          <Sidebar />
          <VStack as="main" spacing={4} flex="1">
            <Outlet />
          </VStack>
        </Flex>
      </Container>
    </>
  );
};
