import api from "./api";
import User from "@/types/User";

export const authCheck = async (): Promise<User> => {
  const response = await api.get<{ data: User }>("/auth");
  return response.data.data;
};

export const logIn = async (username: string, password: string): Promise<User> => {
  const response = await api.post<{ data: User }>("/auth/login", {username: username, password: password});
  return response.data.data;
};

export const logOut = async (): Promise<void> => {
  await api.post("/auth/logout");
};
