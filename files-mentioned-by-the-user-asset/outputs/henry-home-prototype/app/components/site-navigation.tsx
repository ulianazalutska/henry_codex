"use client";

import { useEffect, useRef, useState } from "react";
import { collections } from "../collections-data";

export function SiteNavigation({ solid = true }: { solid?: boolean }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [openCollection, setOpenCollection] = useState<string | null>(null);
  const activeCollection = collections.find((collection) => collection.slug === openCollection);

  const openMenu = () => {
    setCollectionsOpen(false);
    setOpenCollection(null);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setCollectionsOpen(false);
    setOpenCollection(null);
  };

  const toggleCollections = () => {
    if (collectionsOpen) {
      setCollectionsOpen(false);
      setOpenCollection(null);
      return;
    }
    setCollectionsOpen(true);
  };

  const toggleCollection = (slug: string) => {
    setOpenCollection((current) => current === slug ? null : slug);
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
        else closeMenu();
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
      <header className={`site-nav ${solid ? "site-nav--solid" : ""}`}>
        <button className="menu-trigger" onClick={openMenu} aria-label="Otwórz menu">
          <span className="menu-lines" aria-hidden="true"><i /><i /><i /></span>
          <span>Menu</span>
        </button>
        <a className="nav-mark" href="/" aria-label="HENRY — strona główna"><img src="/media/henry-logo-gold.png" alt="" /></a>
        <label className="language" aria-label="Wybierz język">
          <select defaultValue="pl"><option value="pl">PL</option><option value="en" disabled>EN</option></select>
          <img src="/media/vector-chevron.svg" alt="" aria-hidden="true" />
        </label>
      </header>

      <button className={`menu-backdrop ${menuOpen ? "is-open" : ""}`} onClick={closeMenu} tabIndex={menuOpen ? 0 : -1} aria-label="Zamknij menu" />
      <div ref={stackRef} className={`menu-stack ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen} role="dialog" aria-modal="true" aria-label="Menu główne">
        <aside className="menu-column menu-column--primary" data-active={menuOpen}>
          <div className="menu-panel__top"><button onClick={closeMenu}>Zamknij</button></div>
          <nav className="menu-list" aria-label="Menu główne">
            <button className={`menu-list__item menu-list__item--toggle ${collectionsOpen ? "is-active" : ""}`} onClick={toggleCollections} aria-expanded={collectionsOpen}>
              <span>Kolekcje</span><img src="/media/vector-chevron.svg" alt="" />
            </button>
            <a href="/personalizacja" onClick={closeMenu}>Personalizacja</a>
            <a href="/projekty-indywidualne" onClick={closeMenu}>Projekty indywidualne</a>
            <a href="/filozofia-henry" onClick={closeMenu}>Filozofia Henry</a>
            <a href="/dla-architektow" onClick={closeMenu}>Dla architektów</a>
            <a href="/kontakt" onClick={closeMenu}>Kontakt</a>
          </nav>
          <div className="menu-panel__footer"><span>Warszawa / Polska</span><span>Private cinema seating</span></div>
        </aside>

        <aside className={`menu-column menu-column--collections ${collectionsOpen ? "is-open" : ""}`} data-active={menuOpen && collectionsOpen} aria-hidden={!collectionsOpen}>
          <div className="menu-panel__mobile-top"><button onClick={toggleCollections}>← Menu</button></div>
          <nav className="menu-list menu-list--sub" aria-label="Kolekcje">
            {collections.map((collection) => (
              <button className={`menu-list__item menu-list__item--toggle ${openCollection === collection.slug ? "is-active" : ""}`} onClick={() => toggleCollection(collection.slug)} aria-expanded={openCollection === collection.slug} key={collection.slug}>
                <span>{collection.name}</span><img src="/media/vector-chevron.svg" alt="" />
              </button>
            ))}
          </nav>
          <div className="menu-panel__footer"><span>Warszawa / Polska</span><span>02 / Kolekcje</span></div>
        </aside>

        <aside className={`menu-column menu-column--products ${openCollection ? "is-open" : ""}`} data-active={menuOpen && Boolean(openCollection)} aria-hidden={!openCollection}>
          {activeCollection && (
            <>
              <div className="menu-panel__mobile-top"><button onClick={() => setOpenCollection(null)}>← Kolekcje</button></div>
              <div className="menu-products-heading">
                <p>{activeCollection.index} / Kolekcja</p>
                <a href={`/kolekcje/${activeCollection.slug}`} onClick={closeMenu}>{activeCollection.name} <span className="diagonal-arrow" aria-hidden="true" /></a>
              </div>
              <nav className="menu-list menu-list--products" aria-label={`Modele ${activeCollection.name}`}>
                {activeCollection.products.map((product, index) => (
                  <a href={`/kolekcje/${activeCollection.slug}/${product.slug}`} onClick={closeMenu} key={product.slug}>
                    <span>{String(index + 1).padStart(2, "0")}</span>{product.name}
                  </a>
                ))}
              </nav>
              <div className="menu-panel__footer"><span>Warszawa / Polska</span><span>{String(activeCollection.products.length).padStart(2, "0")} modeli</span></div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
