"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./LanguageContext";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập họ tên").max(100, "Họ tên quá dài"),
  phone: z.string().trim().min(10, "Số điện thoại không hợp lệ").max(15, "Số điện thoại quá dài"),
  email: z.string().trim().email("Email không hợp lệ").max(255, "Email quá dài").optional().or(z.literal("")),
  purpose: z.enum(["order", "quote", "consult"]),
  product: z.string().max(200, "Tên sản phẩm quá dài").optional(),
  message: z.string().trim().max(1000, "Tin nhắn quá dài").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const isVi = language === "vi";
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    purpose: "order",
    product: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for product selection from ProductGrid
  useEffect(() => {
    const handleSelectProduct = (event: CustomEvent<string>) => {
      setFormData((prev) => ({ ...prev, product: event.detail }));
    };
    window.addEventListener("selectProduct", handleSelectProduct as EventListener);
    return () => window.removeEventListener("selectProduct", handleSelectProduct as EventListener);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: isVi ? "Gửi thành công!" : "Sent successfully!",
        description: getPurposeMessage(validated.purpose, isVi),
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        purpose: "order",
        product: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPurposeMessage = (purpose: string, vi: boolean) => {
    switch (purpose) {
      case "order":
        return vi
          ? "Chúng tôi sẽ liên hệ để xác nhận đơn hàng của bạn."
          : "We will contact you shortly to confirm your order.";
      case "quote":
        return vi
          ? "Báo giá sẽ được gửi đến bạn trong thời gian sớm nhất."
          : "A quotation will be sent to you as soon as possible.";
      case "consult":
        return vi
          ? "Đội ngũ tư vấn sẽ liên hệ với bạn ngay."
          : "Our consultants will reach out to you shortly.";
      default:
        return vi ? "Cảm ơn bạn đã liên hệ!" : "Thank you for contacting us!";
    }
  };

  const purposeOptions = [
    { value: "order", labelVi: "Đặt hàng", labelEn: "Order" },
    { value: "quote", labelVi: "Nhận báo giá", labelEn: "Get a quote" },
    { value: "consult", labelVi: "Tư vấn", labelEn: "Consultation" },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              {isVi ? "Liên hệ" : "Contact"}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              {isVi ? "Đặt Hàng & Tư Vấn" : "Order & Consultation"}
            </h2>
            <p className="text-muted-foreground">
              {isVi
                ? "Để lại thông tin, chúng tôi sẽ liên hệ với bạn ngay"
                : "Leave your information and we will contact you shortly."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Purpose Selection */}
            <div className="grid grid-cols-3 gap-3">
              {purposeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, purpose: option.value as "order" | "quote" | "consult" }))}
                  className={`py-3 px-4 text-sm uppercase tracking-wider border transition-all duration-300 ${
                    formData.purpose === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {isVi ? option.labelVi : option.labelEn}
                </button>
              ))}
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  name="name"
                  placeholder={isVi ? "Họ và tên *" : "Full name *"}
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-secondary border-border focus:border-primary h-12"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Input
                  name="phone"
                  placeholder={isVi ? "Số điện thoại *" : "Phone number *"}
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-secondary border-border focus:border-primary h-12"
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                name="email"
                type="email"
                placeholder={isVi ? "Email (không bắt buộc)" : "Email (optional)"}
                value={formData.email}
                onChange={handleChange}
                className="bg-secondary border-border focus:border-primary h-12"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Product Interest */}
            <div>
              <Input
                name="product"
                placeholder={isVi ? "Sản phẩm quan tâm" : "Interested product"}
                value={formData.product}
                onChange={handleChange}
                className="bg-secondary border-border focus:border-primary h-12"
              />
            </div>

            {/* Message */}
            <div>
              <Textarea
                name="message"
                placeholder={isVi ? "Tin nhắn của bạn..." : "Your message..."}
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-secondary border-border focus:border-primary resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gold"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isVi
                  ? "Đang gửi..."
                  : "Sending..."
                : isVi
                  ? "Gửi yêu cầu"
                  : "Send request"}
            </Button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground mb-4">
              {isVi ? "Hoặc liên hệ trực tiếp" : "Or contact us directly"}
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
              <a
                href="tel:0901234567"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                📞 0901 234 567
              </a>
              <a
                href="mailto:contact@luxeparfum.vn"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                ✉️ contact@luxeparfum.vn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
