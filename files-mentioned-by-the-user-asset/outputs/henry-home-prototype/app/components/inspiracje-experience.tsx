"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HenryCollection } from "../collections-data";

export function InspiracjeExperience({ collection }: { collection: HenryCollection }) {
  const images = collection.inspirationImages ?? [];
  const collectionHref = `/kolekcje/${collection.slug}`;
  const [backHref, setBackHref] = useState(collectionHref);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from && (from.startsWith(`/kolekcje/${collection.slug}/`) || from.startsWith("/#"))) {
      setBackHref(from);
    }
  }, [collection.slug]);

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
              <img src={src} alt={`${collection.name} — aranżacja ${index + 1}`} loading="lazy" />
            </figure>
          ))}
        </div>
      ) : (
        <div className="inspiracje-empty">
          <p>Zdjęcia aranżacji kolekcji {collection.name} są w przygotowaniu.</p>
        </div>
      )}
    </main>
  );
}
