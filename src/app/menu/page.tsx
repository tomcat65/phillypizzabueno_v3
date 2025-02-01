import {
  getActiveCategories,
  getMenuSystemOverview,
} from "@/lib/services/menu";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function MenuPage() {
  const [categories, menuOverview] = await Promise.all([
    getActiveCategories(),
    getMenuSystemOverview(),
  ]);

  // Group menu items by category
  const menuByCategory = menuOverview.reduce((acc, item) => {
    if (!item.menu_category) return acc;
    if (!acc[item.menu_category]) {
      acc[item.menu_category] = [];
    }
    acc[item.menu_category].push(item);
    return acc;
  }, {} as Record<string, typeof menuOverview>);

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold tracking-tight text-eagles-green sm:text-4xl">
          Our Menu
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fresh ingredients, authentic recipes, and a taste of Philly in every
          bite
        </p>
      </div>

      <Tabs defaultValue={categories[0]?.id ?? ""} className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <TabsList className="relative mx-auto inline-flex bg-background">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id ?? ""}
                className="min-w-32 px-8"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id ?? ""}
            className="space-y-8"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {menuByCategory[category.name ?? ""]?.map((item) => (
                <Card
                  key={item.item_name}
                  className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src="/pizza-placeholder.jpg"
                      alt={item.item_name ?? ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <CardContent className="p-4">
                    <h3 className="font-display text-lg font-semibold text-eagles-green">
                      {item.item_name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-phillies-red">
                        From ${item.starting_price?.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-xs hover:bg-eagles-green hover:text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
