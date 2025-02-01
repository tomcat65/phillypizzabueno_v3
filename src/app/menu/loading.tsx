import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MenuLoading() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <Skeleton className="mx-auto h-10 w-48" />
        <Skeleton className="mx-auto mt-2 h-5 w-96" />
      </div>

      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative mx-auto inline-flex bg-background">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="ml-2 h-10 w-32" />
            <Skeleton className="ml-2 h-10 w-32" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden transition-all duration-300"
            >
              <AspectRatio ratio={16 / 9}>
                <Skeleton className="h-full w-full" />
              </AspectRatio>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-full" />
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
