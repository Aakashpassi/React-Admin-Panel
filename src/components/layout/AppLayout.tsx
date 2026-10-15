import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { AppSidebar } from "./AppSidebar";
import Header from "./Header";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import RouteProgress from "../common/RouteProgress";


export default function AppLayout() {
    const error  = useloadError();
    return (<>
        <RouteProgress />
        <SidebarProvider
            className="h-svh min-h-0 overflow-hidden"
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 67)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <AppSidebar variant="inset" />
                <SidebarInset className="min-h-0 overflow-hidden">
                    <Header />
                    <div className="min-h-0 w-full flex-1 overflow-y-auto p-2.5">
                        <Outlet />
                    </div>
                </SidebarInset>
            </Suspense>

        </SidebarProvider>

    </>

    );
}