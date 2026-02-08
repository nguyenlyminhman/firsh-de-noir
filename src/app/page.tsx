"use client";

import Header from "../components/Header"; 
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import About from "../components/About";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
