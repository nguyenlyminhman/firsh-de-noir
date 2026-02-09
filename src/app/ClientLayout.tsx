"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FloatingCart } from "@/components/FloatingCart";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCart />
    </div>
  );
}

