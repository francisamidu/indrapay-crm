import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import QueryProvider from "@/providers/query-provider";
import type { User } from "@/types";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

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
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden ml-64">
          <Header user={user} />
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
        <TanStackRouterDevtools position="bottom-right" />
      </QueryProvider>
    </React.Fragment>
  );
}
