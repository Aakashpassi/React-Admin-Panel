import { Navigate } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";
import { navigation } from "../config/navigation";
import { ROUTES } from "../constants/routes";

export default function RootRedirect() {

    const { hasPermission } = usePermissions();
    const firstAllowedPage = navigation.find(
        (item) =>
            !item.permission || hasPermission(item.permission)
    );

    if (!firstAllowedPage) {
        return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
    }
    
    return <Navigate to={firstAllowedPage.path} replace />;
}