import { BrowserRouter } from "react-router-dom";
import { Router } from "pages/Router";
import { AuthProvider } from "features/auth/AuthProvider";

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="/hc_twitter_react_frontend">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};
