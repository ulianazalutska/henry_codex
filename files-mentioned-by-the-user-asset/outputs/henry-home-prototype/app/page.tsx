"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SiteFooter } from "./components/site-footer";
import { SiteNavigation } from "./components/site-navigation";

const heroMoments = [
  "Podejdź bliżej.",
  "Każda przestrzeń ma swój rytm.",
  "Światło prowadzi dalej.",
  "Komfort zaczyna się przed seansem.",
  "Zrealizujmy Twoją wizję.",
];

const storyParagraphs = [
  "Henry tworzy fotele premium do prywatnych sal kinowych, stref relaksu oraz nowoczesnych wnętrz mieszkalnych. Łączymy ponadczasowy design, najwyższej jakości materiały oraz precyzyjne wykonanie, aby stworzyć meble, które zapewniają wyjątkowy komfort na długie lata.",
  "Każdy model powstaje z myślą o indywidualnych potrzebach użytkownika. Szeroki wybór skór, tkanin, wykończeń drewnianych oraz wyposażenia pozwala stworzyć fotel idealnie dopasowany do charakteru wnętrza i osobistych preferencji.",
  "Projektowane i produkowane w Polsce, fotele Henry są efektem rzemiosła, nowoczesnych technologii oraz dbałości o każdy detal. To kolekcje stworzone dla osób, które oczekują najwyższej jakości, elegancji i komfortu bez kompromisów.",
];

