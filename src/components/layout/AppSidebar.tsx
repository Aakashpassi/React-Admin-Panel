import { useMemo } from "react";
import {
    NavLink,
    useLocation,
} from "react-router-dom";
import NProgress from "nprogress";
import {
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

import { navigation } from "../../config/navigation";
import { usePermissions } from "../../hooks/usePermissions";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

import { Separator } from "../ui/separator";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../ui/avatar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "../ui/collapsible";

export interface SingleNav {
    title: string;
    icon: LucideIcon;
    path: string;
    permission?: string;
    children?: SingleNav[];
}

interface NavItemProps {
    item: SingleNav;
}

const normalizePath = (path: string) =>
    path.replace(/\/+$/, "") || "/";

function NavItem({ item }: NavItemProps) {
    const location = useLocation();
    const Icon = item.icon;

    const currentPath = normalizePath(location.pathname);
    const itemPath = normalizePath(item.path);

    const hasChildren = Boolean(item.children?.length);

    const isParentActive =
        currentPath === itemPath ||
        currentPath.startsWith(`${itemPath}/`);

    if (hasChildren) {
        return (
            <Collapsible
                key={item.path}
                defaultOpen={isParentActive}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger >
                        <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isParentActive}
                        >
                            <Icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarGroupContent>
                            <SidebarMenu className="ml-[7px]">
                                {item.children!.map((child) => (
                                    <NavItem key={child.path} item={child} />
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        );
    }

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                render={
                    <NavLink
                        to={item.path}
                        end={item.path === "/"}
                        onClick={() => {
                            if (normalizePath(location.pathname) !== itemPath) {
                                NProgress.start();
                            }
                        }
                        }
                    />
                }
                tooltip={item.title}
                isActive={isParentActive}
            >
                <Icon />
                <span>{item.title}</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

export const AppSidebar = (
    props: React.ComponentProps<typeof Sidebar>
) => {
    const { hasPermission, permissions } = usePermissions();

    const allowedNavigation = useMemo(() => {
        return navigation.filter(
            (item) =>
                !item.permission || hasPermission(item.permission)
        );
    }, [hasPermission, permissions]);

    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="Aakash"
                                />
                                <AvatarFallback className="rounded-lg">
                                    AK
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    My Account
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    aakashkkg789@gmail.com
                                </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <Separator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {allowedNavigation.map((item) => (
                                <NavItem key={item.path} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
