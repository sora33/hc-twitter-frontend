import { SignUpParams, SignInParams } from "features/auth/authTypes";
import { apiClient } from "lib/axios/apiClient";
import { ErrorRes } from "lib/axios/apiClient";
import { User } from "features/user/userTypes";

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
      (error as ErrorRes)?.response?.data?.errors?.fullMessages?.[0] || "エラーが発生しました";
    throw errorMessage;
  }
};

export const signIn = async (params: SignInParams) => {
  try {
    const res = await apiClient.post("users/sign_in", params);
    if (
      typeof res.headers["access-token"] !== "string" ||
      typeof res.headers["client"] !== "string" ||
      typeof res.headers["uid"] !== "string"
    ) {
      throw new Error("ヘッダー情報が正しくありません");
    }
    localStorage.setItem("access-token", res.headers["access-token"]);
    localStorage.setItem("client", res.headers["client"]);
    localStorage.setItem("uid", res.headers["uid"]);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const res = await apiClient.delete("users/sign_out");
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<{ data: User }> => {
  if (
    !localStorage.getItem("access-token") ||
    !localStorage.getItem("client") ||
    !localStorage.getItem("uid")
  ) {
    throw new Error("認証情報がありません");
  }
  const res = await apiClient.get<{ data: User }>("/users/validate_token");
  // console.log("access-token", localStorage.getItem("access-token"));
  // console.log("client", localStorage.getItem("client"));
  // console.log("uid", localStorage.getItem("uid"));
  return res.data;
};

export const deleteCurrentUser = async () => {
  try {
    const res = await apiClient.delete("users");
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
