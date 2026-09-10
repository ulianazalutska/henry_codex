"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import type { HenryCollection, HenryProduct } from "../collections-data";

type MaterialKey = "leather" | "wood" | "quilting" | "combinations";
type MaterialSwatch = { name: string; swatchImg: string; previewImg: string };

const novaRoot = "/media/product-pages/nova-solo";

const novaSlides = [
  { src: `${novaRoot}/carousel-01.png`, label: "Graphite / Diamond" },
  { src: `${novaRoot}/carousel-02.png`, label: "Olive / Linear" },
  { src: `${novaRoot}/carousel-03.png`, label: "Midnight / Linear" },
];

const featureCards = [
  {
    title: "Integrated Controls",
    image: `${novaRoot}/feature-controls.png`,
    copy: "Intuicyjny panel sterowania pozwala wygodnie regulować pozycję fotela, zapewniając pełną kontrolę bez przerywania seansu.",
  },
  {
    title: "Personal Side Table",
    image: `${novaRoot}/feature-side-table.png`,
    copy: "Praktyczny stolik boczny pozwala mieć najważniejsze rzeczy zawsze pod ręką — od napoju po pilot czy smartfon.",
  },
  {
    title: "Electric Recline",
    image: `${novaRoot}/feature-recline.png`,
    copy: "Płynna, elektryczna regulacja oparcia i podnóżka pozwala dopasować pozycję do chwili pełnego relaksu.",
  },
  {
    title: "Illuminated Cup Holder",
    image: `${novaRoot}/feature-cup-holder.png`,
    copy: "Podświetlany uchwyt na kubek zapewnia wygodny dostęp do napoju, nawet podczas seansu przy zgaszonym świetle.",
  },
  {
    title: "Adjustable Headrest",
    image: `${novaRoot}/feature-headrest.png`,
    copy: "Regulowany zagłówek pozwala precyzyjnie dopasować podparcie głowy i szyi, zapewniając komfort podczas każdego seansu.",
  },
  {
    title: "Ambient LED Lighting",
    image: `${novaRoot}/feature-led.png`,
    copy: "Subtelne podświetlenie LED tworzy wyjątkową atmosferę i podkreśla elegancję fotela nawet w całkowitej ciemności.",
  },
];

const equipmentOptions = [
  { key: "cup", number: "01", title: "Cup holder Hot & Cold", description: "Chłodzi lub podgrzewa napój.", image: "/media/personalizacja/cup.png" },
  { key: "heat", number: "02", title: "Mata grzewcza", description: "Ciepło w oparciu i siedzisku.", image: "/media/personalizacja/heat.png" },
  { key: "speaker", number: "03", title: "Dźwięk osobisty", description: "Głośniki zintegrowane z zagłówkiem.", image: "/media/personalizacja/detail-speaker.png" },
  { key: "holder", number: "04", title: "Uchwyt na telefon lub tablet", description: "Ekran zawsze w odpowiednim miejscu.", image: "/media/personalizacja/holder.png" },
  { key: "headrest", number: "05", title: "Elektryczny zagłówek", description: "Płynna regulacja dopasowana do sylwetki.", image: "/media/personalizacja/headrest.png" },
];

