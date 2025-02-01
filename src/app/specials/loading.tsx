import { Card, CardContent } from "@/components/ui/card";
import { PizzaIcon } from "@/components/icons/pizza-icon";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpecialsLoading() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <div className="mb-4 flex justify-center">
          <PizzaIcon className="h-10 w-10 text-eagles-green" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-eagles-green sm:text-4xl">
          Today's Specials
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fresh out of the oven and easy on your wallet
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="group overflow-hidden transition-all duration-300"
          >
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="mt-2 h-16" />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
