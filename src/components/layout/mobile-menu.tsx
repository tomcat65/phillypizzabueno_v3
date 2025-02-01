import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
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
  )
} 