// src/router.tsx
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { IndraPayCrmApi } from "./api/client";
import { NotFoundPage } from "./components/layout/not-found";
import { generateHeaders } from "./lib/utils";
import { routeTree } from "./routeTree.gen";
import type { User } from "./types";

export const apiClient = new IndraPayCrmApi({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000",
  headers: {
    ...generateHeaders(),
  },
});

export function getRouter() {
  const queryClient = new QueryClient();
  const user: User = {
    email: "",
    role: "admin",
    id: "1",
    name: "Admin User",
  };
  const router = createRouter({
    routeTree,
    // optionally expose the QueryClient via router context
    context: {
      apiClient,
      queryClient,
      user,
    },
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultNotFoundComponent: NotFoundPage,
  });

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    // optional:
    // handleRedirects: true,
    // wrapQueryClient: true,
  });

  return router;
}
