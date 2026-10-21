"use client";

import { useCallback, useEffect, useRef } from "react";

export type LightboxImage = { src: string; alt: string };

export function ImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const step = useCallback(
    (direction: 1 | -1) => onIndexChange((index + direction + count) % count),
    [index, count, onIndexChange]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, step]);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  const image = images[index];
  if (!image) return null;

  return (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Zdjęcie ${index + 1} z ${count}`}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) > 50) step(delta < 0 ? 1 : -1);
      }}
    >
      <button type="button" className="image-lightbox__backdrop" aria-label="Zamknij" tabIndex={-1} onClick={onClose} />
      <button ref={closeButtonRef} type="button" className="image-lightbox__close" aria-label="Zamknij" onClick={onClose} />
      {count > 1 && (
        <>
          <button
            type="button"
            className="image-lightbox__nav image-lightbox__nav--prev"
            aria-label="Poprzednie zdjęcie"
            onClick={() => step(-1)}
          />
          <button
            type="button"
            className="image-lightbox__nav image-lightbox__nav--next"
            aria-label="Następne zdjęcie"
            onClick={() => step(1)}
          />
        </>
      )}
      <img key={index} className="image-lightbox__img" src={image.src} alt={image.alt} draggable={false} />
      <p className="image-lightbox__count">
        {index + 1} / {count}
      </p>
    </div>
  );
}
