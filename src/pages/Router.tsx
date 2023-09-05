import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthLayout } from "pages/auth/AuthLayout";
import { Layout } from "pages/Layout";
import { useAuth } from "features/auth/useAuth";
import { PrivateRouter } from "components/router/PrivateRouter";
import { Page404 } from "pages/Page404";

import { SignUp } from "pages/auth/SignUp";
import { SignIn } from "pages/auth/SignIn";
import { Home } from "pages/Home";
import { TweetShow } from "pages/tweets/TweetShow";
import { UserShow } from "pages/users/UserShow";
import { NotificationShow } from "pages/notification/NotificationShow";
import { GroupShow } from "pages/groups/GroupShow";
import { MessageShow } from "pages/messages/MessageShow";

export const Router: React.FC = () => {
  const { handleGetCurrentUser, isSignedIn } = useAuth();
  useEffect(() => {
    void handleGetCurrentUser();
  }, [handleGetCurrentUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
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
          <Route path="tweets/:id" element={<TweetShow />} />
          <Route path="users/:id" element={<UserShow />} />
          <Route path="notification" element={<NotificationShow />} />
          <Route path="messages" element={<GroupShow />} />
          <Route path="messages/:id" element={<MessageShow />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
};
