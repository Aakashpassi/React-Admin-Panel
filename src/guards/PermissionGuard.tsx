import { Navigate, Outlet } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { ROUTES } from '../constants/routes';

export const PermissionGuard = ({ requiredPermission }: { requiredPermission: string }) => {
    const { hasPermission } = usePermissions();

    if (!hasPermission(requiredPermission)) {
        return <Navigate to={ROUTES.UNAUTHORIZED} replace />;

    }
    return <Outlet />;
}