const novaLeatherSwatches: MaterialSwatch[] = ["Ivory Mist", "Warm Sand", "Natural Taupe", "Stone", "Cognac", "Olive", "Forest", "Graphite", "Onyx", "Midnight", "Charcoal", "Bordeaux"].map((name, index) => {
  const file = `${novaRoot}/materials/leather/leather-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const novaWoodSwatches: MaterialSwatch[] = ["Natural Oak", "American Walnut", "Dark Walnut", "Smoked Ebony Gloss"].map((name, index) => {
  const file = `${novaRoot}/materials/wood/wood-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const novaQuiltingSwatches: MaterialSwatch[] = ["Diamond", "Channel", "Chevron", "Linear", "Contour", "Classic"].map((name, index) => {
  const file = `${novaRoot}/materials/quilting/quilting-${String(index + 1).padStart(2, "0")}.png`;
  return { name, swatchImg: file, previewImg: file };
});

const materialTabs: Array<{ key: MaterialKey; label: string }> = [
  { key: "leather", label: "Skóra" },
  { key: "wood", label: "Drewno" },
  { key: "quilting", label: "Pikowanie" },
  { key: "combinations", label: "Opcje wyposażenia" },
];

// Bottom edge (top% + height%) of each mosaic slot box{A..F} in .product-feature-box,
// relative to the 1313x2475 design the CSS percentages were authored against.
// The grid itself always keeps the full 1313/2475 ratio (so box top/height percentages,
// which resolve against the grid's own rendered height, stay pixel-identical to the design
// no matter how many boxes are shown) — a wrapper then clips away the unused height below
// the last box, measured in JS since that can't be derived from the box percentages alone.
const featureBoxBottomPercent = [22.15, 48.34, 63.53, 87.28, 103.68, 94.68];

function featureGridBottomFraction(boxCount: number) {
  return Math.max(...featureBoxBottomPercent.slice(0, boxCount)) / 100;
}

export function ProductExperience({ collection, product, isReady, isHero }: { collection: HenryCollection; product: HenryProduct; isReady: boolean; isHero: boolean }) {
  const productPhotoCards = [
    { title: product.name, copy: product.description },
    { title: "Detal wykończenia", copy: "Pełna sesja zdjęciowa modelu zostanie dodana wkrótce." },
    { title: "W aranżacji", copy: "Zobacz więcej w sekcji Aranżacje poniżej." },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const [materialKey, setMaterialKey] = useState<MaterialKey>("leather");
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [activeEquipmentOption, setActiveEquipmentOption] = useState(0);
  const dragState = useRef<{ pointerId: number; startX: number } | null>(null);
  const featureGridRef = useRef<HTMLDivElement>(null);
  const [featureGridClipHeight, setFeatureGridClipHeight] = useState<number>();
  const featureBoxCount = isHero ? featureCards.length : productPhotoCards.length;

  useEffect(() => {
    const grid = featureGridRef.current;
    if (!grid) return;
    const bottomFraction = featureGridBottomFraction(featureBoxCount);
    const measure = () => setFeatureGridClipHeight(grid.offsetWidth * (2475 / 1313) * bottomFraction);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [featureBoxCount]);

  const slides = useMemo(() => {
    if (isReady) return novaSlides;
    if (product.galleryImages && product.galleryImages.length > 0) {
      return product.galleryImages.map((src) => ({ src, label: product.name }));
    }
    return [
      { src: product.image, label: `${product.name} / materiały w przygotowaniu` },
      { src: product.catalogueImage || product.image, label: `${collection.name} / zapowiedź` },
      { src: collection.hero, label: `${collection.name} / kolekcja` },
    ];
  }, [collection.hero, collection.name, isReady, product]);
  const materialSwatches = useMemo<Record<MaterialKey, MaterialSwatch[]>>(() => ({
    leather: product.leatherSwatches
      ? product.leatherSwatches.map((item) => ({ name: item.name, swatchImg: item.swatch, previewImg: item.preview }))
      : isReady ? novaLeatherSwatches : [],
    wood: isReady ? novaWoodSwatches : [],
    quilting: isReady ? novaQuiltingSwatches : [],
    combinations: [],
  }), [isReady, product.leatherSwatches]);
  const activeMaterialLabel = materialTabs.find((item) => item.key === materialKey)?.label ?? materialTabs[0].label;
  const activeSwatches = materialSwatches[materialKey];
  const activeEquipmentData = equipmentOptions[Math.min(activeEquipmentOption, equipmentOptions.length - 1)];
  const activeSwatchData = activeSwatches[Math.min(activeSwatch, activeSwatches.length - 1)] as MaterialSwatch | undefined;
  const [outgoingPreview, setOutgoingPreview] = useState<string | null>(null);
  const previousPreviewRef = useRef<string | undefined>(activeSwatchData?.previewImg);

  useEffect(() => {
    const nextPreview = activeSwatchData?.previewImg;
    if (previousPreviewRef.current && previousPreviewRef.current !== nextPreview) {
      setOutgoingPreview(previousPreviewRef.current);
      const timeout = setTimeout(() => setOutgoingPreview(null), 700);
      previousPreviewRef.current = nextPreview;
      return () => clearTimeout(timeout);
    }
    previousPreviewRef.current = nextPreview;
  }, [activeSwatchData?.previewImg]);

  const prevIndex = (activeSlide - 1 + slides.length) % slides.length;
  const nextIndex = (activeSlide + 1) % slides.length;

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-product-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7%" });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const changeMaterial = (key: MaterialKey) => {
    setMaterialKey(key);
    setActiveSwatch(0);
  };

  const moveSlide = (direction: number) => {
    setActiveSlide((prev) => (prev + direction + slides.length) % slides.length);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    dragState.current = { pointerId: event.pointerId, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (Math.abs(distance) > 48) moveSlide(distance < 0 ? 1 : -1);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const heroImage = isReady ? `${novaRoot}/hero.png` : product.image;

  return (
    <>
      <section className={`product-hero ${isReady ? "" : "product-hero--placeholder"}`}>
        <img className="product-hero__photo" src={heroImage} alt={`${product.name} — ${collection.name}`} />
        <div className="product-hero__veil" />
        <h1>{product.name}</h1>
        <img className="product-hero__scroll" src="/media/product-pages/nova-solo/arrow-down.svg" alt="" aria-hidden="true" />
      </section>

      <section className="product-carousel-section">
        <header data-product-reveal>
          <div className="product-eyebrow"><p>Konfiguracje</p></div>
          <h2>Wybierz swój nastrój</h2>
          <p>{isReady ? "Trzy interpretacje tej samej bryły. Zmieniaj kolorystykę i zobacz, jak Nova Solo reaguje na charakter wnętrza." : "Kolejne wizualizacje modelu pojawią się tutaj po przygotowaniu materiałów."}</p>
        </header>
        <div className="product-carousel" data-product-reveal aria-roledescription="carousel" aria-label={`Wizualizacje ${product.name}`}>
          <div className="product-carousel__viewport">
            {slides.length > 1 && (
              <button type="button" className="product-carousel__peek product-carousel__peek--prev" onClick={() => moveSlide(-1)} aria-label={`Pokaż zdjęcie ${prevIndex + 1}`}>
                <img src={slides[prevIndex].src} alt="" draggable={false} />
                <span className="product-carousel__peek-num">{String(prevIndex + 1).padStart(2, "0")}<i aria-hidden="true" /></span>
              </button>
            )}
            <div
              className="product-carousel__stage"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onDragStart={(event) => event.preventDefault()}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") moveSlide(-1);
                if (event.key === "ArrowRight") moveSlide(1);
              }}
              tabIndex={0}
            >
              {slides.map((slide, index) => (
                <figure className={`product-carousel__slide ${index === activeSlide ? "is-active" : ""}`} aria-hidden={index !== activeSlide} key={`slide-${index}`}>
                  <img src={slide.src} alt={index === activeSlide ? `${product.name}: ${slide.label}` : ""} draggable={false} />
                  <figcaption>{slide.label}</figcaption>
                </figure>
              ))}
            </div>
            {slides.length > 1 && (
              <button type="button" className="product-carousel__peek product-carousel__peek--next" onClick={() => moveSlide(1)} aria-label={`Pokaż zdjęcie ${nextIndex + 1}`}>
                <img src={slides[nextIndex].src} alt="" draggable={false} />
                <span className="product-carousel__peek-num"><i aria-hidden="true" />{String(nextIndex + 1).padStart(2, "0")}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {isHero && (
      <section className="product-materials">
        <header data-product-reveal>
          <h2>Dotyk tworzy<br /><em>charakter</em></h2>
        </header>
        <div className="material-lab" data-product-reveal>
          <div className="material-lab__tabs" role="tablist" aria-label="Kategorie wykończeń">
            {materialTabs.map((material) => (
              <button role="tab" aria-selected={material.key === materialKey} className={material.key === materialKey ? "is-active" : ""} onClick={() => changeMaterial(material.key)} key={material.key}>{material.label}</button>
            ))}
          </div>
          {materialKey === "combinations" ? (
            <div className="material-lab__equipment">
              <div className="material-lab__equipment-list" role="tablist" aria-label="Opcje wyposażenia">
                {equipmentOptions.map((item, index) => (
                  <button
                    className={index === activeEquipmentOption ? "is-active" : ""}
                    onClick={() => setActiveEquipmentOption(index)}
                    role="tab"
                    aria-selected={index === activeEquipmentOption}
                    aria-controls="product-equipment-preview"
                    key={item.key}
                  >
                    <strong>{item.title}</strong><i aria-hidden="true" />
                  </button>
                ))}
              </div>
              <article id="product-equipment-preview" className="material-lab__equipment-preview" role="tabpanel">
                <figure key={activeEquipmentData.key}><img src={activeEquipmentData.image} alt={activeEquipmentData.title} /></figure>
              </article>
            </div>
          ) : activeSwatches.length > 0 ? (
            <div className="material-lab__content">
              <div className="material-lab__swatches">
                {activeSwatches.map((swatch, index) => (
                  <button className={index === activeSwatch ? "is-active" : ""} onClick={() => setActiveSwatch(index)} aria-label={`Wybierz ${swatch.name}`} aria-pressed={index === activeSwatch} key={swatch.name}>
                    <img src={swatch.swatchImg} alt="" />
                  </button>
                ))}
              </div>
              <figure className="material-lab__preview">
                <div className="material-lab__preview-stack">
                  {outgoingPreview && outgoingPreview !== activeSwatchData?.previewImg && (
                    <img key={`prev-${outgoingPreview}`} className="material-lab__preview-img is-outgoing" src={outgoingPreview} alt="" aria-hidden="true" />
                  )}
                  {activeSwatchData && (
                    <img key={`current-${activeSwatchData.previewImg}`} className="material-lab__preview-img is-current" src={activeSwatchData.previewImg} alt={`${product.name} — ${activeSwatchData.name}`} />
                  )}
                </div>
                <figcaption key={activeSwatchData?.name}><span>{activeMaterialLabel}</span><strong>{activeSwatchData?.name}</strong></figcaption>
              </figure>
            </div>
          ) : (
            <div className="material-lab__empty"><span>H</span><p>{`Wzornik „${activeMaterialLabel}” dla ${product.name} jest w przygotowaniu.`}</p></div>
          )}
        </div>
      </section>
      )}

      <section className="product-features">
        {isHero && (
          <header data-product-reveal>
            <h2>Technologia która znika</h2>
          </header>
        )}
        <div className="product-features__grid-clip" style={{ height: featureGridClipHeight ? `${featureGridClipHeight}px` : undefined }}>
        <div className="product-features__grid" ref={featureGridRef}>
          {isHero ? (
            featureCards.map((feature, index) => (
              <article className={`product-feature-box box${String.fromCharCode(65 + index)}${isReady ? "" : " is-placeholder"}`} data-product-reveal key={feature.title} style={{ "--reveal-delay": `${(index % 2) * 110}ms` } as CSSProperties}>
                <figure>
                  {isReady ? <img src={feature.image} alt={feature.title} /> : <><span>H</span><small>Materiały w przygotowaniu</small></>}
                </figure>
                <div className="product-feature-box__caption">
                  <h3>{feature.title}</h3>
                  <p>{feature.copy}</p>
                </div>
              </article>
            ))
          ) : (
            productPhotoCards.map((card, index) => (
              <article className={`product-feature-box box${String.fromCharCode(65 + index)}`} data-product-reveal key={card.title} style={{ "--reveal-delay": `${(index % 2) * 110}ms` } as CSSProperties}>
                <figure><img src={product.image} alt={product.name} /></figure>
                <div className="product-feature-box__caption">
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </div>
              </article>
            ))
          )}
        </div>
        </div>
      </section>

      <Link href={`/kolekcje/${collection.slug}/inspiracje?from=${encodeURIComponent(`/kolekcje/${collection.slug}/${product.slug}`)}`} className={`product-arrangements${isHero ? "" : " product-arrangements--tight"}`} data-product-reveal>
        <div className="product-arrangements__frame">
          <img className="product-arrangements__img" src={product.arrangementsImage || product.image} alt={`${collection.name} w aranżacjach`} />
          <div className="product-arrangements__veil" />
        </div>
        <h2 className="product-arrangements__heading">Zobacz {collection.name}<br />w aranżacjach <span className="diagonal-arrow" aria-hidden="true" /></h2>
      </Link>

      <section className="product-specification">
        <header data-product-reveal>
          <h2>Technical <em>features</em></h2>
        </header>
        <figure className={isReady ? "" : "is-placeholder"} data-product-reveal>
          {isReady ? <img src={`${novaRoot}/dimensions.png`} alt="Nova Solo — widok z przodu, boku i z góry z wymiarami" /> : <><span>Rysunek techniczny</span><small>W przygotowaniu</small></>}
        </figure>
      </section>
    </>
  );
}
