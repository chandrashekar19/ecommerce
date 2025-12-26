import { Loader2 } from "lucide-react";

interface PreloaderProps {
  message?: string;
}

export function Preloader({ message = "Loading..." }: PreloaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>
  );
}

export function FullPagePreloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center">
        <img
          src="/images/logo-light.png"
          alt="Lumina Boutique"
          className="h-10 w-auto mb-6 mix-blend-multiply"
        />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
