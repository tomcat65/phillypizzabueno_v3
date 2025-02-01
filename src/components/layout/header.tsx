"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { CartDialog } from "@/components/cart/cart-dialog";
import { useState } from "react";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg font-bold tracking-tight text-eagles-green"
              >
                PhillyPizzaBueno
              </Link>
              <Link
                href="/menu"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Menu
              </Link>
              <Link
                href="/specials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Specials
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-display text-xl font-bold text-eagles-green">
              PhillyPizzaBueno
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/menu" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Menu
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/specials" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Specials
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Cart Button */}
        <div className="flex flex-1 items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Shopping cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-phillies-red text-[10px] font-medium text-white">
              0
            </span>
          </Button>
        </div>
      </div>

      {/* Cart Dialog */}
      <CartDialog isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  );
}
