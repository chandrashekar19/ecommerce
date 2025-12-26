import { useState } from "react";

interface FileState {
  file: File | null;
  url: string;
}

export function useFileHandler(initialState: Record<string, FileState>) {
  const [files, setFiles] = useState<Record<string, FileState>>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    { name, type = "single" }: { name: string; type?: "single" | "multiple" }
  ) => {
    const { files: targetFiles } = event.target;

    if (!targetFiles || targetFiles.length === 0) return;

    if (type === "single") {
      const file = targetFiles[0];
      const url = URL.createObjectURL(file);

      setFiles((prev) => ({
        ...prev,
        [name]: { file, url },
      }));
    }
  };

  const removeFile = (name: string) => {
    setFiles((prev) => ({
      ...prev,
      [name]: { file: null, url: "" },
    }));
  };

  return {
    files,
    onFileChange,
    removeFile,
    isLoading,
    setIsLoading,
  };
}
