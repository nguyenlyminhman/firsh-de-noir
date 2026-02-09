export interface Perfume {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const perfumes: Perfume[] = [
  {
    id: 1,
    slug: "essence-noir",
    name: "Essence Noir",
    category: "Eau de Parfum",
    price: 2500000,
    image: "/assets/perfume-1.jpg",
    description:
      "Hương thơm huyền bí, quyến rũ với nốt gỗ và hổ phách. Phù hợp cho những buổi tối sang trọng và những khoảnh khắc đặc biệt cần dấu ấn riêng.",
  },
  {
    id: 2,
    slug: "rose-elegance",
    name: "Rose Élégance",
    category: "Eau de Parfum",
    price: 3200000,
    image: "/assets/perfume-2.jpg",
    description:
      "Sự kết hợp hoàn hảo của hoa hồng và pha lê, mang lại cảm giác nữ tính, tinh khôi nhưng không kém phần sang trọng và hiện đại.",
  },
  {
    id: 3,
    slug: "midnight-oud",
    name: "Midnight Oud",
    category: "Parfum",
    price: 4800000,
    image: "/assets/perfume-3.jpg",
    description:
      "Đẳng cấp nam tính với trầm hương và da thuộc, tạo nên tầng hương sâu, ấm, lưu hương lâu dành cho những ai yêu thích sự bí ẩn.",
  },
  {
    id: 4,
    slug: "vintage-amber",
    name: "Vintage Amber",
    category: "Parfum Intense",
    price: 5500000,
    image: "/assets/perfume-4.jpg",
    description:
      "Hương thơm cổ điển, sang trọng với hổ phách quý, mang lại cảm giác hoài niệm nhưng vẫn thời thượng, phù hợp cả nam và nữ.",
  },
  {
    id: 5,
    slug: "crystal-noir",
    name: "Crystal Noir",
    category: "Eau de Parfum",
    price: 3800000,
    image: "/assets/perfume-5.jpg",
    description:
      "Hiện đại và táo bạo với nốt hương đen huyền bí, dành cho những tâm hồn tự do, cá tính và thích nổi bật giữa đám đông.",
  },
  {
    id: 6,
    slug: "pearl-luxe",
    name: "Pearl Luxe",
    category: "Eau de Toilette",
    price: 2200000,
    image: "/assets/perfume-6.jpg",
    description:
      "Thanh lịch và tinh tế như viên ngọc trai, mang lại cảm giác nhẹ nhàng, dễ chịu cho những ngày thường hoặc môi trường công sở.",
  },
];

export function getPerfumeBySlug(slug: string): Perfume | undefined {
  return perfumes.find((perfume) => perfume.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

