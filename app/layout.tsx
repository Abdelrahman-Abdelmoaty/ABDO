import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import CartProvider from "@/store/CartProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABDO",
  description: "Developed by Abdelrahman Abdelmoaty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CartProvider cart={[]}>
        <html lang="en">
          <body className={poppins.className}>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1 py-12 md:py-16 space-y-12 md:space-y-16">{children}</main>
              <Toaster />
            </div>
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}
