import { api } from "../../services/api";
import type { User } from "../../store/slices/authSlice";

export interface GetUserParams {
    page: number;
    limit: number;
    search?: string;
}

export interface UsersResponse {
    items: User[];
    total: number;
    page: number;
    limit: number;
}

export const getUsersApi = async (params: GetUserParams): Promise<UsersResponse> => {
    const reponse = await api.get<User[]>("/users");
    let users = reponse.data;

    if (params.search) {
        const searchLower = params.search.toLowerCase();
        users = users.filter(user => user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower));
    }

    const total = users.length;
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const items = users.slice(start, end);
    return {
        items,
        total,
        page: params.page,
        limit: params.limit
    };
}


export const createUserApi = async (user: Omit<User, "id">): Promise<User> => {
    const response = await api.post<User>("/users", user);
    return response.data;
}

export const updateUserApi = async (id: string, user: Partial<User>): Promise<User> => {
    const response = await api.patch<User>(`/users/${id}`, user);
    return response.data;
}

export const deleteUserApi = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
}