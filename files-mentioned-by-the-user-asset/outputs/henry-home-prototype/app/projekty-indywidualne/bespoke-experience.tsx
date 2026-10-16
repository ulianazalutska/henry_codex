"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./bespoke.module.css";

const media = "/media/projekty-indywidualne";

const customChairs = [
  { image: `${media}/s1/koniakowy-led.webp`, alt: "Fotel w kolorze koniakowym z ciepłym podświetleniem podstawy" },
  { image: `${media}/s1/czerwony-led.webp`, alt: "Czerwony fotel kinowy z pikowaniem i niebieskim podświetleniem LED" },
];

const themes = [
  { image: `${media}/s2/futurystyczne.webp`, label: "Futurystyczne", note: "Sala kinowa z widokiem na Ziemię" },
  { image: `${media}/s2/route-66.webp`, label: "Route 66", note: "Kino retro z wysokimi oparciami" },
  { image: `${media}/s2/noir.webp`, label: "Noir Cinema", note: "Czerń, biel i pikowana skóra" },
  { image: `${media}/s2/haunted.webp`, label: "Haunted Cinema", note: "Klasyczny salon z czerwonymi fotelami" },
  { image: `${media}/s2/space-opera.webp`, label: "Space Opera", note: "Wnętrze statku kosmicznego" },
  { image: `${media}/s2/neon-graffiti.webp`, label: "Neon & graffiti", note: "Miejski klimat i czerwone fotele" },
  { image: `${media}/s2/american-dream.webp`, label: "American Dream", note: "Kino w stylu retro z barem" },
  { image: `${media}/s2/city-scape.webp`, label: "City Scape", note: "Fotele w loftowym wnętrzu z barem" },
];

const spaceRooms = [
  { image: `${media}/s3/classic-czerwien.webp`, alt: "Prywatna sala kinowa z czerwonymi fotelami na podeście" },
  { image: `${media}/s3/oliwka.webp`, alt: "Sala kinowa w oliwkowych tonach z sofą i szezlongiem" },
  { image: `${media}/s3/pomarancz-granat.webp`, alt: "Wielomiejscowa sala kinowa z sofami w kolorach pomarańczu i granatu" },
  { image: `${media}/s3/gwiazdy-czerwien.webp`, alt: "Sala kinowa pod rozgwieżdżonym sufitem z czerwonymi fotelami" },
  { image: `${media}/s3/czern-skora.webp`, alt: "Rząd czarnych skórzanych foteli kinowych na czerwonym dywanie" },
  { image: `${media}/s3/biblioteka.webp`, alt: "Brązowa sofa kinowa przed regałem z kolekcją filmów" },
  { image: `${media}/s3/czern-narozna.webp`, alt: "Czarna sofa narożna i fotele w sali kinowej" },
  { image: `${media}/s3/zolta-sofa.webp`, alt: "Żółta sofa dwuosobowa z poduszkami, wizualizacja produktu" },
];

const spaceExamples = [
  "Indywidualne układy foteli kinowych.",
  "Sofy i siedziska wieloosobowe.",
  "Niestandardowe konfiguracje modułowe.",
  "Fotele i siedziska o indywidualnych wymiarach.",
  "Rozwiązania dla pomieszczeń o nietypowej architekturze.",
  "Specjalne konstrukcje i układy siedzisk.",
];

