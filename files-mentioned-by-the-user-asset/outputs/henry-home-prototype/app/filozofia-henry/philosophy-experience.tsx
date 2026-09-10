"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./philosophy.module.css";

const sketchGalleryImages = [
  "/media/filozofia-henry/sketch-gallery-1.png",
  "/media/filozofia-henry/sketch-gallery-2.png",
  "/media/filozofia-henry/sketch-gallery-3.png",
  "/media/filozofia-henry/sketch-gallery-4-gmina-logo.png",
];

// Karuzela historii tymczasowo wyłączona (patrz sekcja "Dziedzictwo kina" niżej) — dane zachowane na wypadek powrotu.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeline = [
  {
    label: "Lata 80.",
    caption: "Początek historii",
    description:
      "Historia HENRY sięga lat 80., kiedy w oficynie kamienicy w centrum Bydgoszczy powstał niewielki zakład tapicerski. Od początku najważniejsze były jakość, precyzja i bezkompromisowe podejście do tworzenia mebli.",
    image: "/media/filozofia-henry/timeline-lata80.png",
  },
  {
    label: "Pierwsze lata",
    caption: "Rzemiosło i doświadczenie",
    description:
      "Każdy kolejny projekt pozwalał rozwijać wiedzę, umiejętności i doświadczenie. Uważnie słuchaliśmy klientów, poznawaliśmy ich potrzeby i tworzyliśmy rozwiązania dopasowane do konkretnych wnętrz i oczekiwań.",
    image: "/media/filozofia-henry/timeline-pierwsze-lata.png",
  },
  {
    label: "Ludzie",
    caption: "Współpraca, która tworzy jakość",
    description:
      "Przez lata budowaliśmy relacje z wybranymi dostawcami i specjalistami w swoich dziedzinach. To właśnie połączenie doświadczenia, wiedzy i współpracy pozwoliło nam tworzyć meble niezwykłe i dopracowane w każdym szczególe.",
    image: "/media/filozofia-henry/timeline-ludzie.png",
  },
  {
    label: "Indywidualne projekty",
    caption: "Każdy fotel może być inny",
    description:
      "Z czasem indywidualne podejście stało się jednym z fundamentów naszej pracy. Kolor, materiał, funkcjonalność czy forma — tworzymy rozwiązania, które można dopasować do charakteru wnętrza i oczekiwań jego użytkowników.",
    image: "/media/filozofia-henry/timeline-indywidualne.png",
  },
  {
    label: "Nowa technologia",
    caption: "Komfort spotyka innowację",
    description:
      "Śledząc światowe trendy, zaczęliśmy rozwijać rozwiązania elektrycznie rozkładanych foteli. Technologia pozwoliła połączyć precyzyjną konstrukcję z jeszcze większym komfortem użytkowania.",
    image: "/media/filozofia-henry/timeline-nowa-technologia.png",
  },
  {
    label: "Kino",
    caption: "Od fotela do pełnego doświadczenia",
    description:
      "Nasze rozwiązania zaczęły trafiać do kin oraz prywatnych sal kinowych. Fotele projektowane na zamówienie pozwalają połączyć wygodę, funkcjonalność i design z charakterem konkretnego wnętrza.",
    image: "/media/filozofia-henry/timeline-kino.png",
  },
  {
    label: "Dzisiaj",
    caption: "Tworzymy kino na własnych zasadach",
    description:
      "Dziś HENRY łączy wieloletnie doświadczenie tapicerskie z nowoczesną technologią i współczesnym wzornictwem. Każdy projekt powstaje z myślą o jednym — aby komfort, forma i trwałość tworzyły razem wyjątkowe doświadczenie.",
    image: "/media/filozofia-henry/timeline-dzisiaj.png",
  },
];

const values = [
  { title: "Niezawodność", image: "/media/filozofia-henry/value-forma.png" },
  { title: "Komfort", image: "/media/filozofia-henry/value-komfort.png" },
  { title: "Precyzja", image: "/media/filozofia-henry/value-trwalosc.png" },
];

