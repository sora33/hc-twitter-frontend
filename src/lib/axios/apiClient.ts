import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

export const apiClient = applyCaseMiddleware(
  axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_ENDPOINT as string}/api/v1`,
  }),
  options
);

// token付与等のリクエスト処理の共通化
apiClient.interceptors.request.use((config) => {
  config.headers["access-token"] = localStorage.getItem("access-token") ?? "";
  config.headers.client = localStorage.getItem("client") ?? "";
  config.headers.uid = localStorage.getItem("uid") ?? "";

  return config;
});

export interface ErrorRes {
  response?: {
    data?: {
      errors?: {
        fullMessages?: string[];
      };
    };
  };
}
