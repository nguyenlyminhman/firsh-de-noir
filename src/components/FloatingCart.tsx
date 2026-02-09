"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "./CartContext";
import { formatPrice } from "@/lib/products";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";

export function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    items,
    totalQuantity,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const isEmpty = items.length === 0;

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Mở giỏ hàng"
      >
        <ShoppingBag size={24} className="stroke-[1.5]" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-background text-xs font-medium text-primary ring-2 ring-primary">
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </button>

      {/* Cart Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="border-b border-border pb-6 mb-6">
            <SheetTitle className="font-serif text-2xl text-left">
              Giỏ hàng
            </SheetTitle>
            <SheetDescription className="text-left text-muted-foreground">
              {isEmpty
                ? "Giỏ hàng của bạn đang trống"
                : `${totalQuantity} sản phẩm trong giỏ hàng`}
            </SheetDescription>
          </SheetHeader>

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag size={48} className="text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground mb-6">
                Chưa có sản phẩm nào trong giỏ hàng
              </p>
              <Button
                variant="gold-outline"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = "/#collection";
                }}
              >
                Khám phá bộ sưu tập
              </Button>
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-200px)]">
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                {items.map((item) => (
                  <div
                    key={item.perfume.id}
                    className="flex gap-4 border-b border-border pb-6 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
                      <Image
                        src={item.perfume.image}
                        alt={item.perfume.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base mb-1 line-clamp-1">
                        {item.perfume.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.perfume.category}
                      </p>
                      <p className="text-sm font-medium text-primary mb-3">
                        {formatPrice(item.perfume.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center rounded-sm border border-border overflow-hidden">
                          <button
                            className="px-2 py-1 text-xs hover:bg-muted transition-colors"
                            onClick={() => decreaseQuantity(item.perfume.id)}
                            aria-label="Giảm số lượng"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-sm min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 text-xs hover:bg-muted transition-colors"
                            onClick={() => increaseQuantity(item.perfume.id)}
                            aria-label="Tăng số lượng"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.perfume.id)}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-4"
                          aria-label="Xóa sản phẩm"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border pt-6 mt-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-muted-foreground">Tổng cộng</span>
                  <span className="font-serif text-xl text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <Button
                  asChild
                  variant="gold"
                  className="w-full uppercase tracking-[0.2em]"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/checkout">Tiến hành đặt hàng</Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full text-sm underline-offset-4 hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
