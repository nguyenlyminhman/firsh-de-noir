"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/components/LanguageContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { language } = useLanguage();
  const isVi = language === "vi";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmpty = items.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isEmpty) return;

    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-serif text-3xl md:text-4xl mb-8">
          {isVi ? "Thanh toán & thông tin nhận hàng" : "Checkout & shipping details"}
        </h1>

        {isEmpty ? (
          <div className="bg-card border border-dashed border-border rounded-sm p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {isVi
                ? "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán."
                : "Your cart is empty. Please add products before checking out."}
            </p>
            <Button asChild variant="gold-outline">
              <Link href="/#collection">
                {isVi ? "Quay lại bộ sưu tập" : "Back to collection"}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-10">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isVi ? "Họ tên" : "Full name"}
                </label>
                <Input
                  required
                  placeholder={
                    isVi ? "Nhập họ tên người nhận" : "Enter recipient's full name"
                  }
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isVi ? "Số điện thoại" : "Phone number"}
                </label>
                <Input
                  required
                  type="tel"
                  placeholder={isVi ? "Nhập số điện thoại" : "Enter phone number"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isVi ? "Địa chỉ" : "Address"}
                </label>
                <Textarea
                  required
                  placeholder={
                    isVi
                      ? "Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      : "Street, ward/district, city, country"
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isVi ? "Ghi chú (tùy chọn)" : "Notes (optional)"}
                </label>
                <Textarea
                  placeholder={
                    isVi
                      ? "Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                      : "e.g. Deliver during office hours, call before arrival..."
                  }
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full uppercase tracking-[0.2em]"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isVi
                    ? "Đang xử lý..."
                    : "Processing..."
                  : isVi
                    ? "Xác nhận đặt hàng"
                    : "Confirm order"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm underline-offset-4 hover:underline"
                onClick={() => router.push("/cart")}
              >
                ← {isVi ? "Quay lại giỏ hàng" : "Back to cart"}
              </Button>
            </form>

            {/* Order summary */}
            <div className="bg-card border border-border rounded-sm p-6 h-fit">
              <h2 className="font-serif text-xl mb-4">
                {isVi ? "Đơn hàng của bạn" : "Your order"}
              </h2>

              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div
                    key={item.perfume.id}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {item.perfume.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {isVi ? "Số lượng" : "Quantity"}: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatPrice(item.perfume.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {isVi ? "Tổng thanh toán" : "Total payment"}
                </span>
                <span className="text-xl font-serif text-primary">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

