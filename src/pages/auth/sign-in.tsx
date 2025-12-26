import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageDisplay } from "@/components/shared/message-display";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useDocumentTitle } from "@/hooks";
import { ROUTES } from "@/constants/routes";
import { Chrome, Github } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInPage() {
  useDocumentTitle("Sign In");
  const navigate = useNavigate();

  const {
    signIn,
    signInWithGoogle,
    signInWithGithub,
    isAuthenticating,
    authError,
    clearError,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signIn(data.email, data.password);
      navigate(ROUTES.HOME);
    } catch {
      // Error is handled by the store
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(ROUTES.HOME);
    } catch {
      // Error is handled by the store
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub();
      navigate(ROUTES.HOME);
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <main className="container px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {authError && (
            <MessageDisplay
              type="error"
              message={authError}
              className="mb-4"
            />
          )}

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGithubSignIn}
              disabled={isAuthenticating}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                error={errors.email?.message}
                onFocus={clearError}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                error={errors.password?.message}
                onFocus={clearError}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isAuthenticating}
            >
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to={ROUTES.SIGNUP} className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
