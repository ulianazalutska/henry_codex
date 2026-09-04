"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./faq.module.css";

type FaqLink = { href: string; label: string };
type FaqItem = { question: string; answer: string; link?: FaqLink };
type CategoryKey =
  | "produkty"
  | "kino"
  | "personalizacja"
  | "materialy"
  | "wymiary"
  | "zamowienia"
  | "dostawa"
  | "serwis"
  | "architekci";

const categories: Record<CategoryKey, string> = {
  produkty: "Produkty",
  kino: "Fotele kinowe i kino domowe",
  personalizacja: "Konfiguracja i personalizacja",
  materialy: "Materiały i kolory",
  wymiary: "Wymiary i montaż",
  zamowienia: "Zamówienia i wyceny",
  dostawa: "Dostawa i realizacja",
  serwis: "Serwis i gwarancja",
  architekci: "Dla architektów",
};

// Treść placeholder — pytania z briefu klienta, odpowiedzi ograniczone do faktów
// potwierdzonych już na stronie (historia, kolekcje, personalizacja). Do uzupełnienia
// realnymi szczegółami (wymiary, gwarancja, dostawa zagraniczna) przed publikacją.
const faqData: Record<CategoryKey, FaqItem[]> = {
  produkty: [
    {
      question: "Jakie fotele oferuje HENRY?",
      answer:
        "HENRY tworzy fotele kinowe i meble tapicerowane w trzech kolekcjach — Atelier, Studio i Lounge — od pojedynczych foteli po większe, modułowe układy.",
      link: { href: "/kolekcje", label: "Zobacz kolekcje" },
    },
    {
      question: "Czy HENRY produkuje fotele na zamówienie?",
      answer:
        "Tak, każdy fotel HENRY jest meblem na zamówienie — dobieramy model, materiał i konfigurację indywidualnie do klienta.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Czy można zamówić mebel w indywidualnym rozmiarze lub układzie?",
      answer:
        "Tak, w ramach projektów indywidualnych realizujemy niestandardowe konfiguracje dopasowane do konkretnego wnętrza.",
      link: { href: "/projekty-indywidualne", label: "Projekty indywidualne" },
    },
    {
      question: "Czy fotele HENRY są produkowane w Polsce?",
      answer:
        "Tak, fotele HENRY powstają w Polsce — nasza historia sięga niewielkiego zakładu tapicerskiego w Bydgoszczy z lat 80.",
      link: { href: "/filozofia-henry", label: "Poznaj historię HENRY" },
    },
    {
      question: "Jakie kolekcje mebli są dostępne?",
      answer: "Obecnie oferujemy trzy kolekcje: Atelier, Studio i Lounge — każda z własnym charakterem i zestawem modeli.",
      link: { href: "/kolekcje", label: "Zobacz kolekcje" },
    },
    {
      question: "Czy dostępne są pojedyncze fotele i całe zestawy?",
      answer:
        "Tak, w ofercie znajdują się zarówno pojedyncze fotele (Solo), jak i układy dwu- i wieloosobowe oraz zestawy modułowe.",
    },
    {
      question: "Czy można połączyć fotele w rzędy?",
      answer:
        "Tak, kolekcja Studio została zaprojektowana z myślą o pełnych salach kinowych i układach rzędowych.",
      link: { href: "/kolekcje/studio", label: "Zobacz kolekcję Studio" },
    },
  ],
  kino: [
    {
      question: "Jak wybrać fotele do kina domowego?",
      answer:
        "Dobór modelu zależy od wielkości pomieszczenia, liczby miejsc i oczekiwanego komfortu — najlepiej omówić to podczas konsultacji z naszym zespołem.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Czy fotele kinowe HENRY są rozkładane?",
      answer: "Wybrane modele oferują elektrycznie rozkładane oparcie i podnóżek, rozwijane niezależnymi silnikami.",
      link: { href: "/personalizacja", label: "Zobacz opcje personalizacji" },
    },
    {
      question: "Czy fotele kinowe można ustawić w kilku rzędach?",
      answer: "Tak, kolekcja Studio jest projektowana modułowo, tak aby współpracować z architekturą całej sali kinowej.",
      link: { href: "/kolekcje/studio", label: "Zobacz kolekcję Studio" },
    },
    {
      question: "Czy można zamówić fotele z dodatkowymi funkcjami?",
      answer:
        "Tak — wśród dostępnych opcji personalizacji są m.in. elektryczny podgłówek, podgrzewany/chłodzony uchwyt na napój, mata grzewcza czy uchwyt na telefon i tablet.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Czy HENRY produkuje fotele do kin komercyjnych i prywatnych sal kinowych?",
      answer:
        "Tak, nasze rozwiązania trafiają zarówno do prywatnych sal kinowych, jak i realizacji na zamówienie o większej skali.",
      link: { href: "/filozofia-henry", label: "Poznaj historię HENRY" },
    },
  ],
  personalizacja: [
    {
      question: "Czy można skonfigurować własny fotel?",
      answer:
        "Tak — personalizacja jest jednym z fundamentów HENRY. Kolor, materiał, funkcjonalność i forma dopasowywane są do charakteru wnętrza.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Jakie elementy fotela można personalizować?",
      answer:
        "Można wybrać m.in. rodzaj i kolor tapicerki, wykończenie drewna, haft z logo, inicjałami lub datą, a także dodatkowe funkcje elektryczne.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Czy można wybrać kolor i rodzaj tapicerki?",
      answer: "Tak, dostępny jest wybór skór i tkanin w wielu kolorach — dobieramy je razem z klientem do wybranego modelu.",
    },
    {
      question: "Czy można zamówić niestandardową konfigurację lub mebel według własnego projektu?",
      answer:
        "Tak — w ramach projektów indywidualnych realizujemy koncepcje wykraczające poza standardową ofertę katalogową.",
      link: { href: "/projekty-indywidualne", label: "Projekty indywidualne" },
    },
    {
      question: "Czy można zamówić kilka różnych konfiguracji w jednym projekcie?",
      answer: "Tak, przy większych realizacjach (np. całej sali kinowej) różne fotele mogą mieć różne konfiguracje i wykończenia.",
    },
  ],
  materialy: [
    {
      question: "Jakie tkaniny i skóry są dostępne?",
      answer:
        "Oferujemy starannie dobrane skóry i tkaniny obiciowe w wielu kolorach i fakturach. Pełną paletę prezentujemy podczas konsultacji.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Czy fotele są dostępne w skórze naturalnej?",
      answer: "Tak, skóra jest jednym z materiałów obiciowych dostępnych w ofercie HENRY.",
    },
    {
      question: "Czy można połączyć różne kolory tapicerki lub wybrać kolor drewna?",
      answer: "Tak, łączenie kolorów i wykończeń drewnianych elementów jest częścią procesu personalizacji fotela.",
      link: { href: "/personalizacja", label: "Zobacz personalizację" },
    },
    {
      question: "Jak dbać i czyścić tapicerkę fotela?",
      answer:
        "Zalecenia pielęgnacyjne zależą od wybranego materiału obiciowego — przekazujemy je indywidualnie wraz z fotelem.",
    },
  ],
  wymiary: [
    {
      question: "Jakie są wymiary foteli i sof HENRY?",
      answer:
        "Wymiary różnią się w zależności od modelu i kolekcji — szczegółowe dane znajdziesz na stronie konkretnego produktu lub uzyskasz je od naszego zespołu.",
      link: { href: "/kolekcje", label: "Zobacz kolekcje" },
    },
    {
      question: "Ile miejsca potrzeba przed fotelem i między rzędami?",
      answer:
        "Zalecany odstęp zależy od układu pomieszczenia i wybranego modelu — pomagamy to ustalić na etapie projektu, szczególnie przy realizacjach dla architektów.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Czy fotele wymagają montażu i czy HENRY go zapewnia?",
      answer: "Tak, dostawa i montaż fotela w docelowej przestrzeni są częścią naszej usługi — szczegóły ustalamy przy finalizacji zamówienia.",
    },
    {
      question: "Czy można zamówić mebel o niestandardowych wymiarach?",
      answer: "Tak, niestandardowe wymiary realizujemy w ramach projektów indywidualnych.",
      link: { href: "/projekty-indywidualne", label: "Projekty indywidualne" },
    },
  ],
  zamowienia: [
    {
      question: "Jak zamówić fotel HENRY?",
      answer:
        "Zamówienie zaczyna się od konsultacji, podczas której omawiamy model, materiały i wymiary przestrzeni. Po ustaleniu szczegółów przygotowujemy wycenę i harmonogram realizacji.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Czy produkty HENRY można kupić online?",
      answer:
        "HENRY nie jest sklepem internetowym — każde zamówienie prowadzimy indywidualnie, od konsultacji po realizację.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Czy można otrzymać wycenę przed zamówieniem?",
      answer: "Tak, wycenę przygotowujemy po konsultacji dotyczącej wybranego modelu, materiałów i zakresu personalizacji.",
      link: { href: "/kontakt", label: "Poproś o wycenę" },
    },
    {
      question: "Jak przygotować zapytanie ofertowe?",
      answer:
        "Napisz do nas przez formularz kontaktowy, podając interesujący model, przybliżoną liczbę foteli i charakter projektu — odpowiemy z dalszymi krokami.",
      link: { href: "/kontakt", label: "Formularz kontaktowy" },
    },
    {
      question: "Czy HENRY realizuje zamówienia dla inwestycji komercyjnych?",
      answer: "Tak, realizujemy również większe projekty — skontaktuj się z nami, aby omówić szczegóły inwestycji.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
  ],
  dostawa: [
    {
      question: "Jak wygląda transport i dostawa mebli?",
      answer: "Dostawę organizujemy indywidualnie do wskazanej lokalizacji — szczegóły transportu ustalamy przy zamówieniu.",
    },
    {
      question: "Czy HENRY oferuje wniesienie i montaż?",
      answer: "Tak, dostawa i montaż fotela w Twojej przestrzeni są częścią naszej usługi.",
    },
    {
      question: "Ile trwa realizacja i dostawa zamówienia?",
      answer:
        "Czas realizacji zależy od wybranego modelu oraz zakresu personalizacji. Dokładny termin podajemy indywidualnie po potwierdzeniu zamówienia.",
    },
    {
      question: "Czy możliwa jest dostawa poza Polską?",
      answer: "Zakres dostaw ustalamy indywidualnie w zależności od lokalizacji — napisz do nas, aby to sprawdzić.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
  ],
  serwis: [
    {
      question: "Czy fotele HENRY objęte są gwarancją?",
      answer: "Każdy fotel objęty jest gwarancją. Szczegółowe warunki przekazujemy w dokumentacji dołączonej do zamówienia.",
    },
    {
      question: "Jak zgłosić problem z produktem?",
      answer: "W razie pytań serwisowych prosimy o kontakt bezpośredni — ustalimy dalsze kroki indywidualnie.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Jak dbać o fotel, aby służył przez lata?",
      answer:
        "Regularna, delikatna pielęgnacja zgodna z zaleceniami dla wybranego materiału obiciowego pozwala zachować jego wygląd na długo.",
    },
  ],
  architekci: [
    {
      question: "Czy HENRY współpracuje z architektami i projektantami wnętrz?",
      answer:
        "Tak, chętnie współpracujemy z architektami przy projektach prywatnych sal kinowych i wnętrz na zamówienie.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Czy dostępne są modele 3D, pliki CAD lub specyfikacje techniczne?",
      answer:
        "Dedykowana strefa materiałów dla architektów jest obecnie w przygotowaniu. Do czasu jej uruchomienia niezbędne materiały przekazujemy indywidualnie po kontakcie.",
      link: { href: "/kontakt", label: "Skontaktuj się z nami" },
    },
    {
      question: "Jak uzyskać dostęp do materiałów projektowych HENRY?",
      answer: "Napisz do nas bezpośrednio, opisując projekt — prześlemy dostępne materiały i ustalimy dalszą współpracę.",
      link: { href: "/kontakt", label: "Formularz kontaktowy" },
    },
  ],
};

export function FaqExperience() {
  const categoryKeys = Object.keys(categories) as CategoryKey[];
  const [selected, setSelected] = useState<CategoryKey>(categoryKeys[0]);

  return (
    <main className={styles.page}>
      <SiteNavigation />

      <section className={styles.intro}>
        <p>Masz pytania?</p>
        <h1>FAQ</h1>
        <p className={styles.introText}>
          Odpowiedzi na najczęściej zadawane pytania o fotele kinowe, fotele do kina domowego, sofy i meble
          tapicerowane HENRY — od zamówienia po personalizację i dostawę.
        </p>
      </section>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          {categoryKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={styles.sidebarItem}
              data-active={selected === key}
            >
              <span className={styles.sidebarLabel}>{categories[key]}</span>
              {selected === key && (
                <motion.span
                  layoutId="faq-sidebar-highlight"
                  className={styles.sidebarHighlight}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={styles.listInner}
            >
              <h2 className={styles.contentTitle}>{categories[selected]}</h2>
              {faqData[selected].map((item) => (
                <FaqRow key={item.question} {...item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

function FaqRow({ question, answer, link }: FaqItem) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.row} data-open={isOpen}>
      <button
        type="button"
        className={styles.rowHeader}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className={styles.rowQuestion}>{question}</span>
        <span className={styles.rowIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={styles.rowBody}
      >
        <p>{answer}</p>
        {link && (
          <Link href={link.href} className={styles.rowLink}>
            {link.label} →
          </Link>
        )}
      </motion.div>
    </div>
  );
}
