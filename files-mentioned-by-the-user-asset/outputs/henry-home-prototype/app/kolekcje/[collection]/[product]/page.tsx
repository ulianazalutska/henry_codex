import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductExperience } from "../../../components/product-experience";
import { SiteFooter } from "../../../components/site-footer";
import { SiteNavigation } from "../../../components/site-navigation";
import { collections, getProduct } from "../../../collections-data";

export function generateStaticParams() {
  return collections.flatMap((collection) => collection.products.map((product) => ({ collection: collection.slug, product: product.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string; product: string }> }): Promise<Metadata> {
  const { collection, product } = await params;
  const record = getProduct(collection, product);
  if (!record) return {};
  const title = `${record.product.name} — HENRY`;
  return {
    title,
    description: record.product.description,
    openGraph: { title, description: record.product.description, images: [record.product.image] },
    twitter: { title, description: record.product.description, images: [record.product.image] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ collection: string; product: string }> }) {
  const { collection: collectionSlug, product: productSlug } = await params;
  const record = getProduct(collectionSlug, productSlug);
  if (!record) notFound();
  const { collection, product } = record;

  return (
    <main id="top" className="product-detail-page">
      <SiteNavigation />
      <ProductExperience collection={collection} product={product} isReady={collection.slug === "studio" && product.slug === "nova-solo"} />
      <SiteFooter />
    </main>
  );
}
