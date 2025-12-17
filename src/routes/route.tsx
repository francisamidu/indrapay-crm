import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => {
    window.location.replace("auth/login");
  },
});

function RouteComponent() {
  return <div>Hello "/11"!</div>;
}
