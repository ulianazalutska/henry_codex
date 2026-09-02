"use client";

import { useEffect, useState } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./philosophy.module.css";

const sketchGalleryImages = [
  "/media/filozofia-henry/sketch-gallery-1.png",
  "/media/filozofia-henry/sketch-gallery-2.png",
];

const timeline = [
  {
    label: "Lata 80.",
    caption: "Początek historii",
    image: "/media/filozofia-henry/timeline-lata80.png",
  },
  {
    label: "Pierwsze lata",
    caption: "Rzemiosło i doświadczenie",
    image: "/media/filozofia-henry/timeline-pierwsze-lata.png",
  },
  {
    label: "Ludzie",
    caption: "Współpraca, która tworzy jakość",
    image: "/media/filozofia-henry/timeline-ludzie.png",
  },
  {
    label: "Indywidualne projekty",
    caption: "Każdy fotel był inny",
    image: "/media/filozofia-henry/timeline-indywidualne.png",
  },
];

const values = [
  { title: "Forma", image: "/media/filozofia-henry/value-forma.png" },
  { title: "Komfort", image: "/media/filozofia-henry/value-komfort.png" },
  { title: "Trwałość", image: "/media/filozofia-henry/value-trwalosc.png" },
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
      <img key={index} className={styles.galleryFlipImage} src={images[index]} alt="" />
    </div>
  );
}

export function PhilosophyExperience() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation />

      <section className={styles.intro} aria-labelledby="philosophy-title" data-philosophy-reveal>
        <p>Stworzone na tę chwilę</p>
        <h1 id="philosophy-title">O HENRY</h1>
        <p className={styles.introText}>
          HENRY powstało wokół prostej idei — że fotel powinien być czymś więcej niż meblem. Poprzez ponadczasowy
          design, najwyższej jakości materiały i bezkompromisowe rzemiosło zmieniamy sposób, w jaki przeżywasz film,
          muzykę i przestrzeń wokół siebie.
        </p>
        <span className={styles.introLabel}>To jest HENRY</span>
      </section>

      <figure className={styles.hero} data-philosophy-reveal>
        <img src="/media/filozofia-henry/hero.png" alt="Wejście do prywatnej sali kinowej HENRY" />
      </figure>

      <section className={styles.designed} data-philosophy-reveal>
        <h2>Projektowane z myślą<br />o wyjątkowych chwilach</h2>
        <p>
          HENRY tworzy fotele kinowe, w których ponadczasowy design łączy się z wyjątkowym komfortem i dbałością o
          każdy detal. Naszym celem jest stworzenie domowego kina, które nie tylko pozwala oglądać filmy, ale staje
          się wyjątkową częścią całego wnętrza.
        </p>
      </section>

      <section className={styles.sketch} data-philosophy-reveal>
        <div className={styles.sketchText}>
          <h2>nowe spojrzenie<br />na domowe kino</h2>
          <p>
            Wierzymy, że prawdziwy komfort zaczyna się tam, gdzie funkcjonalność spotyka się z dobrym designem.
            Dlatego każdy fotel HENRY został zaprojektowany tak, aby zapewniać wygodę, elegancję i pełne zanurzenie
            w kinowym doświadczeniu.
          </p>
        </div>
        <AutoGallery images={sketchGalleryImages} className={styles.sketchGallery} interval={3400} />
      </section>

      <p className={styles.materialsNote} data-philosophy-reveal>
        Starannie dobrane materiały, precyzyjne wykonanie i przemyślane detale tworzą fotele stworzone z myślą o
        długich seansach i codziennym użytkowaniu. HENRY to miejsce, w którym można się zatrzymać, zrelaksować i po
        prostu cieszyć filmem.
      </p>

      <figure className={styles.craftsman} data-philosophy-reveal>
        <img src="/media/filozofia-henry/craftsman.png" alt="Rzemieślnik HENRY ręcznie wykańczający skórzane obicie fotela" />
      </figure>

      <section className={styles.timeline} aria-label="Historia HENRY" data-philosophy-reveal>
        {timeline.map((item) => (
          <figure key={item.label}>
            <div className={styles.timelineImage}>
              <img src={item.image} alt={item.label} />
              <span>{item.label}</span>
            </div>
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </section>

      <h2 className={styles.valuesHeading} data-philosophy-reveal>
        Trzy wartości.<br /><em>Jeden efekt.</em>
      </h2>

      <section className={styles.values} aria-label="Wartości HENRY" data-philosophy-reveal>
        {values.map((value) => (
          <div className={styles.valuePanel} key={value.title}>
            <img src={value.image} alt="" />
            <span>{value.title}</span>
          </div>
        ))}
      </section>

      <p className={styles.valuesCaption} data-philosophy-reveal>
        Przez lata budowaliśmy relacje z zaufanymi dostawcami i rzemieślnikami, aby każdy detal fotela HENRY
        spełniał nasze standardy.
      </p>

      <section className={styles.manifesto} data-philosophy-reveal>
        <img src="/media/lounge-pair.webp" alt="Dwa fotele HENRY w prywatnym wnętrzu z widokiem na palmy" />
        <div className={styles.manifestoShade} />
        <div className={styles.manifestoCopy}>
          <span>Nie produkujemy po prostu mebli</span>
          <h2>Projektujemy sposób,<br /><em>w jaki przeżywasz chwilę.</em></h2>
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
