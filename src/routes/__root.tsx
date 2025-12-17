import * as React from "react";

import { ErrorBoundary } from "react-error-boundary";

import type { ApiClientType } from "@/api/client";
import ErrorState from "@/components/layout/error-state";
import { Toaster } from "@/components/ui/sonner";
import { MenuContextProvider } from "@/contexts/menu-context";
import QueryProvider from "@/providers/query-provider";
import type { User } from "@/types";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{
  apiClient: ApiClientType;
  queryClient: import("@tanstack/react-query").QueryClient;
  user: User;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <QueryProvider>
        <Toaster />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorState
                  message={error.message}
                  onReload={resetErrorBoundary}
                />
              )}
            >
              <MenuContextProvider>
                <Outlet />
                <TanStackRouterDevtools position="bottom-right" />
              </MenuContextProvider>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryProvider>
    </React.Fragment>
  );
}
