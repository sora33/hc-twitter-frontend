import { User } from "features/user/userTypes";
import { apiClient } from "lib/axios/apiClient";

export const getUser = async (id: number) => {
  try {
    const res = await apiClient.get<User>(`users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export type PutProfileParams = Pick<
  User,
  "name" | "description" | "place" | "website" | "birthday" | "avatarImage" | "headerImage"
> & {
  avatarImage: FileList | null;
  headerImage: FileList | null;
};

export const putProfile = async (params: PutProfileParams) => {
  const formData = new FormData();
  console.log(params);

  formData.append("name", params.name);
  console.log(params);
  formData.append("description", params.description || "");
  formData.append("place", params.place || "");
  formData.append("website", params.website || "");
  formData.append("birthday", params.birthday || "");

  if (params.headerImage && params.headerImage.length > 0) {
    formData.append("headerImage", params.headerImage[0], params.headerImage[0].name);
  }

  if (params.avatarImage && params.avatarImage.length > 0) {
    formData.append("avatarImage", params.avatarImage[0], params.avatarImage[0].name);
  }

  try {
    const res = await apiClient.put<User>("profile", formData);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
