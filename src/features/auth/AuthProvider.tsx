import { useState } from "react";
import { User } from "features/user/userTypes";
import { AuthContext } from "features/auth/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isSignedIn: false,
    currentUser: undefined as User | undefined,
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>{children}</AuthContext.Provider>
  );
};
