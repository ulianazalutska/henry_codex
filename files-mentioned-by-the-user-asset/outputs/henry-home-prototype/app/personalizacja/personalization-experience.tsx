"use client";

import { useEffect, useState } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./personalization.module.css";

const details = [
  { image: "/media/personalizacja/detail-table.png", label: "Stolik osobisty" },
  { image: "/media/personalizacja/detail-floor-led.png", label: "Światło ambientowe" },
  { image: "/media/personalizacja/detail-base.png", label: "Podświetlana podstawa" },
  { image: "/media/personalizacja/detail-pocket.png", label: "Kieszeń boczna" },
  { image: "/media/personalizacja/detail-usb.png", label: "Złącza USB", cta: true },
  { image: "/media/personalizacja/detail-embroidery.png", label: "Indywidualny haft" },
  { image: "/media/personalizacja/detail-speaker.png", label: "Dźwięk osobisty" },
  { image: "/media/personalizacja/detail-cup.png", label: "Cup holder Hot & Cold" },
  { image: "/media/personalizacja/detail-controls.png", label: "Sterowanie pod ręką" },
];

const equipment = [
  { key: "headrest", number: "01", title: "Elektryczny zagłówek", description: "Płynna regulacja dopasowana do sylwetki.", image: "/media/personalizacja/headrest.png" },
  { key: "cup", number: "02", title: "Cup holder Hot & Cold", description: "Chłodzi lub podgrzewa napój.", image: "/media/personalizacja/cup.png" },
  { key: "recline", number: "03", title: "Dwa niezależne silniki", description: "Oparcie i podnóżek pracują osobno.", image: "/media/personalizacja/recline.png" },
  { key: "heat", number: "04", title: "Mata grzewcza", description: "Ciepło w oparciu i siedzisku.", image: "/media/personalizacja/heat.png" },
  { key: "holder", number: "05", title: "Uchwyt na telefon lub tablet", description: "Ekran zawsze w odpowiednim miejscu.", image: "/media/personalizacja/holder.png" },
  { key: "wood", number: "06", title: "Indywidualny kolor drewna", description: "Wykończenie dopasowane do wnętrza.", image: "/media/personalizacja/wood.png" },
];

const materials = [
  {
    key: "leather",
    number: "01",
    title: "Skóra",
    note: "12 odcieni",
    images: [
      "/media/personalizacja/materials/leather-black.png",
      "/media/personalizacja/materials/leather-graphite.png",
      "/media/personalizacja/materials/leather-cognac.png",
      "/media/personalizacja/materials/leather-bordeaux.png",
      "/media/personalizacja/materials/leather-navy.png",
      "/media/personalizacja/materials/leather-forest.png",
      "/media/personalizacja/materials/leather-ivory.png",
      "/media/personalizacja/materials/leather-sand.png",
    ],
  },
  {
    key: "wood",
    number: "02",
    title: "Drewno",
    note: "4 wykończenia",
    images: [
      "/media/personalizacja/materials/wood-smoked-gloss.png",
      "/media/personalizacja/materials/wood-walnut.png",
      "/media/personalizacja/materials/wood-oak.png",
      "/media/personalizacja/materials/wood-ebony.png",
    ],
  },
  {
    key: "stitching",
    number: "03",
    title: "Pikowanie",
    note: "6 rytmów",
    images: [
      "/media/personalizacja/materials/stitch-diamond.png",
      "/media/personalizacja/materials/stitch-square.png",
      "/media/personalizacja/materials/stitch-button.png",
      "/media/personalizacja/materials/stitch-harlequin.png",
      "/media/personalizacja/materials/stitch-vertical.png",
      "/media/personalizacja/materials/stitch-horizontal.png",
    ],
  },
];