const manifestoMessages = [
  {
    line: "Prawdziwy luksus nie polega na tym, by mieć więcej",
    emphasis: "Polega na tym, by wszystko było dokładnie takie, jak powinno",
  },
  {
    line: "HENRY Seating",
    emphasis: "Designed for the moment",
  },
];

const testimonials = [
  {
    quote: "Fotele z Henry Seating wspaniale skomponowały się z moją salką kinową. Najchętniej w ogóle bym z nimi nie wychodził.",
    author: "Klient prywatny / sala kinowa",
  },
  {
    quote: "Jakość wykonania i dbałość o detale są widoczne od pierwszego dotyku. To fotele, które starzeją się z klasą.",
    author: "Klient prywatny / Warszawa",
  },
  {
    quote: "Współpraca z HENRY, od projektu po montaż, przebiegła bez najmniejszego zgrzytu. Efekt przerósł nasze oczekiwania.",
    author: "Architekt wnętrz",
  },
];

function AutoGallery({
  images,
  className,
  interval = 3200,
}: {
  images: string[];
  className: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={className}>
      {images.map((src, i) => (
        <img
          key={src}
          className={styles.galleryFlipImage}
          style={{ opacity: i === index ? 1 : 0 }}
          src={src}
          alt=""
        />
      ))}
    </div>
  );
}

