import { Box, Container, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SignOutButton } from "features/auth/views/SignOutButton";
import { useAuth } from "features/auth/useAuth";

export const Layout: React.FC = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <Box as="main" bg="white">
        <Container>
          <SignOutButton />
          <p>{currentUser?.name}さん、ようこそ</p>
          <VStack spacing={4} mt="12">
            <Outlet />
          </VStack>
        </Container>
      </Box>
    </>
  );
};
