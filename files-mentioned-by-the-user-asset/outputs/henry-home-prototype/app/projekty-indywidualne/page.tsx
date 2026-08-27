import type { Metadata } from "next";
import { BespokeExperience } from "./bespoke-experience";

export const metadata: Metadata = {
  title: "Projekty indywidualne — HENRY",
  description: "Fotele i meble na indywidualne zamówienie: własny kształt, tkanina, wymiar i pikowanie, poza granicami bieżącej kolekcji HENRY.",
  openGraph: {
    title: "Projekty indywidualne — HENRY",
    description: "Twój pomysł. Nasze rzemiosło.",
    images: ["/media/projekty-indywidualne/realizacja-shelf-cinema.jpg"],
  },
  twitter: {
    title: "Projekty indywidualne — HENRY",
    description: "Twój pomysł. Nasze rzemiosło.",
    images: ["/media/projekty-indywidualne/realizacja-shelf-cinema.jpg"],
  },
};

export default function ProjektyIndywidualnePage() {
  return <BespokeExperience />;
}
