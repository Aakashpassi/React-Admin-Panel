import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "../features/auth/AuthContext";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ThemeProvider } from "@/components/common/ThemeProvider";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    }
  }
});

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* </AuthProvider> */}
      </QueryClientProvider>
    </Provider>
  );
}