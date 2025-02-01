"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PizzaIcon } from "@/components/icons/pizza-icon";
import Link from "next/link";

export default function SpecialsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-4 py-16">
      <div className="mb-8 flex flex-col items-center text-center">
        <PizzaIcon className="mb-4 h-12 w-12 text-eagles-green" />
        <h2 className="font-display text-2xl font-bold tracking-tight text-eagles-green sm:text-3xl">
          Oops! Something went wrong
        </h2>
        <p className="mt-2 text-muted-foreground">
          We're having trouble loading today's specials. Please try again.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="secondary"
          className="hover:bg-eagles-green hover:text-white"
        >
          Try again
        </Button>
        <Button asChild variant="outline">
          <Link href="/menu">View Full Menu</Link>
        </Button>
      </div>
    </div>
  );
}
