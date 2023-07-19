import { Box, Container, VStack } from "@chakra-ui/react";
import { MainButton } from "components/button/MainButton";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <>
      <Box as="main" bg="white">
        <Container>
          <MainButton link="/auth/SignIn">ログイン</MainButton>
          <MainButton link="/auth/SignUp">アカウント新規登録</MainButton>
          <VStack spacing={4} mt="12">
            <Outlet />
          </VStack>
        </Container>
      </Box>
    </>
  );
};
