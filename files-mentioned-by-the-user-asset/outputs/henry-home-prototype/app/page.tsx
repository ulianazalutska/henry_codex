"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteNavigation } from "./components/site-navigation";

const storyParagraphs = [
  "Henry tworzy fotele premium do prywatnych sal kinowych, stref relaksu oraz nowoczesnych wnętrz mieszkalnych. Łączymy ponadczasowy design, najwyższej jakości materiały oraz precyzyjne wykonanie, aby stworzyć meble, które zapewniają wyjątkowy komfort na długie lata.",
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
  const collectionsRef = useRef<HTMLElement>(null);
  const collectionsTrackRef = useRef<HTMLDivElement>(null);
  const collectionsProgressRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [storyPlaying, setStoryPlaying] = useState(false);

  useReveal();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    // Cloudflare's static-asset serving doesn't honor open-ended Range
    // requests (bytes=0-) the way <video> streaming expects, which leaves
    // the element stuck at readyState 0 forever. Fetching the file into
    // memory and handing the browser a blob URL sidesteps Range entirely.
    fetch("/media/henry-entrance.mp4")
      .then((response) => response.blob())
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
      })
      .catch(() => {});

    const initialize = () => {
      video.loop = true;
      video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", initialize);

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", initialize);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
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
      <SiteNavigation />

      <section id="top" className="cinematic-hero" aria-label="Cinematic entrance to HENRY">
        <div className="cinematic-hero__sticky">
          <div className="cinematic-hero__frame">
            <video ref={videoRef} className="cinematic-hero__video" muted playsInline preload="auto" poster="/media/henry-entrance-poster.jpg" aria-label="Przejście korytarzem do prywatnej sali kinowej HENRY" />
            <div className="cinematic-hero__shade" />
          </div>
          <div className="hero-intro">
            <p>Ręcznie wykonane fotele do prywatnych sal kinowych</p>
            <h1>Twoje kino.<br /><span>Twoje zasady.</span></h1>
          </div>
          <p className="hero-note">Wizualizacja koncepcyjna</p>
        </div>
      </section>

      <section className={`brand-story ${storyPlaying ? "is-playing" : ""}`} ref={storyRef} aria-label="O marce HENRY">
        <div className="brand-story__copy">
          {storyParagraphs.map((paragraph, index) => {
            const offset = storyParagraphs.slice(0, index).reduce((sum, item) => sum + item.split(" ").length, 0);
            return <p key={paragraph}><HighlightText text={paragraph} offset={offset} /></p>;
          })}
          <p className="brand-story__origin">Designed &amp; Made in Poland</p>
        </div>
        <figure className="brand-story__photo image-reveal" data-reveal>
          <img src="/media/brand-story-recliner.webp" alt="Fotel HENRY z pledem i miską popcornu" loading="lazy" />
        </figure>
      </section>

      <section id="kolekcje" className="collections" ref={collectionsRef}>
        <div className="collections-stage">
          <div className="collections-head"><p className="collections-head__left">Nasze kolekcje<span className="concept-note">Wizualizacja koncepcyjna</span></p><p>Trzy sposoby<br />odczuwania komfortu</p></div>
          <div className="collections-track" ref={collectionsTrackRef}>
            <Link href="/kolekcje/atelier" className="collection collection--atelier" aria-label="Zobacz kolekcję Atelier">
              <img src="/media/atelier-cinema-row.webp" alt="Rzędy foteli HENRY w prywatnej sali kinowej" loading="lazy" />
              <div className="collection__veil" /><h3>Atelier</h3>
              <div className="collection__cta" aria-hidden="true">
                <i className="diagonal-arrow collection__cta-icon" />
              </div>
            </Link>
            <Link href="/kolekcje/studio" className="collection collection--atelier" aria-label="Zobacz kolekcję Studio">
              <img src="/media/studio-study-chair.webp" alt="Rząd foteli HENRY w prywatnej sali kinowej" loading="lazy" />
              <div className="collection__veil" /><h3>Studio</h3>
              <div className="collection__cta" aria-hidden="true">
                <i className="diagonal-arrow collection__cta-icon" />
              </div>
            </Link>
            <Link href="/kolekcje/lounge" className="collection collection--atelier" aria-label="Zobacz kolekcję Lounge">
              <img src="/media/lounge-fireplace.webp" alt="Fotel i szezlong HENRY przy kominku z widokiem na morze" loading="lazy" />
              <div className="collection__veil" /><h3>Lounge</h3>
              <div className="collection__cta" aria-hidden="true">
                <i className="diagonal-arrow collection__cta-icon" />
              </div>
            </Link>
          </div>
          <div className="collections-progress"><i ref={collectionsProgressRef} /></div>
        </div>
      </section>

      <section id="aranzacje" className="arrangements section-base">
        <div className="arrangements__head">
          <p className="arrangements__head-left" data-reveal>Aranżacje</p>
          <p data-reveal>Zobacz, jak fotele HENRY<br />komponują się we wnętrzach</p>
        </div>
        <p className="arrangements__note concept-note" data-reveal>Wizualizacja koncepcyjna</p>
        <div className="arrangements__grid">
          <Link href="/kolekcje/atelier/inspiracje?from=%2F%23aranzacje" className="arrangement" data-reveal aria-label="Zobacz aranżacje kolekcji Atelier">
            <img src="/media/arrangements-atelier.webp" alt="Aranżacja wnętrza z fotelami HENRY Atelier" loading="lazy" />
            <div className="arrangement__veil" />
            <h3>Atelier</h3>
            <div className="arrangement__cta" aria-hidden="true"><i className="diagonal-arrow" /></div>
          </Link>
          <Link href="/kolekcje/studio/inspiracje?from=%2F%23aranzacje" className="arrangement" data-reveal aria-label="Zobacz aranżacje kolekcji Studio">
            <img src="/media/arrangements-studio.webp" alt="Aranżacja wnętrza z fotelami HENRY Studio" loading="lazy" />
            <div className="arrangement__veil" />
            <h3>Studio</h3>
            <div className="arrangement__cta" aria-hidden="true"><i className="diagonal-arrow" /></div>
          </Link>
          <Link href="/kolekcje/lounge/inspiracje?from=%2F%23aranzacje" className="arrangement" data-reveal aria-label="Zobacz aranżacje kolekcji Lounge">
            <img src="/media/inspiracje/lounge/lounge-01.webp" alt="Aranżacja wnętrza z fotelami HENRY Lounge" loading="lazy" />
            <div className="arrangement__veil" />
            <h3>Lounge</h3>
            <div className="arrangement__cta" aria-hidden="true"><i className="diagonal-arrow" /></div>
          </Link>
        </div>
      </section>

      <section id="filozofia-henry" className="philosophy philosophy--compact">
        <p className="philosophy__lead" data-reveal>Najwyższa jakość<br />nie potrzebuje hałasu</p>
        <div className="philosophy__spread">
          <p data-reveal>Naszą inspiracją jest historia kina, miejsca w którym rzemiosło i emocje zawsze szły w parze</p>
          <figure className="image-reveal" data-reveal>
            <img src="/media/philosophy-cinema-seats.png" alt="Rząd zabytkowych foteli kinowych i rzutnik filmowy" loading="lazy" />
          </figure>
          <div className="philosophy__quote-block">
            <blockquote data-reveal>„Projektujemy dla momentu, który zostaje z Tobą po napisach”</blockquote>
            <Link className="text-link philosophy__link" href="/filozofia-henry" data-reveal>Poznaj nas bliżej <span className="diagonal-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section id="istota-henry" className="about section-base">
        <h2 className="about__statement about__statement--compact" data-reveal>
          Komfort nie zaczyna się<br />
          <span>w fotelu.</span> Zaczyna się<br />
          w tym, co czujesz
        </h2>
        <div className="about__composition">
          <figure className="about__image image-reveal" data-reveal>
            <img src="/media/about-feeling.webp" alt="Rząd kremowych foteli HENRY w prywatnej sali kinowej" loading="lazy" />
          </figure>
          <div className="about__copy" data-reveal>
            <p>Projektujemy doświadczenie prywatnego kina — od pierwszego dotyku materiału po ciszę tuż przed seansem</p>
            <p>Forma, ergonomia i technologia spotykają się w jednym celu: stworzyć miejsce, do którego chcesz wracać</p>
          </div>
        </div>
      </section>

      <section id="projekty-indywidualne" className="bespoke bespoke--compact section-base">
        <div className="bespoke__intro">
          <h2 data-reveal>Od pierwszej linii<br />do ostatniego <span>detalu</span></h2>
          <p data-reveal>Pracujemy z architektami, projektantami i prywatnymi klientami, tworząc meble oraz całe układy dopasowane do przestrzeni</p>
        </div>
        <div className="bespoke__gallery">
          <figure className="bespoke__main spread-reveal spread-reveal--center" data-reveal>
            <img src="/media/bespoke-private-residence.webp" alt="Indywidualny projekt prywatnej sali kinowej HENRY" loading="lazy" />
            <figcaption><span>Private Residence</span><span>Wizualizacja koncepcyjna</span></figcaption>
          </figure>
          <figure className="bespoke__detail spread-reveal spread-reveal--left" data-reveal>
            <img src="/media/bespoke-reading-nook.png" alt="Rząd bordowych foteli HENRY w prywatnej sali kinowej" loading="lazy" />
            <figcaption><span>Projektowanie doświadczenia</span></figcaption>
          </figure>
          <figure className="bespoke__object spread-reveal spread-reveal--right" data-reveal>
            <img src="/media/bespoke-custom-form.png" alt="Rząd czarnych foteli HENRY w sali kinowej z czerwonym dywanem" loading="lazy" />
            <figcaption><span>Moment premiery</span></figcaption>
          </figure>
        </div>
        <div className="bespoke__cta-row">
          <Link className="text-link bespoke__cta" href="/projekty-indywidualne" data-reveal>PROJEKTY INDYWIDUALNE <span className="diagonal-arrow" aria-hidden="true" /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
