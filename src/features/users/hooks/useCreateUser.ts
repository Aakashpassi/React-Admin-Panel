import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserApi } from "../userApi";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

}