"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlaying(true);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={`reveal-text ${playing ? "is-playing" : ""} ${className || ""}`}>
      {text.split(" ").map((word, index) => (
        <span
          className="reveal-text__word"
          key={`${word}-${index}`}
          style={{ "--word-delay": `${index * 0.07}s` } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
