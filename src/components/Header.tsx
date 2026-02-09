import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "./CartContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalQuantity } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang chủ", href: "/#hero" },
    { name: "Bộ sưu tập", href: "/#collection" },
    { name: "Giới thiệu", href: "/#about" },
    { name: "Liên hệ", href: "/#contact" }
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
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl md:text-3xl tracking-wider text-primary">
            LUXE PARFUM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.href.startsWith("/#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ),
            )}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <ShoppingBag size={18} />
              <span>Giỏ hàng</span>
              {totalQuantity > 0 && (
                <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-background">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </nav>

          {/* CTA Button */}
          <Button
            variant="gold-outline"
            size="sm"
            className="hidden md:inline-flex tracking-widest"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Đặt hàng ngay
          </Button>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link href="/cart" className="relative md:hidden">
              <ShoppingBag size={22} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-background">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ),
              )}
              <Link
                href="/cart"
                className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingBag size={18} />
                <span>Giỏ hàng</span>
                {totalQuantity > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-medium text-background">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              <Button
                variant="gold-outline"
                size="sm"
                className="tracking-widest mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Đặt hàng ngay
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
