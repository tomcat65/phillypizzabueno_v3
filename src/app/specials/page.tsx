import { getActiveSpecials } from "@/lib/services/menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PizzaIcon } from "@/components/icons/pizza-icon";
import Link from "next/link";

export const revalidate = 60;

export default async function SpecialsPage() {
  const specials = await getActiveSpecials();

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
        {specials.map((special) => (
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

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/menu">View Full Menu</Link>
        </Button>
      </div>
    </main>
  );
}
