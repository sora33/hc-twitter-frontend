import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "pages/auth/AuthLayout";
import { Layout } from "pages/Layout";
import { useAuth } from "features/auth/useAuth";
import { SignUp } from "pages/auth/SignUp";
import { SignIn } from "pages/auth/SignIn";
import { Home } from "pages/Home";
import { PrivateRouter } from "components/router/PrivateRouter";

export const Router: React.FC = () => {
  const { handleGetCurrentUser, isSignedIn } = useAuth();
  useEffect(() => {
    void handleGetCurrentUser();
  }, [handleGetCurrentUser]);

  return (
    <>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>

        <Route
          element={
            <PrivateRouter condition={isSignedIn}>
              <Layout />
            </PrivateRouter>
          }
        >
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};
