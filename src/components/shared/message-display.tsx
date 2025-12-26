import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageDisplayProps {
  message: string;
  description?: string;
  buttonLabel?: string;
  onAction?: () => void;
  type?: "error" | "info" | "success";
  className?: string;
}

export function MessageDisplay({
  message,
  description,
  buttonLabel,
  onAction,
  type = "info",
  className,
}: MessageDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className={cn(
        "mb-6 rounded-full p-4",
        type === "error" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
      )}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-2xl font-bold">{message}</h2>
      {description && (
        <p className="mb-8 max-w-sm text-muted-foreground">{description}</p>
      )}
      {buttonLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="lg">
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
