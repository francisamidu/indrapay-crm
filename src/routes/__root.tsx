import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import QueryProvider from "@/providers/query-provider";
import type { User } from "@/types";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MenuContextProvider } from "@/contexts/menu-context";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const user: User = {
    email: "",
    role: "admin",
    id: "1",
    name: "Admin User",
  };
  return (
    <React.Fragment>
      <QueryProvider>
        <MenuContextProvider>
          <Sidebar />
          <div className="flex flex-col flex-1 bg-gray-100 overflow-hidden ml-64">
            <Header user={user} />
            <main className="flex-1 overflow-auto p-6 bg-white min-h-screen rounded-2xl">
              <Outlet />
            </main>
          </div>
          <TanStackRouterDevtools position="bottom-right" />
        </MenuContextProvider>
      </QueryProvider>
    </React.Fragment>
  );
}
