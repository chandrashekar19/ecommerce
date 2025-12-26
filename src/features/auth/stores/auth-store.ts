import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/user";
import { authService, userService } from "@/lib/firebase";

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authError: string | null;

  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullname: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setAuthenticating: (isAuthenticating: boolean) => void;
  clearError: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isAuthenticating: true,
      authError: null,

      // Sign in with email/password
      signIn: async (email: string, password: string) => {
        set({ isAuthenticating: true, authError: null });
        try {
          const user = await authService.signIn({ email, password });
          set({ user, isAuthenticated: true, isAuthenticating: false });
        } catch (error) {
          set({
            authError: (error as Error).message,
            isAuthenticating: false,
          });
          throw error;
        }
      },

      // Sign up with email/password
      signUp: async (email: string, password: string, fullname: string) => {
        set({ isAuthenticating: true, authError: null });
        try {
          const user = await authService.signUp({ email, password, fullname });
          set({ user, isAuthenticated: true, isAuthenticating: false });
        } catch (error) {
          set({
            authError: (error as Error).message,
            isAuthenticating: false,
          });
          throw error;
        }
      },

      // Sign out
      signOut: async () => {
        try {
          await authService.signOut();
          set({ user: null, isAuthenticated: false, authError: null });
        } catch (error) {
          set({ authError: (error as Error).message });
          throw error;
        }
      },

      // Social sign-in
      signInWithGoogle: async () => {
        set({ isAuthenticating: true, authError: null });
        try {
          const user = await authService.signInWithGoogle();
          set({ user, isAuthenticated: true, isAuthenticating: false });
        } catch (error) {
          set({
            authError: (error as Error).message,
            isAuthenticating: false,
          });
          throw error;
        }
      },

      signInWithFacebook: async () => {
        set({ isAuthenticating: true, authError: null });
        try {
          const user = await authService.signInWithFacebook();
          set({ user, isAuthenticated: true, isAuthenticating: false });
        } catch (error) {
          set({
            authError: (error as Error).message,
            isAuthenticating: false,
          });
          throw error;
        }
      },

      signInWithGithub: async () => {
        set({ isAuthenticating: true, authError: null });
        try {
          const user = await authService.signInWithGithub();
          set({ user, isAuthenticated: true, isAuthenticating: false });
        } catch (error) {
          set({
            authError: (error as Error).message,
            isAuthenticating: false,
          });
          throw error;
        }
      },

      // Password reset
      resetPassword: async (email: string) => {
        try {
          await authService.resetPassword(email);
        } catch (error) {
          set({ authError: (error as Error).message });
          throw error;
        }
      },

      // Set user manually (used for auth state listener)
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
          isAuthenticating: false,
        });
      },

      // Set authenticating state
      setAuthenticating: (isAuthenticating: boolean) => {
        set({ isAuthenticating });
      },

      // Clear error
      clearError: () => {
        set({ authError: null });
      },

      // Update profile
      updateProfile: async (updates: Partial<User>) => {
        const { user } = get();
        if (!user) throw new Error("No authenticated user");

        try {
          await userService.updateUser(user.id, updates);
          set({ user: { ...user, ...updates } });
        } catch (error) {
          set({ authError: (error as Error).message });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