const technology = [
  {
    id: "komfort",
    label: "Komfort i relaks",
    items: [
      "Zaawansowane systemy regulacji elektrycznej.",
      "Indywidualne systemy masażu.",
      "Podgrzewanie i wentylacja siedzisk.",
      "Mechanizmy obrotowe i bujania.",
      "Indywidualne systemy podparcia ciała.",
    ],
    images: [
      { image: `${media}/s4/masaz.webp`, alt: "Fotel z systemem masażu, infografika stref masażu" },
      { image: `${media}/s4/mechanizm.webp`, alt: "Fotel w pozycji relaksacyjnej, widoczny mechanizm regulacji" },
      { image: `${media}/s4/podgrzewanie.webp`, alt: "Fotel z podgrzewanym siedziskiem i oparciem" },
    ],
  },
  {
    id: "multimedia",
    label: "Multimedia i rozrywka",
    items: [
      "Zintegrowane systemy audio.",
      "Głośniki wibracyjne i systemy basowe.",
      "Indywidualne systemy sterowania.",
      "Integracja z automatyką inteligentnego domu.",
      "Oświetlenie ambientowe.",
    ],
    images: [
      { image: `${media}/s4/bluetooth.webp`, alt: "Fotel ze zintegrowanym głośnikiem i łącznością Bluetooth" },
      { image: `${media}/s4/panel-henry.webp`, alt: "Panel sterowania HENRY Command w podłokietniku" },
      { image: `${media}/s4/uchwyt-led.webp`, alt: "Podłokietnik z niebiesko podświetlanym uchwytem na kubek" },
    ],
  },
  {
    id: "wyposazenie",
    label: "Wyposażenie specjalne",
    items: [
      "Zintegrowane mini lodówki.",
      "Chłodzone i podgrzewane uchwyty na napoje.",
      "Indywidualne konsole i stoliki.",
      "Ukryte schowki i moduły.",
      "Uchwyty na urządzenia mobilne.",
      "Dedykowane rozwiązania na indywidualne zamówienie.",
    ],
    images: [
      { image: `${media}/s4/barek.webp`, alt: "Ukryty barek z drewnianą szufladą w podłokietniku" },
      { image: `${media}/s4/stolik.webp`, alt: "Obrotowy drewniany stolik przy fotelu" },
      { image: `${media}/s4/sterowanie-uchwyt.webp`, alt: "Podłokietnik z uchwytem na kubek i przyciskami sterowania" },
    ],
  },
];

type Craft = {
  id: string;
  label: string;
  tiles: { image: string; alt: string; loupe?: boolean }[];
};

const crafts: Craft[] = [
  {
    id: "pikowanie",
    label: "Sztuka pikowania",
    tiles: [
      { image: `${media}/s5/katalog-pikowanie-skora.webp`, alt: "Katalog wzorów pikowania skóry", loupe: true },
      { image: `${media}/s5/katalog-pikowanie-tkaniny.webp`, alt: "Katalog wzorów pikowania tkanin", loupe: true },
    ],
  },
  {
    id: "szycie",
    label: "Sztuka szycia",
    tiles: [
      { image: `${media}/s5/szycie-burgund.webp`, alt: "Rzemieślnik szyjący burgundową tapicerkę skórzaną" },
      { image: `${media}/s5/katalog-przeszycia.webp`, alt: "Katalog opcji przeszyć tapicerskich", loupe: true },
      { image: `${media}/s5/szew-zielona-skora.webp`, alt: "Szew na zielonej skórze pod stopką maszyny" },
    ],
  },
  {
    id: "materialy",
    label: "Wyjątkowe materiały",
    tiles: [
      { image: `${media}/s5/probki-skor.webp`, alt: "Warstwowe próbki skór w bogatych kolorach" },
      { image: `${media}/s5/tkaniny-aksamit.webp`, alt: "Rolki aksamitnych tkanin w różnych kolorach" },
      { image: `${media}/s5/katalog-forniry-1.webp`, alt: "Katalog fornirów drewnianych", loupe: true },
      { image: `${media}/s5/katalog-forniry-2.webp`, alt: "Katalog fornirów drewnianych, kolejna selekcja", loupe: true },
    ],
  },
];

