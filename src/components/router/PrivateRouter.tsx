import { MainLoading } from "components/loading/MainLoading";
import { Navigate } from "react-router-dom";
import { useAuth } from "features/auth/useAuth";
interface PrivateRouterProps {
  children: React.ReactElement;
  condition: boolean;
}

export const PrivateRouter: React.FC<PrivateRouterProps> = ({
  children,
  condition,
}) => {
  const { isLoading } = useAuth();

  if (!isLoading) {
    if (condition) {
      return children;
    } else {
      return <Navigate to="/auth/signIn" replace />;
    }
  } else {
    return <MainLoading />;
  }
};
