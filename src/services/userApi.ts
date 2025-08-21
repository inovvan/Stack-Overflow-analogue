import UserStatistic from "@/types/UserStatistic";
import User from "@/types/User";
import api from "./api";

type usernameEditResponseData = {
  data: {
    id: string;
    username: string;
    role: string;
    password: string;
  };
  message: string;
};

type passwordEditResponseData = {
  data: {
    updatedCount: number;
  };
  message: string;
};

export const getUserStatistic = async (id: string): Promise<UserStatistic> => {
  const response = await api.get<{ data: UserStatistic }>(
    "/users/" + id + "/statistic"
  );
  return response.data.data;
};

export const deleteUser = async (): Promise<void> => {
  await api.delete("/me");
};

export const usernameEdit = async (
  username: string
): Promise<usernameEditResponseData> => {
  const response = await api.patch<usernameEditResponseData>("/me", {
    username: username,
  });
  return response.data;
};

export const passwordEdit = async (
  oldPassword: string,
  newPassword: string
): Promise<passwordEditResponseData> => {
  const response = await api.patch<passwordEditResponseData>("/me/password", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<{
    data: {
      data: User[];
    };
  }>("/users?limit=100");
  return response.data.data.data;
};