import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../userApi";
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({id, user}:{id: string, user: Parameters<typeof updateUserApi>[1]}) => updateUserApi(id, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

}