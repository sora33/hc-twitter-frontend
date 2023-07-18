import { SignUpParams } from "features/auth/authTypes";
import { apiClient } from "lib/axios/apiClient";
import { ErrorRes } from "lib/axios/apiClient";

export const signUp = async (params: SignUpParams) => {
  const confirmSuccessUrl = `${
    (import.meta.env.VITE_FROMTEND_ENDPOINT as string) || ""
  }/hc_twitter_react_frontend/auth/signIn`;

  try {
    const res = await apiClient.post("users", {
      ...params,
      confirmSuccessUrl,
    });
    return res;
  } catch (error) {
    console.log(error);
    const errorMessage =
      (error as ErrorRes)?.response?.data?.errors?.fullMessages?.[0] ||
      "エラーが発生しました";
    throw errorMessage;
  }
};
