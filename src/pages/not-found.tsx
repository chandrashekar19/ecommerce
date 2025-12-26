import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks";
import { ROUTES } from "@/constants/routes";

export function NotFoundPage() {
  useDocumentTitle("Page Not Found");

  return (
    <main className="container px-4 py-20">
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 mt-8">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button asChild>
            <Link to={ROUTES.HOME}>
              <Home className="mr-2 h-4 w-4" />
              Home Page
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
