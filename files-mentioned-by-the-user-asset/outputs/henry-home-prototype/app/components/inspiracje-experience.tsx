"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import type { HenryCollection } from "../collections-data";
import { ImageLightbox } from "./image-lightbox";

const subscribeNoop = () => () => {};

export function InspiracjeExperience({ collection }: { collection: HenryCollection }) {
  const images = collection.inspirationImages ?? [];
  const collectionHref = `/kolekcje/${collection.slug}`;
  const from = useSyncExternalStore(
    subscribeNoop,
    () => new URLSearchParams(window.location.search).get("from") ?? "",
    () => ""
  );
  const backHref =
    from && (from.startsWith(`/kolekcje/${collection.slug}/`) || from.startsWith("/#")) ? from : collectionHref;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-inspiracje-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        // Stagger by the order items intersect together (same scroll moment), not by their
        // DOM index — the gallery is a CSS multi-column (fills top-to-bottom per column, not
        // row by row), so index-based delays don't match which items actually appear together.
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, batchIndex) => {
            const target = entry.target as HTMLElement;
            target.style.transitionDelay = `${(batchIndex % 3) * 90}ms`;
            target.classList.add("is-visible");
            observer.unobserve(target);
          });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6%" }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <main className="inspiracje-page">
      <Link href={backHref} className="inspiracje-back">
        <span className="inspiracje-back__arrow" aria-hidden="true" />
        Wróć
      </Link>

      <header className="inspiracje-header">
        <p className="inspiracje-header__overline">Inspiracje</p>
        <h1>{collection.name}</h1>
      </header>

      {images.length > 0 ? (
        <div className="inspiracje-gallery">
          {images.map((src, index) => (
            <figure
              className="inspiracje-gallery__item"
              data-inspiracje-reveal
              key={`${src}-${index}`}
            >
              <button
                type="button"
                className="inspiracje-gallery__open"
                aria-label={`Powiększ zdjęcie ${index + 1}`}
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
              >
                <img src={src} alt={`${collection.title} — aranżacja ${index + 1}`} loading="lazy" draggable={false} />
              </button>
            </figure>
          ))}
        </div>
      ) : (
        <div className="inspiracje-empty">
          <p>Zdjęcia aranżacji kolekcji {collection.name} są w przygotowaniu.</p>
        </div>
      )}

      {activeIndex !== null && (
        <ImageLightbox
          images={images.map((src, index) => ({ src, alt: `${collection.title} — aranżacja ${index + 1}` }))}
          index={activeIndex}
          onClose={closeLightbox}
          onIndexChange={setActiveIndex}
        />
      )}
    </main>
  );
}
