export type BlogCategoryKey = "rzemioslo" | "materialy" | "wnetrza" | "z-zycia-henry";

export const blogCategories: Record<BlogCategoryKey, string> = {
  rzemioslo: "Rzemiosło",
  materialy: "Materiały",
  wnetrza: "Wnętrza i realizacje",
  "z-zycia-henry": "Z życia HENRY",
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryKey;
  date: string; // ISO 8601
  readingTime: string;
  coverImage: string;
  body: string[]; // paragraphs, placeholder copy until real editorial content is supplied
};

// Treść placeholder — tytuły i kategorie odzwierciedlają kierunek redakcyjny bloga HENRY
// (rzemiosło, materiały, realizacje wnętrz), ale opisy i treść są zaślepkami do uzupełnienia
// realnym materiałem (teksty, zdjęcia, daty) przed publikacją. Nie wpisywać jako fakty o marce.
export const blogPosts: BlogPost[] = [
  {
    slug: "jak-powstaje-fotel-henry",
    title: "Jak powstaje fotel HENRY — od szkicu do gotowego mebla",
    excerpt: "Zaglądamy za kulisy pracowni: od doboru konstrukcji, przez tapicerowanie, po ostatni detal wykończenia.",
    category: "rzemioslo",
    date: "2026-01-01",
    readingTime: "6 min",
    coverImage: "/media/blog/jak-powstaje-fotel-henry/cover.webp",
    body: [
      "[Placeholder] Tekst wprowadzający do procesu produkcji — do uzupełnienia realnym materiałem z pracowni HENRY.",
      "[Placeholder] Kolejny akapit opisujący konkretny etap (np. dobór drewna lub konstrukcji) — wymaga potwierdzonych faktów.",
      "[Placeholder] Akapit zamykający, prowadzący czytelnika do kolekcji lub personalizacji.",
    ],
  },
  {
    slug: "przewodnik-po-skorach-i-tkaninach",
    title: "Przewodnik po skórach i tkaninach HENRY",
    excerpt: "Czym różnią się materiały obiciowe dostępne w kolekcjach Atelier, Studio i Lounge — i jak dobrać je do wnętrza.",
    category: "materialy",
    date: "2026-01-01",
    readingTime: "5 min",
    coverImage: "/media/blog/przewodnik-po-skorach-i-tkaninach/cover.webp",
    body: [
      "[Placeholder] Wprowadzenie do palety materiałów — do uzupełnienia realnymi nazwami i charakterystyką skór/tkanin.",
      "[Placeholder] Wskazówki doboru koloru i faktury do typu wnętrza.",
      "[Placeholder] Odesłanie do strony personalizacji.",
    ],
  },
  {
    slug: "prywatne-kino-domowe-inspiracje",
    title: "Prywatne kino domowe — inspiracje z realizacji HENRY",
    excerpt: "Jak fotele z kolekcji Studio budują atmosferę sali kinowej razem z architekturą i światłem wnętrza.",
    category: "wnetrza",
    date: "2026-01-01",
    readingTime: "4 min",
    coverImage: "/media/blog/prywatne-kino-domowe-inspiracje/cover.webp",
    body: [
      "[Placeholder] Opis wybranej realizacji lub koncepcji wnętrza — wymaga zdjęć i faktów potwierdzonych przez klienta/HENRY.",
      "[Placeholder] Akapit o roli układu rzędowego i personalizacji w projekcie.",
      "[Placeholder] Zaproszenie do kontaktu w sprawie własnego projektu.",
    ],
  },
  {
    slug: "jak-dbac-o-skorzany-fotel",
    title: "Jak dbać o skórzany fotel, by służył przez lata",
    excerpt: "Codzienna pielęgnacja, ochrona przed słońcem i wilgocią oraz najczęstsze błędy przy czyszczeniu skóry.",
    category: "materialy",
    date: "2026-01-01",
    readingTime: "4 min",
    coverImage: "/media/blog/jak-dbac-o-skorzany-fotel/cover.webp",
    body: [
      "[Placeholder] Wprowadzenie o tym, dlaczego regularna pielęgnacja wydłuża życie tapicerki skórzanej — do uzupełnienia zaleceniami potwierdzonymi przez HENRY.",
      "[Placeholder] Akapit o czyszczeniu na co dzień i czego unikać (środki, temperatura, nasłonecznienie).",
      "[Placeholder] Akapit zamykający z odesłaniem do indywidualnych zaleceń pielęgnacyjnych przekazywanych z fotelem.",
    ],
  },
  {
    slug: "personalizacja-krok-po-kroku",
    title: "Personalizacja fotela HENRY krok po kroku",
    excerpt: "Jak wygląda droga od pierwszej konsultacji, przez dobór materiałów i funkcji, po odbiór gotowego mebla.",
    category: "rzemioslo",
    date: "2026-01-01",
    readingTime: "5 min",
    coverImage: "/media/blog/personalizacja-krok-po-kroku/cover.png",
    body: [
      "[Placeholder] Opis pierwszego etapu — konsultacji i ustalenia potrzeb klienta — do uzupełnienia realnym przebiegiem procesu.",
      "[Placeholder] Akapit o doborze materiałów, koloru i dodatkowych funkcji elektrycznych.",
      "[Placeholder] Akapit o realizacji i odbiorze mebla, z odesłaniem do strony personalizacji.",
    ],
  },
  {
    slug: "za-kulisami-pracowni-henry",
    title: "Za kulisami pracowni HENRY",
    excerpt: "Ludzie, narzędzia i codzienna praca, które stoją za każdym fotelem opuszczającym pracownię.",
    category: "z-zycia-henry",
    date: "2026-01-01",
    readingTime: "4 min",
    coverImage: "/media/blog/za-kulisami-pracowni-henry/cover.png",
    body: [
      "[Placeholder] Wprowadzenie do zespołu i miejsca powstawania mebli — wymaga potwierdzonych informacji o pracowni.",
      "[Placeholder] Akapit o konkretnym rzemieślniku, narzędziu lub etapie pracy wartym pokazania.",
      "[Placeholder] Akapit zamykający, zapraszający do poznania historii marki.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategoryKey) {
  return blogPosts.filter((post) => post.category === category);
}

export function getAdjacentBlogPosts(slug: string) {
  const index = blogPosts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: blogPosts[index - 1],
    next: blogPosts[index + 1],
  };
}
