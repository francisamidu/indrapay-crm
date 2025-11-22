import { ForgotPasswordForm } from "@/components/auth/forms";
import { createFileRoute } from "@tanstack/react-router";

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};
export const Route = createFileRoute("/_auth/auth/forgot-password/")({
  component: ForgotPasswordPage,
});
