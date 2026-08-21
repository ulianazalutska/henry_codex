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
        <p>HENRY / Kolekcje</p>
        <h1>Trzy różne<br /><span>sposoby komfortu.</span></h1>
        <div>
          <p>Atelier. Studio. Lounge.</p>
          <span>Każda kolekcja odpowiada na inny rytm wnętrza — od prywatnej sali kinowej po codzienną strefę relaksu.</span>
        </div>
        <i aria-hidden="true" />
      </header>

      <nav className="collections-index-nav" aria-label="Wybierz kolekcję">
        {collections.map((collection) => <a href={`#${collection.slug}`} key={collection.slug}>{collection.index} {collection.name}</a>)}
      </nav>

      <section className="collection-chapters" aria-label="Kolekcje HENRY">
        {collections.map((collection) => (
          <Link id={collection.slug} className="collection-chapter" href={`/kolekcje/${collection.slug}`} key={collection.slug}>
            <img src={collection.hero} alt={`Kolekcja ${collection.name} HENRY`} />
            <span className="collection-chapter__shade" />
            <p>{collection.index} / {collection.overline}</p>
            <h2>{collection.name}</h2>
            <div><span>{collection.description}</span><b>Odkryj kolekcję <i>↗</i></b></div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
