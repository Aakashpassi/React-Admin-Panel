import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { ROUTES } from "../constants/routes";
// import { useAuth } from "../features/auth/AuthContext";

export default function GuestGuard() {
  // const { user, loading } = useAuth();
  const {isAuthenticated} = useAppSelector((state) => state.auth);

  // if (loading) {
  //   return <div>Checking authentication...</div>;
  // }

  // Already logged in
  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  // Not logged in
  return <Outlet />;
}