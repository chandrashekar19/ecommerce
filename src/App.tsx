import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./app/router";
import { authService, userService } from "@/lib/firebase";
import { useAuthStore } from "@/features/auth/stores/auth-store";

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Auth state listener component
function AuthListener({ children }: { children: React.ReactNode }) {
  const { setUser, setAuthenticating } = useAuthStore();

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = await userService.getUser(firebaseUser.uid);
          setUser(user);
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthenticating(false);
    });

    return () => unsubscribe();
  }, [setUser, setAuthenticating]);

  return <>{children}</>;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener>
        <AppRouter />
      </AuthListener>
    </QueryClientProvider>
  );
}
