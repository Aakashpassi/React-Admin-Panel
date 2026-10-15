import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserApi } from "../userApi";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:(id: string) => deleteUserApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

}