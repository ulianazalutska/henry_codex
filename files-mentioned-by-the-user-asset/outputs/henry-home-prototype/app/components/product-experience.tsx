"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import type { HenryCollection, HenryProduct } from "../collections-data";

type MaterialKey = "leather" | "alcantara" | "wood" | "quilting" | "combinations";

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

const materials: Array<{ key: MaterialKey; label: string; files: string[]; names: string[] }> = [
  {
    key: "leather",
    label: "Skóra",
    files: Array.from({ length: 12 }, (_, index) => `${novaRoot}/materials/leather/leather-${String(index + 1).padStart(2, "0")}.png`),
    names: ["Ivory Mist", "Warm Sand", "Natural Taupe", "Stone", "Cognac", "Olive", "Forest", "Graphite", "Onyx", "Midnight", "Charcoal", "Bordeaux"],
  },
  { key: "alcantara", label: "Alcantara", files: [], names: [] },
  {
    key: "wood",
    label: "Drewno",
    files: Array.from({ length: 4 }, (_, index) => `${novaRoot}/materials/wood/wood-${String(index + 1).padStart(2, "0")}.png`),
    names: ["Natural Oak", "American Walnut", "Dark Walnut", "Smoked Ebony Gloss"],
  },
  {
    key: "quilting",
    label: "Pikowanie",
    files: Array.from({ length: 6 }, (_, index) => `${novaRoot}/materials/quilting/quilting-${String(index + 1).padStart(2, "0")}.png`),
    names: ["Diamond", "Channel", "Chevron", "Linear", "Contour", "Classic"],
  },
  { key: "combinations", label: "Kombinacje", files: [], names: [] },
];

const technicalDetails = [
  { title: "Wymiary", copy: "Szerokość 81 cm · głębokość 98 cm · wysokość 107 cm. Wysokość siedziska: 48 cm." },
  { title: "Mechanizm", copy: "Cichy elektryczny mechanizm relax z płynną regulacją oparcia i podnóżka." },
  { title: "Materiały", copy: "Skóra naturalna, wybrane tkaniny premium oraz elementy z litego drewna i forniru." },
  { title: "Komfort", copy: "Wielowarstwowe pianki, ergonomiczne podparcie lędźwiowe i regulowany zagłówek." },
  { title: "Elektryka", copy: "Zintegrowany panel sterowania, opcjonalne ładowanie USB oraz oświetlenie ambient LED." },
  { title: "Konfiguracja", copy: "Solo · Duo · układ rzędowy · indywidualny projekt sali kinowej." },
];

function Arrow({ direction }: { direction: "left" | "right" }) {
  return <span aria-hidden="true">{direction === "left" ? "←" : "→"}</span>;
}

