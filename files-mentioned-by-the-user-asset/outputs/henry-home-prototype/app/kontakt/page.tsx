import type { Metadata } from "next";
import { ContactExperience } from "./contact-experience";

export const metadata: Metadata = {
  title: "Kontakt — HENRY",
  description: "Skontaktuj się z HENRY w sprawie foteli premium, prywatnej sali kinowej lub indywidualnego projektu.",
  openGraph: {
    title: "Kontakt — HENRY",
    description: "Każdy wyjątkowy projekt zaczyna się od rozmowy.",
    images: ["/media/henry-entrance-poster.jpg"],
  },
  twitter: {
    title: "Kontakt — HENRY",
    description: "Każdy wyjątkowy projekt zaczyna się od rozmowy.",
    images: ["/media/henry-entrance-poster.jpg"],
  },
};

export default function ContactPage() {
  return <ContactExperience />;
}
