import { api } from "./api";

export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const loginApi = async (username: string, password: string) => {
  const res = await api.post<AuthResponse>("/auth/login", {
    username,
    password,
  });
  return res.data;
};

export const registerApi = async (username: string, password: string) => {
  const res = await api.post<AuthResponse>("/auth/register", {
    username,
    password,
  });
  return res.data;
};
