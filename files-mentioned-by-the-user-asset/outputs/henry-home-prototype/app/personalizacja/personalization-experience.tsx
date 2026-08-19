"use client";

import { useEffect, useState } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./personalization.module.css";

const equipment = [
  {
    key: "headrest",
    number: "01",
    title: "Elektryczny zagłówek",
    description: "Płynna regulacja dopasowana do sylwetki i pozycji oglądania.",
    image: "/media/personalizacja/headrest.png",
  },
  {
    key: "cup",
    number: "02",
    title: "Cup holder Hot & Cold",
    description: "Chłodzi lub podgrzewa napój — także podczas seansu.",
    image: "/media/personalizacja/cup.png",
  },
  {
    key: "recline",
    number: "03",
    title: "Dwa niezależne silniki",
    description: "Oparcie i podnóżek pracują niezależnie.",
    image: "/media/personalizacja/recline.png",
  },
  {
    key: "heat",
    number: "04",
    title: "Mata grzewcza",
    description: "Dyskretne ciepło w oparciu i siedzisku.",
    image: "/media/personalizacja/heat.png",
  },
  {
    key: "holder",
    number: "05",
    title: "Uchwyt na telefon lub tablet",
    description: "Regulowane ramię na telefon lub tablet.",
    image: "/media/personalizacja/holder.png",
  },
  {
    key: "wood",
    number: "06",
    title: "Indywidualny kolor drewna",
    description: "Odcień i połysk dopasowane do wnętrza.",
    image: "/media/personalizacja/wood.png",
  },
];

export function PersonalizationExperience() {
  const [activeEquipment, setActiveEquipment] = useState(0);
  const selectedEquipment = equipment[activeEquipment];

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-personal-reveal]"));
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

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation solid={false} />

      <header className={styles.hero}>
        <img src="/media/personalizacja/hero.png" alt="Rząd indywidualnie skonfigurowanych foteli HENRY" />
        <div className={styles.heroShade} />
        <p>HENRY / Personalizacja</p>
        <h1>Jedyny taki.<br /><em>Twój.</em></h1>
        <div className={styles.heroMeta}><span>Haft</span><span>Komfort</span><span>Technologia</span><span>Wykończenie</span></div>
        <i aria-hidden="true" />
      </header>

      <section className={styles.manifesto}>
        <p data-personal-reveal>Nie wybierasz gotowego fotela.</p>
        <h2 data-personal-reveal>Budujesz własny<br /><em>standard komfortu.</em></h2>
        <p className={styles.manifestoNote} data-personal-reveal>Każdy detal powstaje dla jednej osoby<br />i jednego wnętrza.</p>
      </section>

      <section className={styles.embroidery} aria-labelledby="embroidery-title">
        <div className={styles.embroideryComposition} data-personal-reveal>
          <div className={styles.embroideryTitle}>
            <p>01 / Haft</p>
            <h2 id="embroidery-title">Podpisane<br /><em>przez Ciebie.</em></h2>
          </div>
          <figure className={styles.embroideryPreview}>
            <img src="/media/personalizacja/embroidery.png" alt="Podgląd indywidualnego haftu na zagłówku fotela" />
            <figcaption>Logo · Imię · Inicjały · Data</figcaption>
          </figure>
          <div className={styles.embroiderySignature} aria-hidden="true"><span>H</span><i /></div>
        </div>
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <header data-personal-reveal>
          <p>02 / Wyposażenie dodatkowe</p>
          <h2 id="technology-title">Technologia<br /><em>pod skórą.</em></h2>
        </header>

        <div className={styles.equipmentExplorer}>
          <div className={styles.equipmentList} data-personal-reveal role="tablist" aria-label="Wyposażenie fotela">
            {equipment.map((item, index) => (
              <button className={activeEquipment === index ? styles.isActive : ""} onClick={() => setActiveEquipment(index)} role="tab" aria-selected={activeEquipment === index} aria-controls="equipment-preview" key={item.key}>
                <span>{item.number}</span>
                <div><strong>{item.title}</strong></div>
                <i aria-hidden="true" />
              </button>
            ))}
          </div>

          <article id="equipment-preview" className={styles.equipmentPreview} data-personal-reveal role="tabpanel">
            <figure key={selectedEquipment.key}><img src={selectedEquipment.image} alt={selectedEquipment.title} /></figure>
            <div>
              <span>{selectedEquipment.number} / 06</span>
              <h3>{selectedEquipment.title}</h3>
              <p>{selectedEquipment.description}</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.finishStory}>
        <figure data-personal-reveal><img src="/media/personalizacja/wood.png" alt="Cztery warianty wykończenia drewna fotela HENRY" /></figure>
        <div data-personal-reveal>
          <p>03 / Wykończenie</p>
          <h2>Ten sam fotel.<br /><em>Inny charakter.</em></h2>
          <span>Skóra, pikowanie, nić i drewno — jedna kompozycja.</span>
          <div><small>Skóra</small><small>Pikowanie</small><small>Nić</small><small>Drewno</small></div>
        </div>
      </section>

      <section className={styles.closing} data-personal-reveal>
        <img src="/media/personalizacja/chair.png" alt="Spersonalizowany fotel HENRY" />
        <div>
          <p>Twój projekt zaczyna się tutaj</p>
          <h2>Stwórzmy<br /><em>Twój fotel.</em></h2>
          <a href="/kontakt">Porozmawiaj z nami <i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
