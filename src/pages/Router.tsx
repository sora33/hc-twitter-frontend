import { Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout } from "pages/auth/AuthLayout";
import { SignUp } from "pages/auth/SignUp";
import { SignIn } from "pages/auth/SignIn";

export const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
};
