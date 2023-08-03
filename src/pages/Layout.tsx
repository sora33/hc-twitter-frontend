import { Box, Container, VStack, Stack, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Header } from "components/layout/Header";
import { Sidebar } from "components/layout/Sidebar";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxW="container.md" px={{ base: "0", sm: "auto" }}>
        <Flex mt="4">
          <Sidebar />
          <Stack
            as="main"
            mx={{ base: "", sm: "4" }}
            spacing={4}
            flex="1"
            px="4"
            borderX="1px solid"
            borderColor="gray.200"
          >
            <Outlet />
          </Stack>
        </Flex>
      </Container>
    </>
  );
};