function HighlightText({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          className="brand-story__word"
          key={`${word}-${index}`}
          style={{ "--word-delay": `${(offset + index) * 0.045}s` } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLElement>(null);
  const collectionsTrackRef = useRef<HTMLDivElement>(null);
  const collectionsProgressRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [storyPlaying, setStoryPlaying] = useState(false);
  const [heroMoment, setHeroMoment] = useState(-1);
  const [heroStage, setHeroStage] = useState(1);
  const [navSolid, setNavSolid] = useState(false);

  useReveal();

  useEffect(() => {
    const hero = heroRef.current;
    const frameElement = heroFrameRef.current;
    const video = videoRef.current;
    if (!hero || !frameElement || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let targetTime = 0;
    let lastSeek = 0;
    let lastMoment = -1;
    let lastStage = 1;
    let wasSolid = false;

    const measure = () => {
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, (window.scrollY - hero.offsetTop) / distance));
      const exit = Math.max(0, Math.min(1, (next - 0.82) / 0.18));
      const introOpacity = Math.max(0, 1 - next * 6);
      const cueOpacity = Math.max(0, 1 - next * 7);

      frameElement.style.setProperty("--hero-scale", String(1 - exit * 0.18));
      frameElement.style.setProperty("--hero-rotate", `${exit * -2.2}deg`);
      frameElement.style.setProperty("--hero-shift", `${exit * -7}vh`);
      frameElement.style.setProperty("--hero-radius", `${exit * 12}px`);
      frameElement.style.setProperty("--hero-dim", String(exit * 0.42));
      hero.style.setProperty("--hero-intro-opacity", String(introOpacity));
      hero.style.setProperty("--hero-cue-opacity", String(cueOpacity));
      hero.style.setProperty("--hero-progress", String(Math.max(0.04, next)));
      if (Number.isFinite(video.duration)) targetTime = next * Math.max(0, video.duration - 0.08);

      const moment = next < 0.12 || next > 0.84 ? -1 : Math.min(4, Math.floor((next - 0.12) / 0.144));
      if (moment !== lastMoment) {
        lastMoment = moment;
        setHeroMoment(moment);
      }

      const stage = Math.min(5, Math.floor(next * 5) + 1);
      if (stage !== lastStage) {
        lastStage = stage;
        setHeroStage(stage);
      }

      const solid = next > 0.94;
      if (solid !== wasSolid) {
        wasSolid = solid;
        setNavSolid(solid);
      }
    };

    const tick = (time: number) => {
      if (
        video.readyState >= 2 &&
        !video.seeking &&
        time - lastSeek > 34 &&
        Math.abs(video.currentTime - targetTime) > 0.035
      ) {
        video.currentTime = targetTime;
        lastSeek = time;
      }
      frame = requestAnimationFrame(tick);
    };

    const initialize = () => {
      video.pause();
      measure();
    };

    video.addEventListener("loadedmetadata", initialize);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", initialize);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const section = collectionsRef.current;
    const track = collectionsTrackRef.current;
    const progressLine = collectionsProgressRef.current;
    if (!section || !track || !progressLine) return;
    const measure = () => {
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, (window.scrollY - section.offsetTop) / distance));
      track.style.transform = `translate3d(${progress * -200}vw,0,0)`;
      progressLine.style.width = `${Math.max(5, progress * 100)}%`;
    };
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const section = storyRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStoryPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.22 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <SiteNavigation solid={navSolid} />

      <section id="top" className="cinematic-hero" ref={heroRef} aria-label="Cinematic entrance to HENRY">
        <div className="cinematic-hero__sticky">
          <div className="cinematic-hero__frame" ref={heroFrameRef}>
            <video ref={videoRef} className="cinematic-hero__video" muted playsInline preload="auto" poster="/media/henry-entrance-poster.jpg" aria-label="Przejście korytarzem do prywatnej sali kinowej HENRY">
              <source src="/media/henry-entrance.mp4" type="video/mp4" />
            </video>
            <div className="cinematic-hero__shade" />
          </div>
          <div className="hero-intro">
            <p>Prywatne kino. Zaprojektowane wokół Ciebie.</p>
            <h1>Wejdź do świata<br /><span>HENRY</span></h1>
          </div>
          <div className="hero-moment" aria-live="polite">
            {heroMoment >= 0 && <p key={heroMoment}><span>0{heroMoment + 1}</span>{heroMoments[heroMoment]}</p>}
          </div>
          <div className="scroll-cue"><span>Przewiń, aby wejść</span><i><b /></i></div>
          <p className="hero-stage"><span>{String(heroStage).padStart(2, "0")}</span> / 05</p>
        </div>
      </section>

      <section className={`brand-story ${storyPlaying ? "is-playing" : ""}`} ref={storyRef} aria-label="O marce HENRY">
        <img src="/media/henry-logo-white.png" alt="HENRY Seating — Designed for the moment" />
        <div className="brand-story__copy">
          {storyParagraphs.map((paragraph, index) => {
            const offset = storyParagraphs.slice(0, index).reduce((sum, item) => sum + item.split(" ").length, 0);
            return <p key={paragraph}><HighlightText text={paragraph} offset={offset} /></p>;
          })}
        </div>
      </section>

      <section id="istota-henry" className="about section-base">
        <div className="section-kicker" data-reveal><span>01</span><p>Istota HENRY</p></div>
        <h2 className="about__statement" data-reveal>
          Komfort nie zaczyna się<br />
          <span>w fotelu.</span> Zaczyna się<br />
          w tym, co czujesz.
        </h2>
        <div className="about__composition">
          <figure className="about__image image-reveal" data-reveal>
            <img src="/media/cinema-coast.webp" alt="Prywatna sala kinowa z fotelami HENRY i widokiem na morze" loading="lazy" />
            <figcaption>Private Cinema / Kolekcja Studio</figcaption>
          </figure>
          <div className="about__copy" data-reveal>
            <p>Projektujemy doświadczenie prywatnego kina — od pierwszego dotyku materiału po ciszę tuż przed seansem.</p>
            <p>Forma, ergonomia i technologia spotykają się w jednym celu: stworzyć miejsce, do którego chcesz wracać.</p>
            <dl>
              <div><dt>Made in</dt><dd>Poland</dd></div>
              <div><dt>Materiały</dt><dd>Wybrane ręcznie</dd></div>
              <div><dt>Forma</dt><dd>Indywidualna</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="kolekcje" className="collections" ref={collectionsRef}>
        <div className="collections-stage">
          <div className="collections-head"><span>02 / Kolekcje</span><p>Trzy sposoby<br />odczuwania komfortu.</p></div>
          <div className="collections-track" ref={collectionsTrackRef}>
            <a href="/kolekcje/atelier" className="collection collection--atelier" aria-label="Zobacz kolekcję Atelier">
              <img src="/media/atelier-caramel-room.webp" alt="Karmelowy fotel HENRY w ciepłym wnętrzu" loading="lazy" />
              <div className="collection__veil" /><p>01 / Rzemiosło</p><h3>Atelier</h3>
              <span>Rzeźbiarska forma. Indywidualne wykończenie. <b>Odkryj kolekcję <i className="collection-arrow diagonal-arrow" aria-hidden="true" /></b></span>
            </a>
            <a href="/kolekcje/studio" className="collection collection--studio" aria-label="Zobacz kolekcję Studio">
              <div className="collection__copy"><p>02 / Architektura kina</p><h3>Studio</h3><span>Kompletne doświadczenie prywatnej sali. <b>Odkryj kolekcję <i className="collection-arrow diagonal-arrow" aria-hidden="true" /></b></span></div>
              <img src="/media/studio-cinema-front.webp" alt="Rzędy foteli HENRY w prywatnej sali kinowej" loading="lazy" />
            </a>
            <a href="/kolekcje/lounge" className="collection collection--lounge" aria-label="Zobacz kolekcję Lounge">
              <img src="/media/lounge-pair.webp" alt="Dwa czarne fotele HENRY w spokojnym wnętrzu" loading="lazy" />
              <div className="collection__copy"><p>03 / Codzienny rytuał</p><h3>Lounge</h3><span>Kino, muzyka, chwila ciszy — w Twoim rytmie. <b>Odkryj kolekcję <i className="collection-arrow diagonal-arrow" aria-hidden="true" /></b></span></div>
            </a>
          </div>
          <div className="collections-progress"><i ref={collectionsProgressRef} /></div>
        </div>
      </section>

      <section id="projekty-indywidualne" className="bespoke section-base">
        <div className="section-kicker" data-reveal><span>03</span><p>Projekty indywidualne</p></div>
        <div className="bespoke__intro">
          <h2 data-reveal>Od pierwszej linii<br />do ostatniego <span>detalu.</span></h2>
          <p data-reveal>Pracujemy z architektami, projektantami i prywatnymi klientami, tworząc meble oraz całe układy dopasowane do przestrzeni.</p>
        </div>
        <div className="bespoke__gallery">
          <figure className="bespoke__main spread-reveal spread-reveal--center" data-reveal>
            <img src="/media/studio-cinema-wide.webp" alt="Indywidualny projekt prywatnej sali kinowej HENRY" loading="lazy" />
            <figcaption><span>Private Residence</span><span>Warsaw / 2026</span></figcaption>
          </figure>
          <figure className="bespoke__detail spread-reveal spread-reveal--left" data-reveal>
            <img src="/media/private-viewing.webp" alt="Fotel HENRY w prywatnej sali podczas seansu" loading="lazy" />
            <figcaption>Projektowanie doświadczenia</figcaption>
          </figure>
          <figure className="bespoke__object spread-reveal spread-reveal--right" data-reveal>
            <img src="/media/atelier-ivory-portrait.webp" alt="Fotel HENRY w jasnym wnętrzu" loading="lazy" />
            <figcaption>Forma wykonywana na zamówienie</figcaption>
          </figure>
        </div>
        <a className="text-link" href="/projekty-indywidualne" data-reveal>Zobacz projekty indywidualne <span className="diagonal-arrow" aria-hidden="true" /></a>
      </section>

      <section id="filozofia-henry" className="philosophy">
        <div className="section-kicker" data-reveal><span>04</span><p>Filozofia HENRY</p></div>
        <p className="philosophy__lead" data-reveal>Najwyższa jakość<br />nie potrzebuje hałasu.</p>
        <div className="philosophy__spread">
          <p data-reveal>Wierzymy, że luksus zaczyna się tam, gdzie wszystko ma swoje uzasadnienie — proporcja, materiał, dotyk i światło.</p>
          <figure className="image-reveal" data-reveal>
            <img src="/media/atelier-caramel-study.webp" alt="Karmelowy fotel HENRY na tle fornirowanej ściany" loading="lazy" />
            <figcaption>Atelier / Deep Caramel</figcaption>
          </figure>
          <blockquote data-reveal>„Projektujemy dla momentu, który zostaje z Tobą po napisach.”</blockquote>
        </div>
        <a className="text-link philosophy__link" href="/filozofia-henry" data-reveal>Poznaj nas bliżej <span className="diagonal-arrow" aria-hidden="true" /></a>
      </section>

      <SiteFooter showInvitation />
    </main>
  );
}
