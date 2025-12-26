import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Order Summary" },
  { id: 2, name: "Shipping Details" },
  { id: 3, name: "Payment" },
];

export function StepTracker({ currentStep }: StepTrackerProps) {
  return (
    <div className="mx-auto mb-16 max-w-4xl px-4">
      <div className="relative flex justify-between">
        {/* Progress Line Background */}
        <div className="absolute top-5 left-0 h-0.5 w-full bg-muted" aria-hidden="true" />

        {/* Progress Line Active */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          aria-hidden="true"
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="relative flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                      ? "border-primary bg-background text-primary"
                      : "border-muted bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>
              <span
                className={cn(
                  "absolute -bottom-8 whitespace-nowrap text-xs font-semibold tracking-wider uppercase transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
