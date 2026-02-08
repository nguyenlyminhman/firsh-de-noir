const Footer = () => {
  return (
    <footer className="py-12 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <a href="#" className="font-serif text-2xl tracking-wider text-primary">
            LUXE PARFUM
          </a>

          {/* Links */}
          <nav className="flex gap-8">
            <a
              href="#collection"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Bộ sưu tập
            </a>
            <a
              href="#about"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Giới thiệu
            </a>
            <a
              href="#contact"
              className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              Liên hệ
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 Luxe Parfum. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
