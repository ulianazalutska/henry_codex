import type { Metadata } from "next";
import { FaqExperience } from "./faq-experience";

export const metadata: Metadata = {
  title: "FAQ | HENRY",
  description: "Odpowiedzi na najczęściej zadawane pytania o fotele HENRY: zamówienia, materiały, personalizację i dostawę.",
};

export default function FaqPage() {
  return <FaqExperience />;
}
