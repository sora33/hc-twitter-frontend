import { Group } from "features/dm/group/groupTypes";
import { apiClient } from "lib/axios/apiClient";

export const getGroups = async () => {
  try {
    const res = await apiClient.get<Group[]>(`groups`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postGroup = async (userIds: number[]) => {
  try {
    const res = await apiClient.post<Group>("groups", { userIds });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
