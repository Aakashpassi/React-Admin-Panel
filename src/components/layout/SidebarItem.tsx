import { memo } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const SidebarItem = ({ path, title }: { path: string; title: string }) => {
    return (
        <Button variant="outline">
            <NavLink to={path} className={({ isActive }) => isActive ? 'active' : ''}>
                {title}
            </NavLink>
        </Button>
    );
};

export default memo(SidebarItem);