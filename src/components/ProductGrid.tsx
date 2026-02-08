import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";


interface Perfume {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Essence Noir",
    category: "Eau de Parfum",
    price: "2.500.000đ",
    image: "/assets/perfume-1.jpg",
    description: "Hương thơm huyền bí, quyến rũ với nốt gỗ và hổ phách",
  },
  {
    id: 2,
    name: "Rose Élégance",
    category: "Eau de Parfum",
    price: "3.200.000đ",
    image: "/assets/perfume-2.jpg",
    description: "Sự kết hợp hoàn hảo của hoa hồng và pha lê",
  },
  {
    id: 3,
    name: "Midnight Oud",
    category: "Parfum",
    price: "4.800.000đ",
    image: '/assets/perfume-3.jpg',
    description: "Đẳng cấp nam tính với trầm hương và da thuộc",
  },
  {
    id: 4,
    name: "Vintage Amber",
    category: "Parfum Intense",
    price: "5.500.000đ",
    image: "/assets/perfume-4.jpg",
    description: "Hương thơm cổ điển, sang trọng với hổ phách quý",
  },
  {
    id: 5,
    name: "Crystal Noir",
    category: "Eau de Parfum",
    price: "3.800.000đ",
    image: "/assets/perfume-5.jpg",
    description: "Hiện đại và táo bạo với nốt hương đen huyền bí",
  },
  {
    id: 6,
    name: "Pearl Luxe",
    category: "Eau de Toilette",
    price: "2.200.000đ",
    image: "/assets/perfume-6.jpg",
    description: "Thanh lịch và tinh tế như viên ngọc trai",
  },
];

const ProductCard = ({ perfume, onOrder }: { perfume: Perfume; onOrder: (name: string) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-sm overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={perfume.image}
          alt={perfume.name}
          fill
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        
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
            Đặt hàng
          </Button>
        </div>
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
        <p className="text-lg font-serif text-primary">{perfume.price}</p>
      </div>
    </div>
  );
};

const ProductGrid = () => {
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
            Bộ sưu tập
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            Nước Hoa Cao Cấp
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Khám phá những mùi hương độc đáo, được tuyển chọn kỹ lưỡng từ những thương hiệu nước hoa hàng đầu thế giới
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
