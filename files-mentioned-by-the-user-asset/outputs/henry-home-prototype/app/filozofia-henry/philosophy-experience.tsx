"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./philosophy.module.css";

const principles = [
  {
    number: "01",
    title: "Forma",
    statement: "Zanim usiądziesz.",
    description: "Proporcja, linia i detal budują obecność fotela we wnętrzu.",
    image: "/media/filozofia-henry/design-studio.png",
    position: "center",
  },
  {
    number: "02",
    title: "Komfort",
    statement: "Kiedy zostajesz.",
    description: "Mechanika ma działać intuicyjnie, a ciało po prostu odpoczywać.",
    image: "/media/filozofia-henry/comfort.png",
    position: "center",
  },
  {
    number: "03",
    title: "Trwałość",
    statement: "Przez lata.",
    description: "Materiały, konstrukcja i ręczne wykończenie tworzą jakość, która nie przemija.",
    image: "/media/filozofia-henry/hand-stitching.png",
    position: "center",
  },
];

export function PhilosophyExperience() {
  const [activePrinciple, setActivePrinciple] = useState(0);

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

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation />

      <section className={styles.hero} aria-labelledby="philosophy-title">
        <img className={styles.heroImage} src="/media/filozofia-henry/workshop.png" alt="Rzemieślnik pracujący nad skórzanym fotelem HENRY" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p>Filozofia HENRY / od lat 80.</p>
          <h1 id="philosophy-title"><span>Rzemiosło,</span><br /><em>które patrzy w przyszłość.</em></h1>
        </div>
        <span className={styles.heroScroll}>Przewiń, aby poznać historię <i aria-hidden="true">↓</i></span>
      </section>

      <section className={styles.origin} aria-labelledby="origin-title">
        <div className={styles.originHeading} data-philosophy-reveal>
          <p>01 / Początek</p>
          <h2 id="origin-title">Zaczęło się<br /><em>od miłości do foteli.</em></h2>
        </div>

        <div className={styles.originGrid}>
          <figure className={styles.originDrawing} data-philosophy-reveal>
            <img src="/media/filozofia-henry/drawing.png" alt="Rysunek techniczny fotela HENRY przy stole projektowym" />
            <figcaption>Od pomysłu do proporcji</figcaption>
          </figure>
          <div className={styles.originText} data-philosophy-reveal>
            <strong>Lata 80. / Bydgoszcz</strong>
            <p>W oficynie kamienicy w centrum miasta powstał mały zakład tapicerski. Od początku liczyły się jakość, odwaga w szukaniu rozwiązań i uważne słuchanie ludzi.</p>
          </div>
          <figure className={styles.originDetail} data-philosophy-reveal>
            <img src="/media/filozofia-henry/cnc-detail.png" alt="Precyzyjna obróbka drewnianego elementu fotela" />
            <figcaption>Precyzja w każdym etapie</figcaption>
          </figure>
          <p className={styles.originNow} data-philosophy-reveal>Dziś tę samą wrażliwość łączymy z technologią — projektując fotele skrojone do człowieka, wnętrza i chwili.</p>
        </div>
      </section>

      <section className={styles.manifesto} data-philosophy-reveal aria-label="Manifest HENRY">
        <span>Nie produkujemy po prostu mebli.</span>
        <h2>Projektujemy sposób,<br /><em>w jaki przeżywasz chwilę.</em></h2>
      </section>

      <section className={styles.principles} aria-labelledby="principles-title">
        <header data-philosophy-reveal>
          <p>02 / Filozofia produktu</p>
          <h2 id="principles-title">Trzy wartości.<br /><em>Jeden efekt.</em></h2>
          <span>Wybierz wartość, aby zobaczyć więcej.</span>
        </header>

        <div className={styles.principlePanels} data-philosophy-reveal>
          {principles.map((principle, index) => (
            <article
              className={activePrinciple === index ? styles.activePrinciple : ""}
              key={principle.title}
              onMouseEnter={() => setActivePrinciple(index)}
              onFocus={() => setActivePrinciple(index)}
            >
              <button type="button" onClick={() => setActivePrinciple(index)} aria-expanded={activePrinciple === index}>
                <img src={principle.image} alt="" style={{ objectPosition: principle.position }} />
                <span className={styles.principleNumber}>{principle.number}</span>
                <div className={styles.principleName}>
                  <small>{principle.statement}</small>
                  <h3>{principle.title}</h3>
                </div>
                <p>{principle.description}</p>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.craft} aria-labelledby="craft-title">
        <header data-philosophy-reveal>
          <p>03 / Produkcja</p>
          <h2 id="craft-title">Najpierw człowiek.<br /><em>Potem technologia.</em></h2>
          <span>Każdy model przechodzi przez ręce projektantów, konstruktorów i tapicerów.</span>
        </header>

        <div className={styles.craftGrid}>
          <figure className={styles.craftMain} data-philosophy-reveal>
            <img src="/media/filozofia-henry/hand-stitching.png" alt="Ręczne szycie skórzanego obicia fotela" />
            <figcaption>Ręka pamięta to, czego maszyna nie czuje.</figcaption>
          </figure>
          <figure className={styles.craftMaterials} data-philosophy-reveal>
            <img src="/media/filozofia-henry/materials.png" alt="Skóra, tkaniny i drewno wykorzystywane w fotelach HENRY" />
            <figcaption>Materiały dobierane do wnętrza</figcaption>
          </figure>
          <figure className={styles.craftStudio} data-philosophy-reveal>
            <img src="/media/filozofia-henry/design-studio.png" alt="Gotowy fotel HENRY w studiu projektowym" />
            <figcaption>Projekt sprawdzony w rzeczywistości</figcaption>
          </figure>
          <blockquote data-philosophy-reveal>Technologia ma wspierać rękę.<br /><em>Nigdy jej nie zastępować.</em></blockquote>
        </div>
      </section>

      <section className={styles.effect} data-philosophy-reveal>
        <img src="/media/filozofia-henry/cinema.png" alt="Prywatna sala kinowa wyposażona w fotele HENRY" />
        <div>
          <p>04 / Efekt</p>
          <h2>Komfort, który<br /><em>zostaje z Tobą.</em></h2>
          <span>Fotel ma wyglądać właściwie, działać bez wysiłku i po latach dawać tę samą satysfakcję.</span>
          <Link href="/kolekcje"><b>Poznaj kolekcje</b><i aria-hidden="true">↗</i></Link>
        </div>
      </section>

      <section className={styles.closing} data-philosophy-reveal>
        <p>Twój rozdział historii HENRY</p>
        <h2>Stwórzmy coś,<br /><em>co pozostanie.</em></h2>
        <Link href="/kontakt"><span>Porozmawiajmy o projekcie</span><i aria-hidden="true">↗</i></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
