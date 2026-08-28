import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="kontakt" className="contact contact--compact">
      <div className="footer-directory">
        <div className="footer-directory__brand">
          <img src="/media/henry-logo-gold.png" alt="HENRY" />
          <p>Premium Cinema Seating<br />Made in Poland</p>
        </div>
        <div><h3>Kolekcje</h3><Link href="/kolekcje/atelier">Atelier</Link><Link href="/kolekcje/lounge">Lounge</Link><Link href="/kolekcje/studio">Studio</Link></div>
        <div><h3>Dla klienta</h3><Link href="/filozofia-henry">O nas</Link><Link href="/faq">FAQ</Link><Link href="/blog">Blog</Link><Link href="/kontakt">Kontakt</Link></div>
        <div><h3>Kontakt</h3><a href="tel:+48604783396">+48 604 783 396</a><a href="mailto:info@henryseating.com">info@henryseating.com</a><p>Otowice 41<br />86-070 Dąbrowa Chełmińska<br />Polska</p></div>
        <div className="footer-directory__social">
          <h3>Obserwuj nas</h3>
          <div>
            <a href="#" aria-label="Instagram"><img src="/media/instagram.svg" alt="" /></a>
            <a href="#" aria-label="Facebook"><img src="/media/facebook.svg" alt="" /></a>
            <a href="#" aria-label="YouTube"><img src="/media/youtube.svg" alt="" /></a>
          </div>
        </div>
      </div>
      <div className="contact__bottom"><span>© 2026 HENRY Seating</span><span>Polityka prywatności · Regulamin</span><a href="#top">Powrót na górę ↑</a></div>
    </footer>
  );
}
