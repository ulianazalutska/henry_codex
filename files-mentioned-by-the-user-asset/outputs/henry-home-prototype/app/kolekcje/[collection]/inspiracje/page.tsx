import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InspiracjeExperience } from "../../../components/inspiracje-experience";
import { collections, getCollection } from "../../../collections-data";

export function generateStaticParams() {
  return collections.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  const title = `Inspiracje — ${collection.name} — HENRY`;
  return {
    title,
    description: `Aranżacje wnętrz z kolekcją ${collection.name} HENRY.`,
    openGraph: { title, images: [collection.hero] },
    twitter: { title, images: [collection.hero] },
  };
}

export default async function InspiracjePage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  return <InspiracjeExperience collection={collection} />;
}
