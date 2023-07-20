import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "features/user/userTypes";

export interface AuthContextData {
  authState: {
    isLoading: boolean;
    isSignedIn: boolean;
    currentUser: User | undefined;
  };
  setAuthState: Dispatch<SetStateAction<AuthContextData["authState"]>>;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);
