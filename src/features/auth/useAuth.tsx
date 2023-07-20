import { useContext, useCallback } from "react";
import { AuthContext } from "features/auth/AuthContext";
import { getCurrentUser } from "features/auth/authApis";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { authState, setAuthState } = context;

  const handleGetCurrentUser = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      setAuthState((prevState) => ({
        ...prevState,
        isSignedIn: true,
        currentUser: res.data,
      }));
    } catch (err) {
      console.log(err);
      setAuthState((prevState) => ({
        ...prevState,
        isSignedIn: false,
        currentUser: undefined,
      }));
    }
    setAuthState((prevState) => ({
      ...prevState,
      isLoading: false,
    }));
  }, [setAuthState]);

  return {
    ...authState,
    handleGetCurrentUser,
  };
};
