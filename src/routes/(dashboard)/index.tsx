import Overview from "@/components/dashboard/home/overview";
import { createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
  return <Overview />;
}

export const Route = createFileRoute("/(dashboard)/")({
  component: DashboardPage,
});
