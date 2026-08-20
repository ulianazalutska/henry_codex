import type { Metadata } from "next";
import { PhilosophyExperience } from "./philosophy-experience";

export const metadata: Metadata = {
  title: "Filozofia HENRY | Rzemiosło, design i komfort",
  description: "Poznaj historię HENRY, filozofię polskiej produkcji oraz sposób, w jaki łączymy rzemiosło, technologię i komfort.",
};

export default function PhilosophyPage() {
  return <PhilosophyExperience />;
}
