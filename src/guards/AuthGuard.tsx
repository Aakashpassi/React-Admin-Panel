import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../features/auth/AuthContext';
import { useAppSelector } from "../hooks/reduxHooks";
import { ROUTES } from '../constants/routes';

export const AuthGuard = () => {
    // const { user, loading } = useAuth();
    const location = useLocation();
    const {isAuthenticated} = useAppSelector((state) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />;
    }

    return <Outlet />;
}