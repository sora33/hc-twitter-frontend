import { BrowserRouter } from "react-router-dom";
import { Router } from "pages/Router";

export const App: React.FC = () => {
  return (
    <BrowserRouter basename="/hc_twitter_react_frontend">
      <Router />
    </BrowserRouter>
  );
};
