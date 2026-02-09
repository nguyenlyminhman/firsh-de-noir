"use client";

import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-perfume.jpg"
          fill
          alt="Luxury perfume collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto animate-fade-up">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-6 font-sans">
            Nước hoa cao cấp
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight">
            Khám Phá
            <span className="block text-gradient-gold">Hương Thơm</span>
            Độc Đáo
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto font-sans font-light">
            Bộ sưu tập nước hoa sang trọng, tinh tế từ các thương hiệu nổi tiếng thế giới
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="gold"
              size="xl"
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
            >
              Khám phá ngay
            </Button>
            <Button
              variant="elegant"
              size="xl"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Nhận tư vấn
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
