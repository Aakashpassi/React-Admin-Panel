import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import NotFound from "../pages/NotFound";
import { AuthGuard } from "../guards/AuthGuard";
import AppLayout from "../components/layout/AppLayout";
import { PermissionGuard } from "../guards/PermissionGuard";
import { PERMISSIONS } from "../config/permissions";
import RootRedirect from "./RootRedirect";
import GuestGuard from "../guards/GuestGuard";
import { ROUTES } from "../constants/routes";

const Dashboard = lazy(() => import("../features/dashboard/Dashboard"));
const Users = lazy(() => import("../features/users/Users"));
const Reports = lazy(() => import("../features/reports/Reports"));
const Settings = lazy(() => import("../features/settings/Settings"));
const Login = lazy(() => import("../features/auth/Login"));


export const router = createBrowserRouter([

    { path: ROUTES.LOGIN, element: <GuestGuard />, children: [{ index: true, element: <Login /> }] },
    { path: ROUTES.UNAUTHORIZED, element: <Unauthorized /> },
    {
        element: <AuthGuard />, children: [
            { path: ROUTES.HOME, element: <RootRedirect /> },
            {
                element: <AppLayout />,
                children: [
                    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
                    { element: <PermissionGuard requiredPermission={PERMISSIONS.VIEW_USERS} />, children: [{ element: <Users />, path: ROUTES.USERS }] },
                    { element: <PermissionGuard requiredPermission={PERMISSIONS.VIEW_REPORTS} />, children: [{ element: <Reports />, path: ROUTES.REPORTS }] },
                    { element: <PermissionGuard requiredPermission={PERMISSIONS.VIEW_SETTINGS} />, children: [{ element: <Settings />, path: ROUTES.SETTINGS }] }
                ]
            }
        ]
    },

    { path: ROUTES.NOT_FOUND, element: <NotFound /> }
])