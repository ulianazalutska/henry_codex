import type { Metadata } from "next";
import { PersonalizationExperience } from "./personalization-experience";

export const metadata: Metadata = {
  title: "Personalizacja — HENRY",
  description: "Indywidualny haft, wykończenia i technologiczne wyposażenie foteli HENRY tworzone na zamówienie.",
  openGraph: {
    title: "Personalizacja — HENRY",
    description: "Fotel zaprojektowany wokół Ciebie.",
    images: ["/media/personalizacja/hero.png"],
  },
  twitter: {
    title: "Personalizacja — HENRY",
    description: "Fotel zaprojektowany wokół Ciebie.",
    images: ["/media/personalizacja/hero.png"],
  },
};

export default function PersonalizationPage() {
  return <PersonalizationExperience />;
}
