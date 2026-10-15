import { File, LayoutDashboardIcon, Settings, UserCircle } from "lucide-react";
import { LABELS } from "../constants/lables";
import { ROUTES } from "../constants/routes";
import { PERMISSIONS } from "./permissions";
import type { SingleNav } from "@/components/layout/AppSidebar";

export const navigation:SingleNav[] = [
  {
    title: LABELS.DASHBOARD,
    path: ROUTES.DASHBOARD,
    permission: PERMISSIONS.VIEW_DASHBOARD,
    icon: LayoutDashboardIcon, // Assuming you have an icon for the dashboard
  },

  {
    title: LABELS.USERS,
    path: ROUTES.USERS,
    permission: PERMISSIONS.VIEW_USERS,
    icon: UserCircle,
  },

  {
    title: LABELS.REPORTS,
    path: ROUTES.REPORTS,
    permission: PERMISSIONS.VIEW_REPORTS,
    icon: File, // Replace with an appropriate icon for reports
  },

  {
    title: LABELS.SETTINGS,
    path: ROUTES.SETTINGS,
    permission: PERMISSIONS.VIEW_SETTINGS,
    icon: Settings, // Replace with an appropriate icon for settings
  },
];