export function ProductExperience({ collection, product, isReady }: { collection: HenryCollection; product: HenryProduct; isReady: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [materialKey, setMaterialKey] = useState<MaterialKey>("leather");
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [openDetail, setOpenDetail] = useState(-1);
  const carouselViewport = useRef<HTMLDivElement>(null);
  const carouselIndex = useRef(1);
  const carouselMoving = useRef(false);
  const carouselAnimation = useRef<number | null>(null);
  const dragState = useRef<{ pointerId: number; startX: number; startLeft: number } | null>(null);

  const slides = useMemo(() => isReady ? novaSlides : [
    { src: product.image, label: `${product.name} / materiały w przygotowaniu` },
    { src: product.catalogueImage || product.image, label: `${collection.name} / zapowiedź` },
    { src: collection.hero, label: `${collection.name} / kolekcja` },
  ], [collection.hero, collection.name, isReady, product]);
  const carouselSlides = useMemo(() => {
    const last = slides[slides.length - 1];
    const first = slides[0];
    return [
      { ...last, logicalIndex: slides.length - 1, key: "clone-last" },
      ...slides.map((slide, index) => ({ ...slide, logicalIndex: index, key: `slide-${index}` })),
      { ...first, logicalIndex: 0, key: "clone-first" },
    ];
  }, [slides]);
  const activeMaterial = materials.find((item) => item.key === materialKey) ?? materials[0];

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

  useEffect(() => {
    const syncPosition = () => {
      const viewport = carouselViewport.current;
      const slide = viewport?.querySelector<HTMLElement>(".product-carousel__slide");
      const track = viewport?.querySelector<HTMLElement>(".product-carousel__track");
      if (!viewport || !slide || !track) return;
      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      viewport.scrollLeft = carouselIndex.current * (slide.getBoundingClientRect().width + gap);
    };
    const frame = window.requestAnimationFrame(syncPosition);
    window.addEventListener("resize", syncPosition);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncPosition);
      if (carouselAnimation.current !== null) window.cancelAnimationFrame(carouselAnimation.current);
    };
  }, [slides.length]);

  const changeMaterial = (key: MaterialKey) => {
    setMaterialKey(key);
    setActiveSwatch(0);
  };

  const carouselStep = () => {
    const viewport = carouselViewport.current;
    const slide = viewport?.querySelector<HTMLElement>(".product-carousel__slide");
    const track = viewport?.querySelector<HTMLElement>(".product-carousel__track");
    if (!viewport || !slide || !track) return 0;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  const settleCarousel = (target: number) => {
    const viewport = carouselViewport.current;
    const step = carouselStep();
    if (!viewport || !step) return;
    let normalized = target;
    if (target === 0) normalized = slides.length;
    if (target === slides.length + 1) normalized = 1;
    if (normalized !== target) viewport.scrollLeft = normalized * step;
    carouselIndex.current = normalized;
    carouselMoving.current = false;
  };

  const animateCarouselTo = (targetLeft: number, onComplete: () => void) => {
    const viewport = carouselViewport.current;
    if (!viewport) return;
    if (carouselAnimation.current !== null) window.cancelAnimationFrame(carouselAnimation.current);
    const startLeft = viewport.scrollLeft;
    const distance = targetLeft - startLeft;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 560;
    if (duration === 0 || Math.abs(distance) < 1) {
      viewport.scrollLeft = targetLeft;
      onComplete();
      return;
    }
    const startedAt = window.performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      viewport.scrollLeft = startLeft + distance * eased;
      if (progress < 1) carouselAnimation.current = window.requestAnimationFrame(tick);
      else {
        carouselAnimation.current = null;
        viewport.scrollLeft = targetLeft;
        onComplete();
      }
    };
    carouselAnimation.current = window.requestAnimationFrame(tick);
  };

  const goToPhysicalSlide = (target: number) => {
    const viewport = carouselViewport.current;
    const step = carouselStep();
    if (!viewport || !step || carouselMoving.current) return;
    carouselMoving.current = true;
    const logicalIndex = (target - 1 + slides.length) % slides.length;
    setActiveSlide(logicalIndex);
    animateCarouselTo(target * step, () => settleCarousel(target));
  };

  const moveSlide = (direction: number) => {
    goToPhysicalSlide(carouselIndex.current + direction);
  };

  const selectSlide = (index: number) => {
    goToPhysicalSlide(index + 1);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || carouselMoving.current) return;
    event.preventDefault();
    dragState.current = { pointerId: event.pointerId, startX: event.clientX, startLeft: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    const step = carouselStep();
    const desiredLeft = drag.startLeft - (event.clientX - drag.startX);
    event.currentTarget.scrollLeft = Math.max(0, Math.min((slides.length + 1) * step, desiredLeft));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const distance = event.clientX - drag.startX;
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (Math.abs(distance) > 48) moveSlide(distance < 0 ? 1 : -1);
    else {
      carouselMoving.current = true;
      animateCarouselTo(carouselIndex.current * carouselStep(), () => { carouselMoving.current = false; });
    }
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragState.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    carouselMoving.current = true;
    animateCarouselTo(carouselIndex.current * carouselStep(), () => { carouselMoving.current = false; });
  };

  const heroImage = isReady ? `${novaRoot}/hero.png` : product.image;

  return (
    <>
      <section className={`product-hero ${isReady ? "" : "product-hero--placeholder"}`}>
        <img src={heroImage} alt={`${product.name} — ${collection.name}`} />
        <div className="product-hero__veil" />
        <a className="product-hero__back" href={`/kolekcje/${collection.slug}`}>← Kolekcja {collection.name}</a>
        <p className="product-hero__index">{collection.index} / {String(collection.products.findIndex((item) => item.slug === product.slug) + 1).padStart(2, "0")}</p>
        <h1>{product.name}</h1>
        <div className="product-hero__meta"><span>Private cinema seating</span><span>Made in Poland</span></div>
      </section>

      <section className="product-manifesto">
        <div className="product-eyebrow" data-product-reveal><span>01</span><p>Forma i doświadczenie</p></div>
        <h2 data-product-reveal>{isReady ? <>Architektura komfortu.<br /><em>Stworzona dla seansu.</em></> : <>{product.name}.<br /><em>Premiera w przygotowaniu.</em></>}</h2>
        <div className="product-manifesto__story" data-product-reveal>
          <p>{product.description}</p>
          <p>{isReady ? "Nova Solo łączy precyzyjną linię z miękkim, wielowarstwowym komfortem. Każdy detal — od sterowania po światło — pozostaje dyskretny, dopóki go nie potrzebujesz." : "Pełna prezentacja modelu, wyposażenie, wymiary i indywidualne wykończenia zostaną uzupełnione po dostarczeniu materiałów."}</p>
        </div>
        <figure className={`product-intro-frame ${isReady ? "" : "is-placeholder"}`} data-product-reveal>
          {isReady ? <img src={`${novaRoot}/intro.png`} alt="Nova Solo w prywatnej sali kinowej" /> : <img src={product.catalogueImage || product.image} alt={product.name} />}
          <figcaption><span>{collection.name} / {product.name}</span><span>Designed for the moment</span></figcaption>
        </figure>
      </section>

      <section className="product-carousel-section">
        <header data-product-reveal>
          <div className="product-eyebrow"><span>02</span><p>Konfiguracje</p></div>
          <h2>Wybierz swój<br /><em>nastrój.</em></h2>
          <p>{isReady ? "Trzy interpretacje tej samej bryły. Zmieniaj kolorystykę i zobacz, jak Nova Solo reaguje na charakter wnętrza." : "Kolejne wizualizacje modelu pojawią się tutaj po przygotowaniu materiałów."}</p>
        </header>
        <div className="product-carousel" data-product-reveal aria-roledescription="carousel" aria-label={`Wizualizacje ${product.name}`}>
          <div
            ref={carouselViewport}
            className="product-carousel__viewport"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onDragStart={(event) => event.preventDefault()}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") moveSlide(-1);
              if (event.key === "ArrowRight") moveSlide(1);
            }}
            tabIndex={0}
          >
            <div className="product-carousel__track">
              {carouselSlides.map((slide) => (
                <figure className={`product-carousel__slide ${slide.logicalIndex === activeSlide ? "is-active" : ""}`} aria-hidden={slide.logicalIndex !== activeSlide} key={slide.key}>
                  <img src={slide.src} alt={slide.logicalIndex === activeSlide ? `${product.name}: ${slide.label}` : ""} draggable={false} />
                  <figcaption>{slide.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="product-carousel__controls">
            <button onClick={() => moveSlide(-1)} aria-label="Poprzednie zdjęcie"><Arrow direction="left" /></button>
            <div>{slides.map((_, index) => <button key={index} onClick={() => selectSlide(index)} aria-label={`Pokaż zdjęcie ${index + 1}`} aria-current={index === activeSlide} />)}</div>
            <button onClick={() => moveSlide(1)} aria-label="Następne zdjęcie"><Arrow direction="right" /></button>
          </div>
        </div>
      </section>

      <section className="product-features">
        <header data-product-reveal>
          <div className="product-eyebrow"><span>03</span><p>Wyposażenie</p></div>
          <h2>Technologia,<br /><em>która znika.</em></h2>
        </header>
        <div className="product-features__grid">
          {isReady ? featureCards.map((feature, index) => (
            <article data-product-reveal key={feature.title} style={{ "--reveal-delay": `${(index % 2) * 110}ms` } as CSSProperties}>
              <figure><img src={feature.image} alt={feature.title} /></figure>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
            </article>
          )) : Array.from({ length: 4 }, (_, index) => (
            <article className="is-placeholder" data-product-reveal key={index}>
              <figure><span>H</span><small>Materiały w przygotowaniu</small></figure>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{["Sterowanie", "Komfort", "Detale", "Oświetlenie"][index]}</h3>
              <p>Opis wyposażenia modelu zostanie dodany w kolejnym etapie.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="product-specification">
        <header data-product-reveal>
          <div className="product-eyebrow"><span>04</span><p>Proporcje</p></div>
          <h2>Technical<br /><em>features.</em></h2>
        </header>
        <figure className={isReady ? "" : "is-placeholder"} data-product-reveal>
          {isReady ? <img src={`${novaRoot}/dimensions.png`} alt="Nova Solo — widok z przodu, boku i z góry z wymiarami" /> : <><span>Rysunek techniczny</span><small>W przygotowaniu</small></>}
        </figure>
      </section>

      <section className="product-materials">
        <header data-product-reveal>
          <div className="product-eyebrow"><span>05</span><p>Materiały i wykończenia</p></div>
          <h2>Dotyk tworzy<br /><em>charakter.</em></h2>
        </header>
        <div className={`material-lab ${isReady ? "" : "is-placeholder"}`} data-product-reveal>
          <div className="material-lab__tabs" role="tablist" aria-label="Kategorie wykończeń">
            {materials.map((material) => (
              <button role="tab" aria-selected={material.key === materialKey} className={material.key === materialKey ? "is-active" : ""} onClick={() => changeMaterial(material.key)} key={material.key}>{material.label}</button>
            ))}
          </div>
          {isReady && activeMaterial.files.length > 0 ? (
            <div className="material-lab__content">
              <div className="material-lab__swatches">
                {activeMaterial.files.map((file, index) => (
                  <button className={index === activeSwatch ? "is-active" : ""} onClick={() => setActiveSwatch(index)} aria-label={`Wybierz ${activeMaterial.names[index]}`} aria-pressed={index === activeSwatch} key={file}>
                    <img src={file} alt="" />
                  </button>
                ))}
              </div>
              <figure className="material-lab__preview">
                <img src={activeMaterial.files[activeSwatch]} alt={`Próbka: ${activeMaterial.names[activeSwatch]}`} />
                <figcaption><span>{activeMaterial.label}</span><strong>{activeMaterial.names[activeSwatch]}</strong></figcaption>
              </figure>
            </div>
          ) : (
            <div className="material-lab__empty"><span>H</span><p>{isReady ? `Wzornik ${activeMaterial.label.toLowerCase()} jest w przygotowaniu.` : `Wzorniki dla ${product.name} zostaną uzupełnione.`}</p></div>
          )}
        </div>
      </section>

      <section className="product-details">
        <header data-product-reveal>
          <div className="product-eyebrow"><span>06</span><p>Specyfikacja</p></div>
          <h2>Technical<br /><em>details.</em></h2>
        </header>
        <div className="product-accordion" data-product-reveal>
          {technicalDetails.map((detail, index) => {
            const isOpen = openDetail === index;
            return (
              <div className={isOpen ? "is-open" : ""} key={detail.title}>
                <button onClick={() => setOpenDetail(isOpen ? -1 : index)} aria-expanded={isOpen}>
                  <span>{detail.title}</span><i>{isOpen ? "−" : "+"}</i>
                </button>
                <p>{isReady ? detail.copy : `Dane dla ${product.name} są w przygotowaniu.`}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="product-closing" data-product-reveal>
        <div>
          <p>Inspiracje / osobna podstrona</p>
          <h2>{product.name}<br /><em>w aranżacjach.</em></h2>
          <span>Galeria wnętrz i wariantów kolorystycznych powstanie w kolejnym etapie.</span>
          <small>Wkrótce</small>
        </div>
        <img src={isReady ? `${novaRoot}/carousel-01.png` : product.image} alt="" />
      </section>

      <section className="product-contact" data-product-reveal>
        <p>Twój egzemplarz HENRY</p>
        <h2>Skonfigurujmy<br /><em>{product.name}.</em></h2>
        <a href="/kontakt">Zapytaj o model <span className="diagonal-arrow" aria-hidden="true" /></a>
      </section>
    </>
  );
}
