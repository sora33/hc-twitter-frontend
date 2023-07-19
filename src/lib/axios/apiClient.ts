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

export interface ErrorRes {
  response?: {
    data?: {
      errors?: {
        fullMessages?: string[];
      };
    };
  };
}
