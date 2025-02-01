import {
  getActiveCategories,
  getMenuSystemOverview,
  getActiveSpecials,
} from "@/lib/services/menu";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { PizzaIcon } from "@/components/icons/pizza-icon";

export const revalidate = 60;

export default async function MenuPage() {
  const [categories, menuOverview, specials] = await Promise.all([
    getActiveCategories(),
    getMenuSystemOverview(),
    getActiveSpecials(),
  ]);

  // Get today's specials
  const todaySpecials = specials.slice(0, 3);

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

      {/* Today's Specials Section */}
      {todaySpecials.length > 0 && (
        <section className="mb-16">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <PizzaIcon className="h-10 w-10 text-eagles-green" />
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-eagles-green sm:text-3xl">
              Today's Specials
            </h2>
            <p className="mt-2 text-muted-foreground">
              Fresh out of the oven and easy on your wallet
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {todaySpecials.map((special) => (
              <Card
                key={special.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="font-display text-lg font-semibold text-eagles-green">
                    {special.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {special.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Based on {special.base_item_name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-phillies-red">
                          ${special.special_price?.toFixed(2)}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-600">
                        Save {special.discount_percentage}%
                      </span>
                    </div>
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
        </section>
      )}

      {/* Regular Menu Tabs */}
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
                  {category.image_url && (
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={category.image_url}
                        alt={item.item_name ?? ""}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </AspectRatio>
                  )}
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
