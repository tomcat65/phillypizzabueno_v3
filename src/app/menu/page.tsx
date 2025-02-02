import { getActiveCategories, getSlugByCategory } from "@/lib/services/menu";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function MenuPage() {
  const categories = await getActiveCategories();

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/menu/${getSlugByCategory(category.name ?? "")}`}
          >
            <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={category.image_url ?? "/images/placeholder.jpg"}
                  alt={category.name ?? ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                  quality={60}
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h2 className="font-display text-lg font-semibold text-eagles-green">
                  {category.name}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
