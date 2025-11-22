import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import type { User } from "@/types";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  const user: User = {
    email: "",
    role: "admin",
    id: "1",
    name: "Admin User",
  };
  return (
    <>
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100 overflow-hidden ml-64">
        <Header user={user} />
        <main className="flex-1 overflow-auto p-6 bg-white min-h-screen rounded-2xl">
          <Outlet />
        </main>
      </div>
    </>
  );
}
