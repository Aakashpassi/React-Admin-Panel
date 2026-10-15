import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../store/slices/authSlice";
import { ROUTES } from "../../constants/routes";
import { Button } from "../ui/button";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export default function Header() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);

    function handleLogout() {
        dispatch(logout());

        navigate(ROUTES.LOGIN, {
            replace: true,
        });
    }

    return (
        <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">
                  {user?.name}  
                </h1>
                <div className="ml-auto flex items-center gap-2">
                    <ThemeSwitcher />
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}