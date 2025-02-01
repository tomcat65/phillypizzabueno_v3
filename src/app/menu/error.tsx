"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container mx-auto flex min-h-[400px] max-w-7xl items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-phillies-red" />
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold text-eagles-green">
          Something went wrong!
        </h2>
        <p className="mb-4 text-muted-foreground">
          {error.message || "There was an error loading the menu."}
        </p>
        <Button
          onClick={() => reset()}
          className="bg-eagles-green hover:bg-eagles-green/90"
        >
          Try again
        </Button>
      </div>
    </main>
  );
}
