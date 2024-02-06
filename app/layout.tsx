import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
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
      <html lang="en">
        <body className={cn("min-h-screen flex flex-col", poppins.className)}>
          <Header />
          <main className="flex-1 py-12 md:py-16">{children}</main>
          <div className="h-24 bg-primary"></div>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
