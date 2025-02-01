import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram } from "lucide-react";
import { BrandTiktok } from "@/components/icons/brand-tiktok";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50/50">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-eagles-green">
              PhillyPizzaBueno
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Authentic Philadelphia-style pizza made with love and tradition.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-eagles-green">
              Quick Links
            </h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link
                href="/menu"
                className="text-sm text-muted-foreground hover:text-eagles-green"
              >
                Menu
              </Link>
              <Link
                href="/specials"
                className="text-sm text-muted-foreground hover:text-eagles-green"
              >
                Specials
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-eagles-green"
              >
                About Us
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-eagles-green">
              Contact
            </h3>
            <address className="mt-4 not-italic">
              <p className="text-sm text-muted-foreground">
                1455 Franklin Mills Circle
                <br />
                Franklin Mills Mall, RM 852A
                <br />
                Food Court, Orange Entrance #5
                <br />
                Philadelphia, PA 19154
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <a href="tel:+12156100873" className="hover:text-eagles-green">
                  (215) 610-0873
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-eagles-green">
              Follow Us
            </h3>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-[#1877F2]"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-[#E4405F]"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-[#000000]"
                aria-label="TikTok"
              >
                <BrandTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between space-y-4 text-center sm:flex-row sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PhillyPizzaBueno. All rights reserved.
          </p>
          <nav className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-eagles-green"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-eagles-green"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
