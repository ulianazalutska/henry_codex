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
    short: "Precyzyjne podparcie głowy i szyi.",
    description: "Płynna, elektryczna regulacja wysokości pozwala ustawić zagłówek dokładnie do sylwetki i pozycji oglądania.",
    image: "/media/personalizacja/headrest.png",
  },
  {
    key: "cup",
    number: "02",
    title: "Cup holder Hot & Cold",
    short: "Temperatura napoju pod kontrolą.",
    description: "Dedykowany uchwyt może chłodzić lub podgrzewać napój. Dyskretne podświetlenie pokazuje wybrany tryb również podczas seansu.",
    image: "/media/personalizacja/cup.png",
  },
  {
    key: "recline",
    number: "03",
    title: "Dwa niezależne silniki",
    short: "Oparcie i podnóżek pracują osobno.",
    description: "Dwa mechanizmy elektryczne pozwalają niezależnie regulować kąt oparcia i wysunięcie podnóżka, tworząc naturalną pozycję relaksu.",
    image: "/media/personalizacja/recline.png",
  },
  {
    key: "heat",
    number: "04",
    title: "Mata grzewcza",
    short: "Ciepło w oparciu i siedzisku.",
    description: "Zintegrowane strefy grzewcze równomiernie ogrzewają siedzisko i oparcie, pozostając całkowicie niewidoczne pod tapicerką.",
    image: "/media/personalizacja/heat.png",
  },
  {
    key: "holder",
    number: "05",
    title: "Uchwyt na telefon lub tablet",
    short: "Ekran dokładnie tam, gdzie go potrzebujesz.",
    description: "Stabilne, regulowane ramię dopasowuje położenie telefonu lub tabletu i można je łatwo zdemontować, gdy nie jest potrzebne.",
    image: "/media/personalizacja/holder.png",
  },
  {
    key: "wood",
    number: "06",
    title: "Indywidualny kolor drewna",
    short: "Wykończenie dopasowane do wnętrza.",
    description: "Dobieramy gatunek, odcień i stopień połysku drewna tak, aby podłokietniki tworzyły spójną całość z architekturą pomieszczenia.",
    image: "/media/personalizacja/wood.png",
  },
];

const markingTypes = [
  { key: "initials", label: "Inicjały", example: "AH" },
  { key: "name", label: "Imię", example: "Anna" },
  { key: "date", label: "Data", example: "19 · 08 · 26" },
  { key: "logo", label: "Logo", example: "H" },
];

const threadColors = [
  { name: "Royal Gold", value: "#d0a15b" },
  { name: "Warm Ivory", value: "#d8cfc1" },
  { name: "Bordeaux", value: "#7f3029" },
];

export function PersonalizationExperience() {
  const [activeEquipment, setActiveEquipment] = useState(0);
  const [markingType, setMarkingType] = useState("initials");
  const [markingText, setMarkingText] = useState("AH");
  const [thread, setThread] = useState(threadColors[0]);
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

  const chooseMarkingType = (key: string, example: string) => {
    setMarkingType(key);
    setMarkingText(example);
  };

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
        <div data-personal-reveal>
          <p>Od osobistego haftu po sposób, w jaki fotel reaguje na dotyk — każdy detal może odzwierciedlać Ciebie, markę lub charakter wnętrza.</p>
          <span>Personalizacja HENRY łączy pracę rzemieślnika z precyzją nowoczesnej technologii. Efektem nie jest wariant produktu, lecz indywidualny egzemplarz.</span>
        </div>
      </section>

      <section className={styles.embroidery} aria-labelledby="embroidery-title">
        <div className={styles.embroideryHeading} data-personal-reveal>
          <p>01 / Indywidualny haft</p>
          <h2 id="embroidery-title">Zostaw swój<br /><em>znak.</em></h2>
          <span>Logo firmy, imię, inicjały, ważna data — haft wykonujemy indywidualnie, dobierając skalę, umiejscowienie i kolor nici.</span>
        </div>

        <div className={styles.embroideryLab} data-personal-reveal>
          <figure className={styles.embroideryPreview}>
            <img src="/media/personalizacja/embroidery.png" alt="Podgląd indywidualnego haftu na zagłówku fotela" />
            <div className={styles.previewMark} style={{ color: thread.value }}>
              <strong>{markingType === "logo" ? "H" : markingText || "AH"}</strong>
              <small>{markingType === "logo" ? "YOUR LOGO" : "HENRY BESPOKE"}</small>
            </div>
            <figcaption><span>Podgląd poglądowy</span><span>{thread.name}</span></figcaption>
          </figure>

          <div className={styles.embroideryControls}>
            <div>
              <span>Rodzaj znakowania</span>
              <div className={styles.markingTabs}>
                {markingTypes.map((type) => (
                  <button className={markingType === type.key ? styles.isActive : ""} onClick={() => chooseMarkingType(type.key, type.example)} key={type.key}>{type.label}</button>
                ))}
              </div>
            </div>
            <label>
              <span>Treść haftu</span>
              <input value={markingText} onChange={(event) => setMarkingText(event.target.value.slice(0, 12))} aria-label="Treść haftu" maxLength={12} disabled={markingType === "logo"} />
              <small>{markingText.length} / 12</small>
            </label>
            <div>
              <span>Kolor nici</span>
              <div className={styles.threadColors}>
                {threadColors.map((color) => (
                  <button className={thread.name === color.name ? styles.isActive : ""} onClick={() => setThread(color)} aria-label={color.name} title={color.name} key={color.name}><i style={{ backgroundColor: color.value }} /></button>
                ))}
              </div>
            </div>
            <p>Finalny projekt haftu przygotowujemy do akceptacji przed rozpoczęciem produkcji.</p>
          </div>
        </div>
      </section>

      <section className={styles.technology} aria-labelledby="technology-title">
        <header data-personal-reveal>
          <p>02 / Wyposażenie dodatkowe</p>
          <h2 id="technology-title">Technologia<br /><em>pod skórą.</em></h2>
          <span>Sześć rozwiązań, które możesz połączyć w jednej, indywidualnej konfiguracji.</span>
        </header>

        <div className={styles.equipmentExplorer}>
          <div className={styles.equipmentList} data-personal-reveal role="tablist" aria-label="Wyposażenie fotela">
            {equipment.map((item, index) => (
              <button className={activeEquipment === index ? styles.isActive : ""} onClick={() => setActiveEquipment(index)} role="tab" aria-selected={activeEquipment === index} aria-controls="equipment-preview" key={item.key}>
                <span>{item.number}</span>
                <div><strong>{item.title}</strong><small>{item.short}</small></div>
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
          <span>Odcień skóry, rodzaj pikowania, kolor nici i drewna projektujemy jako jedną kompozycję. Możemy dopasować ją do próbki materiału, zabudowy lub palety całego wnętrza.</span>
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