function TimelineCarousel({ items }: { items: typeof timeline }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const dragState = useRef<{ startX: number; index: number; moved: boolean } | null>(null);

  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [maxIndex, setMaxIndex] = useState(items.length - 1);
  const [markers, setMarkers] = useState<{ arrowTop: number; lineTop: number } | null>(null);

  const recalcGeometry = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstCard = cardRefs.current[0];
    if (!viewport || !track || !firstCard) return { step: 0, maxScroll: 0 };

    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = firstCard.offsetWidth + gap;
    const maxScroll = Math.max(0, track.scrollWidth - viewport.clientWidth);
    return { step, maxScroll };
  };

  useEffect(() => {
    const updateAll = () => {
      const { maxScroll } = recalcGeometry();
      const nextMaxIndex = maxScroll > 0 ? items.length - 1 : 0;
      setMaxIndex(nextMaxIndex);
      setIndex((current) => Math.min(current, nextMaxIndex));

      const container = containerRef.current;
      const image = imageRef.current;
      const dot = dotRef.current;
      if (container && image && dot) {
        const containerRect = container.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        const dotRect = dot.getBoundingClientRect();
        setMarkers({
          arrowTop: imageRect.top - containerRect.top + imageRect.height / 2,
          lineTop: dotRect.top - containerRect.top + dotRect.height / 2,
        });
      }
    };

    updateAll();
    window.addEventListener("resize", updateAll);
    return () => window.removeEventListener("resize", updateAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  useEffect(() => {
    const { step } = recalcGeometry();
    setOffset(maxIndex === 0 ? 0 : index * step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, maxIndex]);

  const goTo = (next: number) => setIndex(Math.min(Math.max(next, 0), maxIndex));

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = { startX: event.clientX, index, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag) return;
    if (Math.abs(event.clientX - drag.startX) > 4) drag.moved = true;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (!drag) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) < 40) return;
    goTo(drag.index + (distance < 0 ? 1 : -1));
  };

  return (
    <div className={styles.timelineCarousel} ref={containerRef}>
      <div className={styles.timelineLine} style={{ top: markers?.lineTop }} />

      <button
        type="button"
        className={styles.timelineArrow}
        data-side="prev"
        style={{ top: markers?.arrowTop }}
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        aria-label="Poprzedni etap historii"
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
          <path d="M8 1L1.5 7.5L8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={styles.timelineViewport} ref={viewportRef}>
        <div
          ref={trackRef}
          className={styles.timelineTrack}
          style={{ transform: `translateX(-${offset}px)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {items.map((item, i) => (
            <figure
              key={item.label}
              className={styles.timelineCard}
              ref={(node) => {
                cardRefs.current[i] = node;
              }}
            >
              <span className={`${styles.timelineYear} ${i === index ? styles.isActiveYear : ""}`}>
                {item.label}
              </span>
              <div className={styles.timelineImage} ref={i === 0 ? imageRef : undefined}>
                <img src={item.image} alt={item.label} draggable={false} />
              </div>
              <span
                className={`${styles.timelineDot} ${i === index ? styles.isActiveDot : ""}`}
                ref={i === 0 ? dotRef : undefined}
              />
              <figcaption>
                <span className={styles.timelineCaptionTitle}>{item.caption}</span>
                <p>{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.timelineArrow}
        data-side="next"
        style={{ top: markers?.arrowTop }}
        onClick={() => goTo(index + 1)}
        disabled={index === maxIndex}
        aria-label="Następny etap historii"
      >
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" aria-hidden="true">
          <path d="M1 1L7.5 7.5L1 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

void TimelineCarousel; // karuzela historii tymczasowo wyłączona, kod zachowany na wypadek powrotu

export function PhilosophyExperience() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeManifesto, setActiveManifesto] = useState(0);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-philosophy-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.09, rootMargin: "0px 0px -8%" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveManifesto((current) => (current + 1) % manifestoMessages.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation />

      <section className={styles.intro} aria-labelledby="philosophy-title" data-philosophy-reveal>
        <p>Stworzony na wyjątkowe chwile</p>
        <h1 id="philosophy-title">FILOZOFIA HENRY</h1>
        <p className={styles.introText}>
          Wierzymy, że prawdziwy komfort rodzi się z pasji, doświadczenia i szacunku do ponadczasowych wartości.
          Ponad 25 lat doświadczenia i blisko 2 miliony wyprodukowanych foteli.
          Od profesjonalnych sal kinowych i teatralnych po najbardziej osobiste wnętrza kin domowych.
        </p>
        <span className={styles.introLabel}>To jest HENRY</span>
      </section>

      <figure className={styles.hero} data-philosophy-reveal>
        <picture>
          <source media="(max-width: 640px)" srcSet="/media/filozofia-henry/hero-mobile.png" />
          <source media="(max-width: 980px)" srcSet="/media/filozofia-henry/hero-tablet.png" />
          <img src="/media/filozofia-henry/hero.png" alt="Rzędy zabytkowych foteli kinowych oświetlonych światłem projektora" />
        </picture>
      </figure>

      <section className={styles.designed} data-philosophy-reveal>
        <h2>Jakość, która nie kończy się na designie</h2>
        <p>
          Tworzą ją również komfort, bezpieczeństwo, precyzja wykonania i niezawodność. Rygorystyczne wymagania
          międzynarodowego rynku kinowego ukształtowały standardy, które dziś są fundamentem HENRY.
        </p>
      </section>

      <section className={styles.sketch} data-philosophy-reveal>
        <div className={styles.sketchText}>
          <h2>Firma rodzinna<br />Manufaktura w Polsce.</h2>
          <p>
            Jesteśmy firmą rodzinną dlatego wierzymy w relacje, odpowiedzialność i indywidualne podejście do
            każdego projektu. Fotele HENRY nie powstają na anonimowej linii produkcyjnej. Projektujemy i
            tworzymy je w Polsce, w naszej manufakturze w Dąbrowie Chełmińskiej, wykorzystując starannie wybrane
            materiały i sprawdzone komponenty.
          </p>
        </div>
        <AutoGallery images={sketchGalleryImages} className={styles.sketchGallery} interval={3400} />
      </section>

      <p className={styles.materialsNote} data-philosophy-reveal>
        Naszą inspiracją jest historia kina, miejsca w którym rzemiosło i emocje zawsze szły w parze.
      </p>

      <figure className={styles.craftsman} data-philosophy-reveal>
        <img src="/media/filozofia-henry/craftsman.png" alt="Rzemieślnik HENRY ręcznie wykańczający skórzane obicie fotela" />
      </figure>

      {/* Karuzela historii tymczasowo wyłączona — do ustalenia, czy wraca. */}
      {/* <section aria-label="Historia HENRY" data-philosophy-reveal>
        <TimelineCarousel items={timeline} />
      </section> */}

      <section className={styles.cinemaGrid} aria-label="Dziedzictwo kina" data-philosophy-reveal>
        <div className={styles.cinemaGridPhotos}>
          <img
            className={styles.cinemaGridLarge}
            src="/media/filozofia-henry/cinema-grid-neon.png"
            alt="Neonowy szyld &quot;Cinema&quot; na fasadzie kina"
          />
          <img
            src="/media/filozofia-henry/cinema-grid-cinetech.jpg"
            alt="Projektor kinowy w trakcie emisji, snop światła w ciemnej sali"
          />
          <img
            src="/media/filozofia-henry/cinema-grid-teatro.jpg"
            alt="Zbliżenie na szpulę filmową z taśmą 35mm"
          />
        </div>
        <div className={styles.cinemaGridText}>
          <h2>25 lat dla największych kin na świecie</h2>
          <p>
            HENRY wyrasta z ponad 25 lat doświadczenia w projektowaniu i produkcji foteli kinowych. Przez lata
            tworzyliśmy rozwiązania dla największych operatorów kinowych na świecie, w tym dla Cineworld,
            dostarczając ponad 1,5 miliona foteli do obiektów w wielu krajach.
          </p>
        </div>
      </section>

      <div className={styles.valuesHeading} data-philosophy-reveal>
        <p>Trzy wartości.</p>
        <h2>Jeden efekt.</h2>
      </div>

      <section className={styles.values} aria-label="Wartości HENRY" data-philosophy-reveal>
        {values.map((value) => (
          <div className={styles.valuePanel} key={value.title}>
            <img src={value.image} alt="" />
            <span>{value.title}</span>
          </div>
        ))}
      </section>

      <p className={styles.valuesCaption} data-philosophy-reveal>
        Dziś przenosimy doświadczenie zdobyte w profesjonalnych salach kinowych do najbardziej osobistych
        przestrzeni — prywatnych kin, apartamentów i wyjątkowych wnętrz.
      </p>

      <section className={styles.manifesto} data-philosophy-reveal>
        <img src="/media/filozofia-henry/manifesto.png" alt="Fotel HENRY w profilu z nałożoną siatką proporcji Fibonacciego" />
        <div className={styles.manifestoShade} />
        <div className={styles.manifestoCopy}>
          <h2 key={activeManifesto}>
            {manifestoMessages[activeManifesto].line}
            <br />
            <em>{manifestoMessages[activeManifesto].emphasis}</em>
          </h2>
        </div>
      </section>

      <section className={styles.testimonials} aria-label="Opinie klientów HENRY" data-philosophy-reveal>
        <span className={styles.testimonialsWord} aria-hidden="true">opinie</span>
        <div className={styles.testimonialsCard}>
          <h2>Perfekcja <em>w każdym calu</em></h2>
          <p key={activeTestimonial}>&bdquo;{testimonials[activeTestimonial].quote}&rdquo;</p>
          <span className={styles.testimonialsAuthor}>{testimonials[activeTestimonial].author}</span>

          <div className={styles.testimonialsFooter}>
            <div className={styles.testimonialsDots}>
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.author}
                  type="button"
                  className={index === activeTestimonial ? styles.isActiveDot : ""}
                  aria-label={`Pokaż opinię ${index + 1}`}
                  aria-current={index === activeTestimonial}
                  onClick={() => setActiveTestimonial(index)}
                />
              ))}
            </div>
            <span className={styles.testimonialsCount}>{String(activeTestimonial + 1).padStart(2, "0")}</span>
          </div>
          <div className={styles.testimonialsProgress}>
            <span style={{ width: `${((activeTestimonial + 1) / testimonials.length) * 100}%` }} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
