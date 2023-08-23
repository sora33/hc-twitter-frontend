import { apiClient } from "lib/axios/apiClient";
import { Notification } from "features/notification/notificationTypes";

export const getNotifications = async () => {
  try {
    const res = await apiClient.get<Notification[]>(`notifications`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
