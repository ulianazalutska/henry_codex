import type { Metadata } from "next";
import { BespokeExperience } from "./bespoke-experience";

export const metadata: Metadata = {
  title: "Projekty indywidualne — HENRY",
  description: "Indywidualne projekty i realizacje HENRY: fotele tworzone od podstaw, tematyczne fotele kinowe, systemy siedzisk dla Twojej przestrzeni, technologia i ekskluzywne materiały.",
  openGraph: {
    title: "Projekty indywidualne — HENRY",
    description: "Twoja wizja. Nasze doświadczenie. Wspólny projekt.",
    images: ["/media/projekty-indywidualne/s3/classic-czerwien.webp"],
  },
  twitter: {
    title: "Projekty indywidualne — HENRY",
    description: "Twoja wizja. Nasze doświadczenie. Wspólny projekt.",
    images: ["/media/projekty-indywidualne/s3/classic-czerwien.webp"],
  },
};

export default function ProjektyIndywidualnePage() {
  return <BespokeExperience />;
}
