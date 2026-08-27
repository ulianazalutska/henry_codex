"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./bespoke.module.css";

const scope = ["Kształt", "Tkanina", "Wymiar", "Pikowanie", "Wyposażenie"];

const realizations = [
  {
    image: "/media/projekty-indywidualne/realizacja-rim-light-cinema.jpg",
    caption: "Fotele kinowe, aksamit, pikowanie diamentowe",
    depth: 0.55,
  },
  {
    image: "/media/projekty-indywidualne/realizacja-shelf-cinema.jpg",
    caption: "Sala kinowa z zabudową, skóra, oświetlenie w półkach",
    depth: 1,
  },
  {
    image: "/media/projekty-indywidualne/realizacja-velvet-cinema.jpg",
    caption: "Sofa i panele ścienne, aksamit, pikowanie guzikowe",
    depth: 0.7,
  },
  {
    image: "/media/projekty-indywidualne/realizacja-blue-glow-cinema.jpg",
    caption: "Rząd foteli kinowych, skóra, oświetlenie punktowe",
    depth: 1.15,
  },
];

const materials = [
  { image: "/media/projekty-indywidualne/materials/stitch-macro.jpg", label: "Szew ozdobny" },
  { image: "/media/projekty-indywidualne/materials/stitch-square-double-diamond.jpg", label: "Square Double Diamond" },
  { image: "/media/projekty-indywidualne/materials/stitch-square-diamond.jpg", label: "Square Diamond" },
  { image: "/media/projekty-indywidualne/materials/stitch-curve.jpg", label: "Curve" },
  { image: "/media/projekty-indywidualne/materials/stitch-double-diamond.jpg", label: "Double Diamond" },
  { image: "/media/projekty-indywidualne/materials/stitch-diamond.jpg", label: "Diamond" },
  { image: "/media/projekty-indywidualne/materials/stitch-hex.jpg", label: "Hex" },
];

const process = [
  { number: "01", title: "Konsultacja", description: "Rozmawiamy o funkcji, stylu i przestrzeni." },
  { number: "02", title: "Projekt", description: "Szkic formy, wymiarów i konstrukcji." },
  { number: "03", title: "Dobór materiałów", description: "Tkanina, skóra, drewno, pikowanie." },
  { number: "04", title: "Realizacja", description: "Wykonanie w pracowni HENRY." },
  { number: "05", title: "Montaż", description: "Dostawa i wykończenie na miejscu." },
];

export function BespokeExperience() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const processLineRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

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

  useEffect(() => {
    const cards = Array.from(galleryRef.current?.querySelectorAll<HTMLElement>("[data-depth]") ?? []);
    if (!cards.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const tick = () => {
      const viewportCenter = window.innerHeight / 2;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const depth = Number(card.dataset.depth ?? "1");
        const offset = (viewportCenter - cardCenter) * 0.07 * depth;
        card.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = processRef.current;
    const line = processLineRef.current;
    if (!section || !line) return;

    const measure = () => {
      const start = section.offsetTop - window.innerHeight * 0.65;
      const distance = Math.max(1, section.offsetHeight - window.innerHeight * 0.35);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      line.style.transform = `scaleX(${progress})`;
      setActiveStep(Math.floor(progress * process.length + 0.001) - 1);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

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

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation />

      <section className={styles.hero} aria-labelledby="bespoke-title">
        <p className={styles.eyebrow}>Bez ograniczeń kolekcji</p>
        <h1 id="bespoke-title">Projekty<br /><em>indywidualne.</em></h1>
        <div className={styles.heroStitch} aria-hidden="true"><i /><i /></div>
        <div className={styles.heroIntro}>
          <p>Kształt, tkanina, wymiar, pikowanie — poza granicami kolekcji Atelier, Studio i Lounge.</p>
          <span>Pracujemy z architektami, projektantami wnętrz i klientami indywidualnymi nad meblami, których nie ma jeszcze w żadnym katalogu.</span>
        </div>
      </section>

      <section className={styles.concept} aria-label="Przykład projektu indywidualnego">
        <figure className={styles.conceptFigure} data-proj-reveal>
          <div className={styles.conceptFrame}>
            <img src="/media/projekty-indywidualne/koncepcja-orbit.webp" alt="Koncepcyjna wizualizacja fotela w stylistyce kosmicznej" loading="lazy" />
          </div>
          <figcaption>Wizualizacja koncepcyjna — nie zdjęcie gotowej realizacji</figcaption>
        </figure>
        <blockquote className={styles.conceptQuote} data-proj-reveal>
          <p>„Jeśli klient zechce fotele w stylistyce kosmicznej —<br />taki projekt zrobimy.”</p>
        </blockquote>
      </section>

      <ul className={styles.scope} aria-label="Zakres personalizacji" data-proj-reveal>
        {scope.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <section className={styles.gallery} aria-labelledby="realizacje-title">
        <div className={styles.sectionLead} data-proj-reveal>
          <p>Zrealizowane projekty</p>
          <h2 id="realizacje-title">Kilka<br /><em>przykładów.</em></h2>
        </div>
        <div className={styles.galleryGrid} ref={galleryRef}>
          {realizations.map((item) => (
            <figure key={item.image} className={styles.galleryCard} data-proj-reveal data-depth={item.depth}>
              <div><img src={item.image} alt={item.caption} loading="lazy" /></div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.materials} aria-labelledby="materials-title">
        <div className={styles.sectionLead} data-proj-reveal>
          <p>Tkaniny i wykończenia</p>
          <h2 id="materials-title">Poczuj<br /><em>fakturę.</em></h2>
          <Link href="/personalizacja" className={styles.materialsLink}>Zobacz pełną paletę materiałów <span aria-hidden="true">↗</span></Link>
        </div>
        <div className={styles.materialsStrip} data-proj-reveal>
          {materials.map((material) => (
            <div key={material.label} className={styles.materialTile} onMouseMove={moveLens} onMouseLeave={leaveLens}>
              <img src={material.image} alt={material.label} loading="lazy" />
              <span className={styles.materialLens} data-lens style={{ backgroundImage: `url(${material.image})` }} aria-hidden="true" />
              <p>{material.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.process} aria-labelledby="process-title" ref={processRef}>
        <div className={styles.sectionLead} data-proj-reveal>
          <p>Jak pracujemy</p>
          <h2 id="process-title">Od pomysłu<br /><em>do wnętrza.</em></h2>
        </div>
        <div className={styles.processTrack}>
          <span className={styles.processLine} ref={processLineRef} aria-hidden="true" />
          <ol>
            {process.map((step, index) => (
              <li key={step.number} className={index <= activeStep ? styles.isActive : undefined}>
                <span className={styles.processNumber}>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.audience} data-proj-reveal>
        <p>Dla architektów, projektantów wnętrz i klientów indywidualnych, którzy potrzebują mebla dopasowanego do konkretnej przestrzeni.</p>
      </section>

      <section className={styles.cta} data-proj-reveal>
        <h2>Masz własny<br /><em>pomysł?</em></h2>
        <Link href={`/kontakt?topic=${encodeURIComponent("Projekt indywidualny")}`} className={styles.ctaLink}>
          Opowiedz nam o swoim projekcie <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
