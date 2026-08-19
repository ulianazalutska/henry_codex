"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteNavigation } from "../components/site-navigation";
import styles from "./contact.module.css";

const socialLinks = [
  { label: "Instagram", icon: "/media/instagram.svg" },
  { label: "Facebook", icon: "/media/facebook.svg" },
  { label: "YouTube", icon: "/media/youtube.svg" },
];

export function ContactExperience() {
  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-contact-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(styles.isVisible);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Zapytanie ze strony HENRY — ${data.get("topic")}`;
    const body = [
      `Imię i nazwisko: ${data.get("name")}`,
      `E-mail: ${data.get("email")}`,
      `Telefon: ${data.get("phone") || "—"}`,
      "",
      String(data.get("message")),
    ].join("\n");

    setFormOpened(true);
    window.location.href = `mailto:info@henryseating.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main id="top" className={styles.contactPage}>
      <SiteNavigation />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>HENRY / Kontakt</p>
        <h1>Porozmawiajmy<span>o przestrzeni.</span></h1>
        <div className={styles.heroIntro}>
          <p>Każdy wyjątkowy projekt zaczyna się od rozmowy.</p>
          <span>Opowiedz nam o swoim wnętrzu, jego rytmie i o tym, jak chcesz się w nim czuć.</span>
        </div>
        <i className={styles.heroLine} aria-hidden="true" />
      </header>

      <section className={styles.directory} aria-labelledby="contact-directory-title">
        <div className={styles.sectionLead} data-contact-reveal>
          <p>Bezpośredni kontakt</p>
          <h2 id="contact-directory-title">Jesteśmy<br /><em>blisko.</em></h2>
        </div>

        <div className={styles.directoryGrid}>
          <article data-contact-reveal>
            <span>01 / Adres</span>
            <h3>HENRY Seating</h3>
            <address>Otowice 41<br />86-070 Dąbrowa Chełmińska<br />Polska</address>
            <a href="https://maps.google.com/?q=Otowice+41%2C+86-070+D%C4%85browa+Che%C5%82mi%C5%84ska" target="_blank" rel="noreferrer">Wyznacz trasę <i aria-hidden="true">↗</i></a>
          </article>
          <article data-contact-reveal>
            <span>02 / Telefon</span>
            <h3>Centrala</h3>
            <a className={styles.contactValue} href="tel:+48503335335">+48 503 335 335</a>
            <div className={styles.pending}><small>Przedstawiciel handlowy — Bartosz Wojciechowski</small><a href="tel:+48604783396">+48 604 783 396</a></div>
          </article>
          <article data-contact-reveal>
            <span>03 / E-mail</span>
            <h3>Zapytania ogólne</h3>
            <a className={styles.contactValue} href="mailto:info@henryseating.com">info@henryseating.com</a>
            <div className={styles.pending}><small>Sprzedaż i projekty</small><a href="mailto:bartosz@henryseating.com">bartosz@henryseating.com</a></div>
          </article>
        </div>
      </section>

      <section className={styles.gallery} aria-label="Przestrzenie HENRY">
        <figure className={styles.galleryPrimary} data-contact-reveal>
          <div><img src="/media/henry-entrance-poster.jpg" alt="Eleganckie wejście do przestrzeni HENRY" /></div>
          <figcaption><span>Przestrzeń HENRY</span><span>Otowice / Polska</span></figcaption>
        </figure>
        <figure className={styles.gallerySecondary} data-contact-reveal>
          <div><img src="/media/studio-cinema-bespoke.webp" alt="Showroom prywatnej sali kinowej HENRY" /></div>
          <figcaption><span>Private showroom</span><span>By appointment</span></figcaption>
        </figure>
      </section>

      <section className={styles.formSection} aria-labelledby="contact-form-title">
        <div className={styles.formHeading} data-contact-reveal>
          <p>Opowiedz nam o swoim projekcie</p>
          <h2 id="contact-form-title">Zacznijmy<br /><em>rozmowę.</em></h2>
          <span>Odpowiemy i pomożemy wybrać najlepszy kierunek — od pojedynczego fotela po kompletną prywatną salę kinową.</span>
        </div>

        <form className={styles.form} onSubmit={sendMessage} data-contact-reveal>
          <label>
            <span>Imię i nazwisko *</span>
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            <span>Adres e-mail *</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            <span>Telefon</span>
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            <span>Temat rozmowy *</span>
            <select name="topic" defaultValue="Projekt prywatnej sali kinowej" required>
              <option>Projekt prywatnej sali kinowej</option>
              <option>Wybór fotela lub kolekcji</option>
              <option>Projekt indywidualny</option>
              <option>Współpraca dla architektów</option>
              <option>Inne zapytanie</option>
            </select>
          </label>
          <label className={styles.messageField}>
            <span>Wiadomość *</span>
            <textarea name="message" rows={5} required />
          </label>
          <label className={styles.consent}>
            <input name="consent" type="checkbox" required />
            <span>Wyrażam zgodę na kontakt w sprawie przesłanego zapytania i akceptuję politykę prywatności.</span>
          </label>
          <button type="submit"><span>Wyślij wiadomość</span><i aria-hidden="true">↗</i></button>
          {formOpened && <p className={styles.formNote} role="status">Wiadomość została przygotowana w Twoim programie pocztowym.</p>}
        </form>
      </section>

      <section className={styles.social} data-contact-reveal>
        <p>Pozostańmy w kontakcie</p>
        <h2>Obserwuj<br /><em>HENRY.</em></h2>
        <div>
          {socialLinks.map((social) => (
            <a href="#" key={social.label}>
              <img src={social.icon} alt="" />
              <span>{social.label}</span>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
