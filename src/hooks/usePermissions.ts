import { useCallback, useMemo } from 'react';
import { useAppSelector } from "./reduxHooks";
// import { useAuth } from '../features/auth/AuthContext';

export const usePermissions = () => {
    // const { user } = useAuth();
    const permissions = useAppSelector(
        (state) => state.auth.user?.permissions ?? []
    );
    const permissionSet = useMemo(
        () => new Set(permissions),
        [permissions]
    );
    const hasPermission = useCallback(
        (permission: string) => {
            return permissionSet.has(permission);
        },
        [permissionSet]
    );

    return { hasPermission, permissions };

}