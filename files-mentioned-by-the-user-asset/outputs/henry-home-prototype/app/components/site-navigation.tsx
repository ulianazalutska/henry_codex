"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { collections } from "../collections-data";

// Lista modeli (trzecia kolumna menu) jest jeszcze niepotrzebna — przełącznik
// zostaje na miejscu, żeby przywrócić kolumnę wystarczyło ustawić true.
const PRODUCT_COLUMN_ENABLED = false;

export function SiteNavigation() {
  const stackRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const [instantClose, setInstantClose] = useState(false);
  const [closingAll, setClosingAll] = useState(false);
  const activeCollection = collections.find((collection) => collection.slug === openCollection);

  useEffect(() => {
    let lastY = window.scrollY;
    const measure = () => {
      const y = window.scrollY;
      const goingDown = y > lastY;
      setNavHidden(goingDown && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, []);

  const openMenu = () => {
    setInstantClose(false);
    setClosingAll(false);
    setCollectionsOpen(false);
    setOpenCollection(null);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setInstantClose(true);
    setClosingAll(true);
    setMenuOpen(false);
    setCollectionsOpen(false);
    setOpenCollection(null);
  };

  const toggleCollections = () => {
    if (collectionsOpen) {
      setInstantClose(Boolean(openCollection));
      setClosingAll(false);
      setCollectionsOpen(false);
      setOpenCollection(null);
      return;
    }
    setInstantClose(false);
    setClosingAll(false);
    setCollectionsOpen(true);
  };

  useEffect(() => {
    const stack = stackRef.current;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen || !stack) return;

    const focusColumn = openCollection ? ".menu-column--products" : collectionsOpen ? ".menu-column--collections" : ".menu-column--primary";
    stack.querySelector<HTMLElement>(`${focusColumn} button, ${focusColumn} a[href]`)?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (openCollection) setOpenCollection(null);
        else if (collectionsOpen) setCollectionsOpen(false);
        return;
      }
      const focusable = Array.from(stack.querySelectorAll<HTMLElement>('[data-active="true"] button:not([disabled]), [data-active="true"] a[href]'));
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, [menuOpen, collectionsOpen, openCollection]);

  return (
    <>
      <header className={`site-nav ${navHidden && !menuOpen ? "site-nav--hidden" : ""}`}>
        <button className="menu-trigger" onClick={openMenu} aria-label="Otwórz menu">
          <span className="menu-lines" aria-hidden="true"><i /><i /></span>
          <span>Menu</span>
        </button>
        <Link className="nav-mark" href="/" aria-label="HENRY — strona główna"><img src="/media/henry-logo-gold.png" alt="" /></Link>
        <label className="language" aria-label="Wybierz język">
          <select defaultValue="pl"><option value="pl">PL</option><option value="en" disabled>EN</option></select>
          <img src="/media/vector-chevron.svg" alt="" aria-hidden="true" />
        </label>
      </header>

      <div className={`menu-backdrop ${menuOpen ? "is-open" : ""}`} aria-hidden="true" />
      <div ref={stackRef} className={`menu-stack ${menuOpen ? "is-open" : ""} ${instantClose ? "menu-stack--instant-close" : ""} ${closingAll ? "menu-stack--close-all" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Menu główne">
        <aside className="menu-column menu-column--primary" data-active={menuOpen}>
          <div className="menu-panel__top"><button onClick={closeMenu}>Zamknij</button></div>
          <nav className="menu-list" aria-label="Menu główne">
            <button className={`menu-list__item menu-list__item--toggle ${collectionsOpen ? "is-active" : ""}`} onClick={toggleCollections} aria-expanded={collectionsOpen}>
              <span>Kolekcje</span><img src="/media/vector-chevron.svg" alt="" />
            </button>
            <Link href="/personalizacja" onClick={closeMenu}>Personalizacja</Link>
            <Link href="/projekty-indywidualne" onClick={closeMenu}>Projekty indywidualne</Link>
            <Link href="/filozofia-henry" onClick={closeMenu}>Filozofia Henry</Link>
            <Link href="/dla-architektow" onClick={closeMenu}>Dla architektów</Link>
            <Link href="/kontakt" onClick={closeMenu}>Kontakt</Link>
          </nav>
          <div className="menu-panel__footer"><Link href="/kontakt" className="menu-panel__contact" onClick={closeMenu}>
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="1" y="2.2" width="10" height="7.6" rx="1" stroke="currentColor" strokeWidth="1" /><path d="M1.3 3 6 6.4 10.7 3" stroke="currentColor" strokeWidth="1" /></svg>
              Kontakt
            </Link><span>Private cinema seating</span></div>
        </aside>

        <aside className={`menu-column menu-column--collections ${collectionsOpen ? "is-open" : ""}`} data-active={menuOpen && collectionsOpen} aria-hidden={!collectionsOpen}>
          <div className="menu-panel__mobile-top"><button onClick={toggleCollections}>← Menu</button></div>
          <div className="menu-products-heading">
            <Link href="/kolekcje" onClick={closeMenu}>Wszystkie kolekcje <span className="diagonal-arrow" aria-hidden="true" /></Link>
          </div>
          <nav className="menu-list menu-list--sub" aria-label="Kolekcje">
            {/* Trzecia kolumna (lista modeli) jest tymczasowo wyłączona — strzałka zostaje jako element dekoracyjny, ale cały wiersz prowadzi bezpośrednio do strony kolekcji. */}
            {collections.map((collection) => (
              <Link className="menu-list__item menu-list__item--toggle" href={`/kolekcje/${collection.slug}`} onClick={closeMenu} key={collection.slug}>
                <span>{collection.name}</span><img src="/media/vector-chevron.svg" alt="" aria-hidden="true" />
              </Link>
            ))}
          </nav>
          <div className="menu-panel__footer"><Link href="/kontakt" className="menu-panel__contact" onClick={closeMenu}>
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="1" y="2.2" width="10" height="7.6" rx="1" stroke="currentColor" strokeWidth="1" /><path d="M1.3 3 6 6.4 10.7 3" stroke="currentColor" strokeWidth="1" /></svg>
              Kontakt
            </Link><span>02 / Kolekcje</span></div>
        </aside>

        {/*
          Trzecia kolumna (lista modeli danej kolekcji) jest tymczasowo wyłączona —
          jeszcze nie jest potrzebna. Strzałka przy Atelier/Studio/Lounge zostaje
          wyłącznie jako dekoracja (patrz menu-column--collections wyżej).
          Żeby przywrócić: odkomentować poniższy blok i przywrócić onClick/aria-expanded
          na przyciskach kolekcji.
        */}
        {PRODUCT_COLUMN_ENABLED && (
          <aside className={`menu-column menu-column--products ${openCollection ? "is-open" : ""}`} data-active={menuOpen && Boolean(openCollection)} aria-hidden={!openCollection}>
            {activeCollection && (
              <>
                <div className="menu-panel__mobile-top"><button onClick={() => setOpenCollection(null)}>← Kolekcje</button></div>
                <div className="menu-products-heading">
                  <Link href={`/kolekcje/${activeCollection.slug}`} onClick={closeMenu}>{activeCollection.name} <span className="diagonal-arrow" aria-hidden="true" /></Link>
                </div>
                <nav className="menu-list menu-list--products" aria-label={`Modele ${activeCollection.name}`}>
                  {activeCollection.products.map((product) => (
                    <Link href={`/kolekcje/${activeCollection.slug}/${product.slug}`} onClick={closeMenu} key={product.slug}>
                      {product.name}
                    </Link>
                  ))}
                </nav>
                <div className="menu-panel__footer"><Link href="/kontakt" className="menu-panel__contact" onClick={closeMenu}>
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="1" y="2.2" width="10" height="7.6" rx="1" stroke="currentColor" strokeWidth="1" /><path d="M1.3 3 6 6.4 10.7 3" stroke="currentColor" strokeWidth="1" /></svg>
                Kontakt
              </Link><span>{String(activeCollection.products.length).padStart(2, "0")} modeli</span></div>
              </>
            )}
          </aside>
        )}
      </div>
    </>
  );
}
