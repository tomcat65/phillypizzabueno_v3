import { getActiveCategories, getActiveSpecials } from "@/lib/services/menu";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { PizzaIcon } from "@/components/icons/pizza-icon";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const [categories, specials] = await Promise.all([
    getActiveCategories(),
    getActiveSpecials(),
  ]);

  // Get today's top 3 specials (sorted by discount percentage)
  const todaySpecials = specials.slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-b from-black/70 to-black/50 px-4 py-16">
        <Image
          src="/hero-pizza.jpg"
          alt="Delicious pizza with fresh ingredients"
          fill
          className="absolute inset-0 -z-10 object-cover opacity-50"
          priority
        />
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            PhillyPizzaBueno
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-white/90 sm:text-lg md:mt-4">
            Unpretentious Down to Earth Philly Style Pizza
          </p>
          <div className="mt-6 flex justify-center gap-3 sm:mt-8">
            <Link href="/menu">
              <Button
                size="default"
                className="bg-eagles-green text-sm hover:bg-eagles-green/90"
              >
                View Menu
              </Button>
            </Link>
            <Link href="/specials">
              <Button
                size="default"
                variant="outline"
                className="border-white/20 bg-white/10 text-sm text-white backdrop-blur-sm hover:bg-white/20"
              >
                Today's Specials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Specials Section */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
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
              <AspectRatio ratio={16 / 9}>
                <Image
                  src="/pizza-placeholder.jpg"
                  alt={special.name ?? ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </AspectRatio>
              <CardContent className="p-4">
                <h3 className="font-display text-lg font-semibold text-eagles-green">
                  {special.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                  {special.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Based on {special.base_item_name}
                    </span>
                    <span className="text-sm font-medium text-phillies-red">
                      ${special.special_price?.toFixed(2)}
                    </span>
                    <span className="text-xs text-emerald-600">
                      Save {special.discount_percentage}%!
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

        <div className="mt-8 text-center">
          <Link href="/specials">
            <Button
              variant="outline"
              size="lg"
              className="border-eagles-green text-eagles-green hover:bg-eagles-green hover:text-white"
            >
              View All Specials
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-eagles-green sm:text-3xl">
            Browse Our Menu
          </h2>
          <p className="mt-2 text-muted-foreground">
            From classic pies to specialty creations
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/menu#${category.name}`}>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={category.image_url ?? "/pizza-placeholder.jpg"}
                    alt={category.name ?? ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </AspectRatio>
                <CardContent className="p-4">
                  <h3 className="font-display text-lg font-semibold text-eagles-green">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
