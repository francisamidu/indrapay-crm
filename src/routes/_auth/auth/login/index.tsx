import { LoginForm } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

function Login() {
  return <LoginForm />;
}
export const Route = createFileRoute("/_auth/auth/login/")({
  component: Login,
});
