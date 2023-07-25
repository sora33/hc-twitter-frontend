import { Container, Box, Flex } from "@chakra-ui/react";
import { SignOutButton } from "features/auth/views/SignOutButton";
import { useAuth } from "features/auth/useAuth";
import { MainButton } from "components/button/MainButton";

export const Header: React.FC = () => {
  const { isSignedIn } = useAuth();
  return (
    <Container maxW="container.md">
      <Flex as="header" justifyContent="space-between" alignItems="center">
        <MainButton link="/" fontSize="2xl">
          Twitter Clone
        </MainButton>

        {isSignedIn ? (
          <SignOutButton />
        ) : (
          <Box>
            <MainButton link="/auth/SignIn">ログイン</MainButton>
            <MainButton link="/auth/SignUp">アカウント新規登録</MainButton>
          </Box>
        )}
      </Flex>
    </Container>
  );
};
