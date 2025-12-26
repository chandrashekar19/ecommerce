import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorChooserProps {
  availableColors: string[];
  onSelectedColorChange: (color: string) => void;
  className?: string;
}

export function ColorChooser({
  availableColors,
  onSelectedColorChange,
  className,
}: ColorChooserProps) {
  const [selectedColor, setSelectedColor] = useState("");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelectedColorChange(color);
  };

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {availableColors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => handleColorSelect(color)}
          className={cn(
            "group relative h-8 w-8 rounded-full border border-black/10 transition-all duration-200 hover:scale-110 active:scale-95",
            selectedColor === color && "ring-2 ring-primary ring-offset-2"
          )}
          style={{ backgroundColor: color }}
          title={color}
        >
          {selectedColor === color && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Check
                className={cn(
                  "h-4 w-4",
                  // Basic logic to determine if we should show a white or black checkmark
                  // Based on a very simple luminance check would be better, but for now 
                  // we can just use a contrasting color or a shadow.
                  "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                )}
              />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