export function BespokeExperience() {
  const [theme, setTheme] = useState(0);
  const [tech, setTech] = useState(0);
  const [techImage, setTechImage] = useState(0);
  const roomsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = heroRef.current;
    const inner = heroInnerRef.current;
    if (!frame || !inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const span = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      inner.style.transform = `translate3d(0, ${(progress * 16 - 8).toFixed(3)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-proj-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8%" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollRooms = (direction: 1 | -1) => {
    const track = roomsRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  };

  const moveLens = (event: React.MouseEvent<HTMLDivElement>) => {
    const tile = event.currentTarget;
    const lens = tile.querySelector<HTMLElement>("[data-lens]");
    if (!lens) return;
    const rect = tile.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    lens.style.opacity = "1";
    lens.style.left = `${x}%`;
    lens.style.top = `${y}%`;
    lens.style.backgroundPosition = `${x}% ${y}%`;
  };

  const leaveLens = (event: React.MouseEvent<HTMLDivElement>) => {
    const lens = event.currentTarget.querySelector<HTMLElement>("[data-lens]");
    if (lens) lens.style.opacity = "0";
  };

  const activeTech = technology[tech];

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation />

      {/* 00 — Wprowadzenie */}
      <section className={styles.hero} aria-labelledby="bespoke-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Podziel się z nami swoją wizją.</p>
          <h1 id="bespoke-title">Stwórzmy coś wyjątkowego</h1>
          <div className={styles.heroBody}>
            <p>
              Nie wszystkie wyjątkowe projekty istnieją już dziś. Niektóre dopiero czekają na realizację.<br />
              Masz pomysł na fotel, którego nie znalazłeś w żadnej kolekcji?<br />Marzysz o niepowtarzalnym projekcie, wyjątkowej konstrukcji lub rozwiązaniu technologicznym stworzonym specjalnie dla Ciebie?<br />
              W HENRY wierzymy, że najbardziej wyjątkowe projekty powstają wtedy, gdy kreatywność spotyka się z doświadczeniem i możliwościami technologicznymi.<br />
              Dlatego tworzymy również fotele i systemy siedzisk projektowane całkowicie od podstaw z myślą o indywidualnych potrzebach, wyjątkowych wnętrzach i niepowtarzalnych wizjach naszych klientów.<br />
              Od pojedynczego, autorskiego fotela po zaawansowane rozwiązania dla prywatnych kin i luksusowych przestrzeni.
            </p>
          </div>
        </div>
        <figure className={styles.heroImage} ref={heroRef}>
          <div className={styles.heroParallax} ref={heroInnerRef}>
            <img src={`${media}/hero-fotele.webp`} alt="Skórzane zagłówki foteli kinowych w kolorze koniakowym z pikowaniem diamentowym i godłem HENRY" />
          </div>
          <p className={`${styles.eyebrow} ${styles.heroCaption}`}>Twoja wizja<br />Nasze doświadczenie<br />Wspólny projekt</p>
        </figure>
      </section>

      {/* 01 — Indywidualny projekt foteli */}
      <section className={`${styles.chapter} ${styles.chapterCustom}`} aria-labelledby="ch1-title">
        <div className={styles.split}>
          <div className={styles.copyColumn} data-proj-reveal>
            <h2 id="ch1-title">Fotele tworzone<br />od podstaw</h2>
            <p>Tworzymy autorskie projekty foteli, w których każdy element może zostać zaprojektowany zgodnie z indywidualną wizją klienta.</p>
            <p>Forma, proporcje, ergonomia, materiały i detale, wszystko powstaje z myślą o stworzeniu wyjątkowego mebla, który nie jest częścią kolekcji.</p>
            <p>Od minimalistycznej elegancji po odważne, futurystyczne formy. Łączymy kreatywność projektową z wieloletnim doświadczeniem w produkcji luksusowych foteli.</p>
            <p className={styles.statement}>Nie ograniczamy się do gotowych rozwiązań. Tworzymy nowe.</p>
          </div>
          <div className={styles.chairGrid}>
            {customChairs.map((item) => (
              <figure key={item.image} className={styles.chairCard} data-proj-reveal>
                <div><img src={item.image} alt={item.alt} loading="lazy" /></div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — Tematyczne fotele kinowe */}
      <section className={`${styles.chapter} ${styles.chapterDark}`} aria-labelledby="ch2-title">
        <div className={styles.chapterHead} data-proj-reveal>
          <div>
            <h2 id="ch2-title">Kiedy inspiracja staje się<br />projektem.</h2>
            <p className={styles.goldLine}>Fotel, który odzwierciedla Twoją pasję.</p>
          </div>
          <div className={styles.chapterCopy}>
            <p className={styles.lead}>Świat kina, motoryzacji, architektury i nieograniczonej wyobraźni.</p>
            <p>Niektóre fotele mogą być czymś więcej niż elementem wyposażenia wnętrza. Mogą opowiadać historię, nawiązywać do pasji właściciela lub stać się centralnym punktem wyjątkowej przestrzeni.</p>
            <p>Projektujemy fotele inspirowane światem filmu, science fiction, motoryzacji, kosmosu i współczesnego designu.</p>
            <p>Każdy projekt jest indywidualną interpretacją wybranego motywu, łączącą oryginalne wzornictwo z komfortem i funkcjonalnością.</p>
          </div>
        </div>

        <div className={styles.themeViewer} data-proj-reveal>
          <div className={styles.themeStage}>
            {themes.map((item, index) => (
              <img
                key={item.image}
                src={item.image}
                alt={`${item.label} — ${item.note}`}
                loading={index === 0 ? "eager" : "lazy"}
                className={index === theme ? styles.isActive : undefined}
                aria-hidden={index === theme ? undefined : true}
              />
            ))}
          </div>
          <ul className={styles.themeList} role="tablist" aria-label="Motywy projektów">
            {themes.map((item, index) => (
              <li key={item.label}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === theme}
                  className={index === theme ? styles.isActive : undefined}
                  onClick={() => setTheme(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <em>{item.note}</em>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Rozwiązania dla przestrzeni */}
      <section className={styles.chapter} aria-labelledby="ch3-title">
        <div className={styles.spaceTop} data-proj-reveal>
          <div className={styles.spaceCopy}>
            <h2 id="ch3-title">Rozwiązania stworzone<br />dla Twojej przestrzeni</h2>
            <p className={styles.spaceLead}>Każda przestrzeń zasługuje na indywidualne podejście.</p>
            <p>Projektujemy niestandardowe systemy siedzisk dostosowane do architektury wnętrza, liczby użytkowników oraz oczekiwanej funkcjonalności.</p>
            <p>Od pojedynczych foteli i ekskluzywnych sof po wielomiejscowe konfiguracje, rozwiązania modułowe i specjalistyczne systemy dla prywatnych sal kinowych.</p>
            <p>Tworzymy rozwiązania, które łączą komfort, ergonomię i wyjątkową estetykę.</p>
          </div>

          <div className={styles.roomsWrap}>
            <div className={styles.roomsTrack} ref={roomsRef} aria-label="Przykłady sal kinowych i aranżacji">
              {spaceRooms.map((item) => (
                <figure key={item.image} className={styles.roomCard}>
                  <img src={item.image} alt={item.alt} loading="lazy" draggable={false} />
                </figure>
              ))}
            </div>
            <div className={styles.roomsControls}>
              <button type="button" onClick={() => scrollRooms(-1)} aria-label="Poprzednie zdjęcia">
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
                  <path d="M8 1L1.5 7.5L8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button type="button" onClick={() => scrollRooms(1)} aria-label="Następne zdjęcia">
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
                  <path d="M1 1L7.5 7.5L1 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.spaceFoot} data-proj-reveal>
          <div>
            <h3 className={styles.listTitle}>Przykładowe możliwości</h3>
            <ul className={styles.ruleList}>
              {spaceExamples.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <p className={styles.bigStatement}>Nie dopasowujemy przestrzeni do mebli<br /><em>Projektujemy meble dla przestrzeni</em></p>
        </div>
      </section>

      {/* 04 — Komfort i technologia */}
      <section className={`${styles.chapter} ${styles.chapterDark}`} aria-labelledby="ch4-title">
        <div className={styles.chapterHead} data-proj-reveal>
          <div>
            <h2 id="ch4-title">Innowacje projektowane<br /><em>wokół Ciebie</em></h2>
          </div>
          <div className={styles.chapterCopy}>
            <p className={styles.lead}>Komfort przyszłości zaczyna się od indywidualnych potrzeb</p>
            <p>Nowoczesne technologie otwierają zupełnie nowe możliwości projektowania luksusowych siedzisk.</p>
            <p>W HENRY możemy opracowywać indywidualne rozwiązania łączące zaawansowaną mechanikę, elektronikę, multimedia i funkcje komfortu.</p>
            <p>Od inteligentnych systemów regulacji po zintegrowane rozwiązania audio, oświetlenie i dodatkowe wyposażenie — technologia staje się integralną częścią projektu.</p>
            <p>Projektujemy komfort, który wykracza poza standardowe rozwiązania.</p>
          </div>
        </div>

        <div className={styles.techBlock} data-proj-reveal>
          <p className={styles.techTitle}>Możliwości technologiczne</p>
          <p className={styles.footnote}>Wszystkie rozwiązania technologiczne podlegają indywidualnej analizie konstrukcyjnej i technicznej.</p>
          <div className={styles.techTabs} role="tablist" aria-label="Obszary technologii">
            {technology.map((group, index) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                id={`tech-tab-${group.id}`}
                aria-selected={index === tech}
                aria-controls="tech-panel"
                className={index === tech ? styles.isActive : undefined}
                onClick={() => { setTech(index); setTechImage(0); }}
              >
                {group.label}
              </button>
            ))}
          </div>
          <div className={styles.techPanel} id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${activeTech.id}`} key={activeTech.id}>
            <ul className={styles.ruleList}>
              {activeTech.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.techGallery}>
              <div className={styles.techStage}>
                {activeTech.images.map((item, index) => (
                  <img
                    key={item.image}
                    src={item.image}
                    alt={item.alt}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={index === techImage ? styles.isActive : undefined}
                    aria-hidden={index === techImage ? undefined : true}
                  />
                ))}
              </div>
              <ul className={styles.techThumbs}>
                {activeTech.images.map((item, index) => (
                  <li key={item.image}>
                    <button
                      type="button"
                      className={index === techImage ? styles.isActive : undefined}
                      onClick={() => setTechImage(index)}
                      aria-label={`Pokaż zdjęcie ${index + 1}: ${item.alt}`}
                      aria-pressed={index === techImage}
                    >
                      <img src={item.image} alt="" loading="lazy" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Materiały i kunszt wykonania */}
      <section className={`${styles.chapter} ${styles.chapterMaterials}`} aria-labelledby="ch5-title">
        <div className={styles.chapterHead} data-proj-reveal>
          <div>
            <p className={styles.kicker}>Ekskluzywne materiały i kunszt wykonania</p>
            <h2 id="ch5-title">Detale tworzone dla<br />wyjątkowych projektów</h2>
            <p className={styles.goldLine}>Każdy detal może powstać specjalnie dla Twojego projektu</p>
          </div>
          <div className={styles.chapterCopy}>
            <p className={styles.lead}>Indywidualny projekt zasługuje na indywidualne wykończenie</p>
            <p>W autorskich realizacjach HENRY materiały i detale stają się integralną częścią procesu projektowego.</p>
            <p>Ekskluzywne skóry, wyjątkowe tkaniny, szlachetne drewno, niestandardowe elementy dekoracyjne oraz indywidualnie opracowane przeszycia i pikowania pozwalają nadać każdemu projektowi niepowtarzalny charakter.</p>
            <p>Nie ograniczamy się do standardowej palety materiałów ani gotowych wzorów.</p>
          </div>
        </div>

        <div className={styles.crafts}>
          {crafts.map((craft) => (
            <div key={craft.id} className={styles.craft} data-proj-reveal>
              <h3>{craft.label}</h3>
              <div className={`${styles.craftTiles} ${styles[`tiles${craft.tiles.length}`]}`}>
                {craft.tiles.map((tile) => (
                  tile.loupe ? (
                    <div key={tile.image} className={`${styles.craftTile} ${styles.hasLens}`} onMouseMove={moveLens} onMouseLeave={leaveLens}>
                      <img src={tile.image} alt={tile.alt} loading="lazy" />
                      <span className={styles.lens} data-lens style={{ backgroundImage: `url(${tile.image})` }} aria-hidden="true" />
                    </div>
                  ) : (
                    <div key={tile.image} className={styles.craftTile}>
                      <img src={tile.image} alt={tile.alt} loading="lazy" />
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta} data-proj-reveal>
        <div>
          <p className={styles.eyebrow}>Zacznijmy rozmowę</p>
          <h2>Twoja wizja<br /><em>Nasze doświadczenie</em><br />Wspólny projekt</h2>
        </div>
        <Link href={`/kontakt?topic=${encodeURIComponent("Projekt indywidualny")}`} className={styles.ctaLink}>
          Opowiedz nam o swoim projekcie <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
