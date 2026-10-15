import { useQuery } from "@tanstack/react-query";
import { getUsersApi, type GetUserParams, type UsersResponse } from "../userApi";

export const useUsers = (params: GetUserParams) => {
    return useQuery<UsersResponse>({
        queryKey: ["users", params],
        queryFn: () => getUsersApi(params),
        placeholderData: (prevData) => prevData
    })
}