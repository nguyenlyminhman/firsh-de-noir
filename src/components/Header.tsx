"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const isVi = language === "vi";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: isVi ? "Trang chủ" : "Home", href: "/#hero" },
    { name: isVi ? "Bộ sưu tập" : "Collection", href: "/#collection" },
    { name: isVi ? "Giới thiệu" : "About", href: "/#about" },
    { name: isVi ? "Liên hệ" : "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        {/* Header main */}
        <div className="relative flex items-center">
          {/* Logo - Left */}
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl tracking-wider text-primary flex-shrink-0"
          >
            LUXE PARFUM
          </Link>

          {/* Center menu */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300 text-center"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Language switcher - desktop */}
            <div className="hidden md:inline-flex items-center gap-1 text-xs font-medium tracking-[0.2em] text-muted-foreground">
              <button
                type="button"
                onClick={() => setLanguage("vi")}
                className={`transition-colors ${
                  isVi ? "text-primary" : "hover:text-primary"
                }`}
              >
                VI
              </button>
              <span className="opacity-50">/</span>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`transition-colors ${
                  !isVi ? "text-primary" : "hover:text-primary"
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}

              {/* Language switcher - mobile */}
              <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-[0.2em] text-muted-foreground">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("vi");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`transition-colors ${
                    isVi ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  VI
                </button>
                <span className="opacity-50">/</span>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("en");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`transition-colors ${
                    !isVi ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
