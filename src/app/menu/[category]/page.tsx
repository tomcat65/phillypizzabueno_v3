import { notFound } from "next/navigation";
import {
  getActiveCategories,
  getMenuSystemOverview,
  type MenuItemWithDetails,
  getCategoryBySlug,
  type CategorySlug,
  CATEGORY_MAPPING,
} from "@/lib/services/menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Configure smaller image sizes for better performance
const THUMBNAIL_SIZE = {
  width: 480,
  height: 270,
};

export const revalidate = 60;

interface CategoryPageProps {
  params: {
    category: CategorySlug;
  };
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAPPING).map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categories, menuItems] = await Promise.all([
    getActiveCategories(),
    getMenuSystemOverview(),
  ]);

  const categoryName = getCategoryBySlug(params.category);
  if (!categoryName) {
    notFound();
  }

  // Find the current category
  const currentCategory = categories.find((cat) => cat.name === categoryName);

  if (!currentCategory) {
    notFound();
  }

  // Filter menu items for this category
  const categoryItems = menuItems.filter(
    (item) => item.category?.id === currentCategory.id
  );

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/menu">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-eagles-green"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-eagles-green sm:text-4xl">
          {currentCategory.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse our selection of {currentCategory.name?.toLowerCase()}
        </p>
      </div>

      {categoryItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Coming soon! This section is currently being updated.
          </p>
          <Link href="/menu" className="mt-4 inline-block">
            <Button
              variant="secondary"
              className="hover:bg-eagles-green hover:text-white"
            >
              Return to Menu
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryItems.map((item) => {
            const itemName = item.name;
            const itemDescription = item.description ?? "";
            const imageUrl =
              item.base_pizza?.image_url ?? "/images/placeholder.jpg";

            return (
              <Card
                key={item.id}
                className="group overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-[270px] w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={itemName}
                    width={THUMBNAIL_SIZE.width}
                    height={THUMBNAIL_SIZE.height}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                    quality={60}
                    loading="lazy"
                  />
                </div>

                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-semibold text-eagles-green">
                    {itemName}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {itemDescription}
                  </p>

                  {/* Pizza Variants */}
                  {item.base_pizza?.variants &&
                    item.base_pizza.variants.length > 0 && (
                      <div className="mt-4">
                        <Separator className="my-2" />
                        <div className="grid gap-2">
                          {item.base_pizza.variants
                            .sort(
                              (a, b) =>
                                (a.size?.size_inches ?? 0) -
                                (b.size?.size_inches ?? 0)
                            )
                            .map((variant) => {
                              const sizeName =
                                variant.size?.size_name ?? "Pizza";
                              const sizeInches =
                                variant.size?.size_inches?.toString() ?? "0";

                              return (
                                <div
                                  key={variant.id}
                                  className="flex flex-col gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-base text-eagles-green">
                                        {sizeName}
                                      </span>
                                      <span className="text-sm text-muted-foreground">
                                        {sizeInches}" pizza
                                      </span>
                                    </div>
                                    <span className="text-base font-bold text-phillies-red">
                                      ${variant.base_price.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex-1 hover:bg-eagles-green hover:text-white transition-colors"
                                    >
                                      Add to Cart
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className="flex-1 hover:bg-eagles-green hover:text-white transition-colors"
                                    >
                                      Customize
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                  {/* Wing Variants */}
                  {item.wing_type?.variants &&
                    item.wing_type.variants.length > 0 && (
                      <div className="mt-4">
                        <Separator className="my-2" />
                        <div className="grid gap-2">
                          {item.wing_type.variants
                            .sort(
                              (a, b) =>
                                (a.quantity?.quantity ?? 0) -
                                (b.quantity?.quantity ?? 0)
                            )
                            .map((variant) => {
                              const quantity = variant.quantity?.quantity ?? 0;

                              return (
                                <div
                                  key={variant.id}
                                  className="flex flex-col gap-2 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                      <span className="font-semibold text-base text-eagles-green">
                                        {quantity} Wings
                                      </span>
                                    </div>
                                    <span className="text-base font-bold text-phillies-red">
                                      ${variant.price.toFixed(2)}
                                    </span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    className="w-full hover:bg-eagles-green hover:text-white transition-colors"
                                  >
                                    Choose Sauces
                                  </Button>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                  {/* Regular Items (Sides, Beverages) */}
                  {!item.base_pizza?.variants && !item.wing_type?.variants && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-medium text-phillies-red">
                        ${item.base_price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="text-xs hover:bg-eagles-green hover:text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