export function PersonalizationExperience() {
  const [activeEquipment, setActiveEquipment] = useState(0);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [materialVariants, setMaterialVariants] = useState([0, 0, 0]);
  const selectedEquipment = equipment[activeEquipment];

  const selectMaterialVariant = (materialIndex: number, variantIndex: number) => {
    setActiveMaterial(materialIndex);
    setMaterialVariants((current) => current.map((value, index) => index === materialIndex ? variantIndex : value));
  };

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-personal-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7%" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top" className={styles.page}>
      <SiteNavigation solid />

      <section className={styles.intro} aria-labelledby="personalization-title">
        <p className={styles.eyebrow} data-personal-reveal>Nie wybierasz gotowego fotela</p>
        <h1 id="personalization-title" data-personal-reveal>Budujesz własny<br /><em>standard komfortu.</em></h1>

        <div className={styles.introStory}>
          <figure data-personal-reveal><img src="/media/personalizacja/intro-lineup.png" alt="Trzy spersonalizowane fotele HENRY" /></figure>
          <p data-personal-reveal>Od osobistego haftu po sposób, w jaki fotel reaguje na dotyk.</p>
          <span data-personal-reveal>Rzemiosło i technologia.<br />Jeden indywidualny egzemplarz.</span>
        </div>

        <div className={styles.introLegend} data-personal-reveal aria-label="Zakres personalizacji">
          <span>Haft</span><span>Technologia</span><span>Komfort</span><span>Wykończenie</span>
        </div>
      </section>

      <section className={styles.detailGallery} aria-label="Detale personalizacji HENRY">
        <div className={styles.detailGalleryInner}>
          {details.map((detail) => (
            <figure className={detail.cta ? styles.detailCta : ""} data-personal-reveal key={detail.label}>
              <img src={detail.image} alt={detail.label} />
              {detail.cta ? <a href="#technology">Skonfiguruj <i aria-hidden="true">↗</i></a> : <figcaption>{detail.label}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.cinematic} data-personal-reveal>
        <img src="/media/personalizacja/recline.png" alt="Fotel HENRY z niezależnie regulowanym oparciem i podnóżkiem" />
        <div><p>Pozycja zapamiętana.</p><h2>Komfort,<br />który podąża.</h2></div>
        <span>Dwa silniki · niezależna regulacja</span>
      </section>

      <section id="technology" className={styles.technology} aria-labelledby="technology-title">
        <header data-personal-reveal>
          <p>02 / Wyposażenie dodatkowe</p>
          <h2 id="technology-title">Technologia<br /><em>pod skórą.</em></h2>
          <span>Wybierz detal, aby zobaczyć więcej.</span>
        </header>

        <div className={styles.equipmentExplorer}>
          <div className={styles.equipmentList} data-personal-reveal role="tablist" aria-label="Wyposażenie fotela">
            {equipment.map((item, index) => (
              <button className={activeEquipment === index ? styles.isActive : ""} onClick={() => setActiveEquipment(index)} role="tab" aria-selected={activeEquipment === index} aria-controls="equipment-preview" key={item.key}>
                <span>{item.number}</span><strong>{item.title}</strong><i aria-hidden="true" />
              </button>
            ))}
          </div>

          <article id="equipment-preview" className={styles.equipmentPreview} data-personal-reveal role="tabpanel">
            <figure key={selectedEquipment.key}><img src={selectedEquipment.image} alt={selectedEquipment.title} /></figure>
            <div><span>{selectedEquipment.number} / 06</span><h3>{selectedEquipment.title}</h3><p>{selectedEquipment.description}</p></div>
          </article>
        </div>
      </section>

      <section className={styles.materials} aria-labelledby="materials-title">
        <header data-personal-reveal>
          <p>03 / Materiały</p>
          <h2 id="materials-title">Dotyk.<br /><em>Kolor. Rytm.</em></h2>
        </header>
        <div className={styles.materialPanels} data-personal-reveal>
          {materials.map((material, materialIndex) => (
            <article className={activeMaterial === materialIndex ? styles.isActive : ""} key={material.key}>
              <button className={styles.materialTrigger} onClick={() => setActiveMaterial(materialIndex)} aria-expanded={activeMaterial === materialIndex}>
                <img key={material.images[materialVariants[materialIndex]]} src={material.images[materialVariants[materialIndex]]} alt={`${material.title} — wybrany wariant`} />
                <span>{material.number}</span>
                <div><small>{material.note}</small><h3>{material.title}</h3></div>
              </button>
              <div className={styles.materialVariants} aria-label={`Warianty: ${material.title}`}>
                {material.images.map((image, variantIndex) => (
                  <button className={materialVariants[materialIndex] === variantIndex ? styles.isSelected : ""} onClick={() => selectMaterialVariant(materialIndex, variantIndex)} aria-label={`${material.title}, wariant ${variantIndex + 1}`} key={image}>
                    <img src={image} alt="" />
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.closing} data-personal-reveal>
        <p>Twój egzemplarz HENRY</p>
        <h2>Skonfigurujmy<br /><em>Twój fotel.</em></h2>
        <a href="/kontakt"><span>Zapytaj o model</span><i aria-hidden="true">↗</i></a>
      </section>

      <SiteFooter />
    </main>
  );
}
