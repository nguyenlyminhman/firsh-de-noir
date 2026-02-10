"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { perfumes, type Perfume, formatPrice } from "@/lib/products";
import { useLanguage } from "./LanguageContext";

const ProductCard = ({ perfume, onOrder }: { perfume: Perfume; onOrder: (name: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  const isVi = language === "vi";

  return (
    <div
      className="group relative bg-card rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/products/${perfume.slug}`} className="relative block aspect-[3/4] overflow-hidden">
        <Image
          src={perfume.image}
          alt={perfume.name}
          fill
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      </Link>
      
      {/* Quick Actions */}
      <div
        className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Button
          variant="gold"
          size="sm"
          className="w-full"
          onClick={() => onOrder(perfume.name)}
        >
          { isVi ? "Đặt hàng" : "Order now"}
        </Button>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs uppercase tracking-widest text-primary mb-2">
          {perfume.category}
        </p>
        <h3 className="font-serif text-xl mb-2">{perfume.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {perfume.description}
        </p>
        <p className="text-lg font-serif text-primary">{formatPrice(perfume.price)}</p>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const { language } = useLanguage();
  const isVi = language === "vi";

  const scrollToContact = (productName: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Set the product name in the form (via custom event)
      setTimeout(() => {
        const event = new CustomEvent("selectProduct", { detail: productName });
        window.dispatchEvent(event);
      }, 500);
    }
  };

  return (
    <section id="collection" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            {isVi ? "Bộ sưu tập" : "Collection"}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            {isVi ? "Nước Hoa Cao Cấp" : "Luxury Fragrances"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isVi
              ? "Khám phá những mùi hương độc đáo, được tuyển chọn kỹ lưỡng từ những thương hiệu nước hoa hàng đầu thế giới"
              : "Discover unique scents carefully curated from the world's leading perfume houses."}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {perfumes.map((perfume) => (
            <ProductCard
              key={perfume.id}
              perfume={perfume}
              onOrder={scrollToContact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
