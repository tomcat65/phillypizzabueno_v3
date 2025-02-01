import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  title: "PhillyPizzaBueno - Unpretentious Down to Earth Philly Style Pizza",
  description:
    "Experience authentic Philadelphia-style pizza at PhillyPizzaBueno. Fresh ingredients, traditional recipes, and a taste of Philly in every bite.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable} ${oswald.variable}`}
        suppressHydrationWarning
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
