"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();
  const { language } = useLanguage();
  const isVi = language === "vi";

  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">
          {isVi ? "Giỏ hàng" : "Shopping Cart"}
        </h1>

        {isEmpty ? (
          <div className="bg-card border border-dashed border-border rounded-sm p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {isVi
                ? "Giỏ hàng của bạn đang trống."
                : "Your cart is currently empty."}
            </p>
            <Button asChild variant="gold-outline">
              <Link href="/#collection">
                {isVi ? "Tiếp tục mua sắm" : "Continue shopping"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10">
            {/* Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.perfume.id}
                  className="flex flex-col sm:flex-row gap-4 border-b border-border pb-4"
                >
                  <div className="flex-1">
                    <h2 className="font-serif text-xl mb-1">
                      {item.perfume.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.perfume.category}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.perfume.description}
                    </p>
                    <p className="text-base font-medium text-primary">
                      {formatPrice(item.perfume.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <div className="inline-flex items-center rounded-sm border border-border overflow-hidden">
                      <button
                        className="px-3 py-1 text-sm hover:bg-muted"
                        onClick={() => decreaseQuantity(item.perfume.id)}
                        aria-label={isVi ? "Giảm số lượng" : "Decrease quantity"}
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        className="px-3 py-1 text-sm hover:bg-muted"
                        onClick={() => increaseQuantity(item.perfume.id)}
                        aria-label={isVi ? "Tăng số lượng" : "Increase quantity"}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-4"
                      onClick={() => removeFromCart(item.perfume.id)}
                    >
                      {isVi ? "Xóa" : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-card border border-border rounded-sm p-6 h-fit">
              <h2 className="font-serif text-xl mb-4">
                {isVi ? "Tổng kết" : "Summary"}
              </h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  {isVi ? "Tổng tiền" : "Total"}
                </span>
                <span className="text-xl font-serif text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Button asChild variant="gold" className="w-full mt-4">
                <Link href="/checkout">
                  {isVi ? "Tiến hành đặt hàng" : "Proceed to checkout"}
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="w-full mt-2 text-sm underline-offset-4 hover:underline"
              >
                <Link href="/#collection">
                  {isVi ? "Tiếp tục mua sắm" : "Continue shopping"}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

