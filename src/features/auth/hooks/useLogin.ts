import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../authApi";

export function useLogin() {
    return useMutation({
        mutationFn:loginApi,
    })
}