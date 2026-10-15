import { api } from "../../services/api";
import type { User } from "../../store/slices/authSlice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.get<User[]>("/users", { params: data });
  const user = response.data[0];
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return {
    user,
    token: `fake-token-${user.id}`,
  };
}