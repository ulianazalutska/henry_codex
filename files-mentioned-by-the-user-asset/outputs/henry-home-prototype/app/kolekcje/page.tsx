import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import { collections } from "../collections-data";

export const metadata: Metadata = {
  title: "Kolekcje — HENRY",
  description: "Poznaj kolekcje foteli HENRY: Atelier, Studio i Lounge.",
  openGraph: { title: "Kolekcje — HENRY", description: "Trzy różne sposoby odczuwania komfortu.", images: [collections[0].hero] },
  twitter: { title: "Kolekcje — HENRY", description: "Trzy różne sposoby odczuwania komfortu.", images: [collections[0].hero] },
};

export default function CollectionsPage() {
  return (
    <main id="top" className="collections-page">
      <SiteNavigation />
      <header className="collections-index-hero">
        <div className="collections-index-hero__row">
          <h1>Trzy różne<br /><span>sposoby komfortu</span></h1>
          <span className="collections-index-hero__lead">Każda kolekcja odpowiada na inny rytm wnętrza — od prywatnej sali kinowej po codzienną strefę relaksu.</span>
        </div>
      </header>

      <section className="collection-chapters" aria-label="Kolekcje HENRY">
        {collections.map((collection) => (
          <Link id={collection.slug} className="collection-chapter" href={`/kolekcje/${collection.slug}`} key={collection.slug}>
            <img src={collection.hero} alt={`Kolekcja ${collection.name} HENRY`} />
            <span className="collection-chapter__shade" />
            <div className="collection-chapter__caption">
              <h2>{collection.name}</h2>
              <span className="collection-chapter__cta">
                Zobacz wszystkie elementy kolekcji
                <img className="collection-chapter__arrow" src="/media/arrow-gold.svg" alt="" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
