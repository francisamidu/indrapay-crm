import Overview from "@/components/dashboard/home/overview";
import { storage } from "@/lib/storage";
import { createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
  return <Overview />;
}

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardPage,
  loader: async ({ context }) => {
    // Preload the dashboard KPIs into the queryClient
    return context.queryClient.ensureQueryData({
      queryKey: ["dashboard", "kpis"],
      queryFn: async () => {
        const { apiClient } = context;
        return apiClient.dashboard.getKPIs();
      },
    });
  },
  beforeLoad: async () => {
    storage.get<string>("accessToken") ||
      window.location.replace("/auth/login");
  },
});
