import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteNavigation } from "../../components/site-navigation";
import { collections, getCollection } from "../../collections-data";

export function generateStaticParams() {
  return collections.map((collection) => ({ collection: collection.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  const title = `${collection.name} — kolekcja HENRY`;
  return {
    title,
    description: collection.description,
    openGraph: { title, description: collection.description, images: [collection.hero] },
    twitter: { title, description: collection.description, images: [collection.hero] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection: slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const currentIndex = collections.findIndex((item) => item.slug === collection.slug);
  const next = collections[(currentIndex + 1) % collections.length];

  return (
    <main id="top" className={`collection-detail collection-detail--${collection.slug}`}>
      <SiteNavigation />
      <header className="collection-detail-hero">
        <img src={collection.hero} alt={`Kolekcja ${collection.name} HENRY`} />
      </header>

      <div className="collection-detail-hero__title-bar">
        <h1>{collection.name}</h1>
      </div>

      <section className="product-catalogue">
        <div className="product-gallery">
          {collection.products.map((product, index) => (
            <Link className={`product-pair ${index % 2 ? "product-pair--reverse" : ""} ${product.catalogueScene && product.catalogueCutout ? "is-ready" : "is-placeholder"}`} href={`/kolekcje/${collection.slug}/${product.slug}`} key={product.slug}>
              <div className="product-pair__cutout">
                <figure className="product-pair__cutout-frame">
                  {product.catalogueCutout ? (
                    <img src={product.catalogueCutout} alt={`${product.name} — widok produktu`} loading="lazy" />
                  ) : (
                    <span><i>H</i><small>Materiały<br />w przygotowaniu</small></span>
                  )}
                </figure>
                <figcaption>{product.name}</figcaption>
              </div>
              <figure className="product-pair__scene">
                {product.catalogueScene ? (
                  <img src={product.catalogueScene} alt={`${product.name} we wnętrzu HENRY`} loading="lazy" />
                ) : (
                  <span><em>{String(index + 1).padStart(2, "0")}</em><small>{collection.name}</small></span>
                )}
                <i className="diagonal-arrow" aria-hidden="true" />
              </figure>
            </Link>
          ))}
        </div>
      </section>

      <Link className="next-collection" href={`/kolekcje/${next.slug}`}>
        <p>Następna kolekcja</p><h2>{next.name}</h2><span>Odkryj <i className="diagonal-arrow" aria-hidden="true" /></span>
        <img src={next.hero} alt="" loading="lazy" />
      </Link>
      <SiteFooter />
    </main>
  );
}
