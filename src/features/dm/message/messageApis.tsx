import { Message } from "features/dm/message/messageTypes";
import { apiClient } from "lib/axios/apiClient";

export const getMessages = async (id: string) => {
  try {
    const res = await apiClient.get<Message[]>(`groups/${id}/messages`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postMessage = async (content: string, id: string) => {
  try {
    const res = await apiClient.post<Message>(`groups/${id}/messages`, { content });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
