export type HenryProduct = {
  name: string;
  slug: string;
  image: string;
  catalogueImage?: string;
  catalogueFit?: "cover" | "contain";
  catalogueScene?: string;
  catalogueCutout?: string;
  description: string;
};

export type HenryCollection = {
  name: string;
  slug: string;
  index: string;
  overline: string;
  description: string;
  statement: string;
  hero: string;
  detail: string;
  products: HenryProduct[];
};

export const collections: HenryCollection[] = [
  {
    name: "Atelier",
    slug: "atelier",
    index: "01",
    overline: "Rzemiosło w najbardziej osobistej formie",
    description: "Kolekcja dla prywatnych wnętrz, w których detal, szlachetne materiały i indywidualne wykończenie tworzą jeden spokojny gest.",
    statement: "Rzeźbiarska forma. Precyzja wykonania. Komfort dopasowany do Ciebie.",
    hero: "/media/collection-pages/atelier-hero.webp",
    detail: "/media/collection-pages/atelier-detail.webp",
    products: [
      { name: "Vesper Solo", slug: "vesper-solo", image: "/media/vesper-stone.webp", catalogueImage: "/media/collection-pages/atelier-vesper-solo.webp", catalogueFit: "contain", description: "Indywidualny fotel kinowy o pełnej, otulającej formie." },
      { name: "Vesper Duo", slug: "vesper-duo", image: "/media/atelier-ivory.webp", catalogueImage: "/media/collection-pages/atelier-vesper-duo.webp", description: "Dwa miejsca połączone wspólnym rytmem i detalem." },
      { name: "Vesper Ensemble", slug: "vesper-ensemble", image: "/media/atelier-caramel-room.webp", catalogueImage: "/media/collection-pages/atelier-vesper-ensemble.webp", catalogueFit: "contain", description: "Modułowy układ dla większej, prywatnej strefy seansu." },
      { name: "Vesper Chaise", slug: "vesper-chaise", image: "/media/vesper-graphite.webp", catalogueImage: "/media/collection-pages/atelier-vesper-chaise.webp", description: "Wydłużona forma stworzona do pełnego odprężenia." },
      { name: "Vesper Crest", slug: "vesper-crest", image: "/media/atelier-caramel-study.webp", catalogueImage: "/media/collection-pages/atelier-vesper-crest.webp", description: "Najbardziej reprezentacyjna interpretacja linii Vesper." },
    ],
  },
  {
    name: "Studio",
    slug: "studio",
    index: "02",
    overline: "Architektura prywatnego kina",
    description: "Kolekcja zaprojektowana dla kompletnych sal kinowych — czytelna, modułowa i gotowa współpracować z rytmem architektury.",
    statement: "Każdy rząd, światło i proporcja budują jedno doświadczenie.",
    hero: "/media/collection-pages/studio-hero.webp",
    detail: "/media/collection-pages/studio-detail.webp",
    products: [
      { name: "Nova Solo", slug: "nova-solo", image: "/media/studio-black.webp", catalogueImage: "/media/collection-pages/studio-nova-solo.webp", catalogueFit: "contain", catalogueScene: "/media/collection-pages/studio-products/nova-solo-scene.png", catalogueCutout: "/media/collection-pages/studio-products/nova-solo-cutout.png", description: "Samodzielny fotel o czystej, architektonicznej linii." },
      { name: "Nova Duo", slug: "nova-duo", image: "/media/studio-cinema-front.webp", catalogueImage: "/media/collection-pages/studio-nova-duo.webp", catalogueFit: "contain", catalogueScene: "/media/collection-pages/studio-products/nova-duo-scene.png", catalogueCutout: "/media/collection-pages/studio-products/nova-duo-cutout.png", description: "Kameralna konfiguracja dla dwojga." },
      { name: "Nova Ensemble", slug: "nova-ensemble", image: "/media/studio-cinema-wide.webp", catalogueImage: "/media/collection-pages/studio-nova-ensemble.webp", catalogueFit: "contain", catalogueScene: "/media/collection-pages/studio-products/nova-ensemble-scene.png", catalogueCutout: "/media/collection-pages/studio-products/nova-ensemble-cutout.png", description: "Elastyczny układ dla wielorzędowych sal kinowych." },
      { name: "Nova Chaise", slug: "nova-chaise", image: "/media/private-viewing.webp", catalogueImage: "/media/collection-pages/studio-nova-chaise.webp", catalogueFit: "contain", catalogueScene: "/media/collection-pages/studio-products/nova-chaise-scene.png", catalogueCutout: "/media/collection-pages/studio-products/nova-chaise-cutout.png", description: "Kinowa ergonomia w bardziej swobodnej proporcji." },
      { name: "Nova Crest", slug: "nova-crest", image: "/media/studio-cinema-bespoke.webp", catalogueImage: "/media/collection-pages/studio-nova-crest.webp", catalogueFit: "contain", catalogueScene: "/media/collection-pages/studio-products/nova-crest-scene.png", catalogueCutout: "/media/collection-pages/studio-products/nova-crest-cutout.png", description: "Rozbudowana konfiguracja dla najbardziej wymagających wnętrz." },
    ],
  },
  {
    name: "Lounge",
    slug: "lounge",
    index: "03",
    overline: "Codzienny rytuał komfortu",
    description: "Swobodna kolekcja do salonu, strefy relaksu i domowej przestrzeni odsłuchowej — miękka w odbiorze, precyzyjna w detalu.",
    statement: "Kino, muzyka i cisza — w rytmie codzienności.",
    hero: "/media/collection-pages/lounge-hero.webp",
    detail: "/media/collection-pages/lounge-detail.webp",
    products: [
      { name: "Solaris Solo", slug: "solaris-solo", image: "/media/lounge-evening-alt.webp", catalogueImage: "/media/collection-pages/lounge-solaris-solo.webp", catalogueFit: "contain", description: "Obrotowy fotel wypoczynkowy o miękkiej, eleganckiej bryle." },
      { name: "Solaris Duo", slug: "solaris-duo", image: "/media/lounge-ivory-pair.webp", catalogueImage: "/media/collection-pages/lounge-solaris-duo.webp", catalogueFit: "contain", description: "Komfort dla dwojga w lekkiej, salonowej kompozycji." },
      { name: "Solaris Chaise", slug: "solaris-chaise", image: "/media/lounge-pair.webp", catalogueImage: "/media/collection-pages/lounge-solaris-chaise.webp", description: "Wydłużona forma do odpoczynku, filmu i muzyki." },
      { name: "Solaris Orbit", slug: "solaris-orbit", image: "/media/atelier-solaris.webp", catalogueImage: "/media/collection-pages/lounge-solaris-orbit.webp", description: "Rzeźbiarska reinterpretacja fotela lounge." },
    ],
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProduct(collectionSlug: string, productSlug: string) {
  const collection = getCollection(collectionSlug);
  const product = collection?.products.find((item) => item.slug === productSlug);
  return collection && product ? { collection, product } : undefined;
}
