import { SignUpParams } from "features/auth/authTypes";
import { apiClient } from "lib/axios/apiClient";

export const signUp = (params: SignUpParams) => {
  const confirmSuccessUrl = `${
    (import.meta.env.VITE_FROMTEND_ENDPOINT as string) || ""
  }/hc_twitter_react_frontend/auth/signIn`;

  return apiClient.post("users", {
    ...params,
    confirmSuccessUrl,
  });
};
