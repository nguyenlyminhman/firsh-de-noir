import { notFound } from "next/navigation";
import { getPerfumeBySlug } from "@/lib/products";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const perfume = getPerfumeBySlug(params.slug);
  if (!perfume) return {};

  return {
    title: `${perfume.name} – Firsh De Noir`,
    description: perfume.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const perfume = getPerfumeBySlug(params.slug);

  if (!perfume) {
    notFound();
  }

  return <ProductDetailClient perfume={perfume} />;
}

