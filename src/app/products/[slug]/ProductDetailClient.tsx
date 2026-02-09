"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Perfume } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailClientProps {
  perfume: Perfume;
}

export function ProductDetailClient({ perfume }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    addToCart(perfume, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${perfume.name} x${quantity} đã được thêm vào giỏ hàng của bạn.`,
    });
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-muted">
            <Image
              src={perfume.image}
              alt={perfume.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
              {perfume.category}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
              {perfume.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {perfume.description}
            </p>

            <p className="text-2xl font-serif text-primary mb-8">
              {formatPrice(perfume.price)}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Số lượng</span>
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-24 text-center"
                />
              </div>

              <Button
                variant="gold"
                size="lg"
                className="flex-1 uppercase tracking-[0.2em]"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>

            <Button
              variant="ghost"
              className="px-0 text-sm underline-offset-4 hover:underline"
              onClick={() => router.back()}
            >
              ← Quay lại bộ sưu tập
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

