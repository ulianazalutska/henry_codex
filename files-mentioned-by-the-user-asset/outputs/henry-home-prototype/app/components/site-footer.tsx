export function SiteFooter({ showInvitation = false }: { showInvitation?: boolean }) {
  return (
    <footer id="kontakt" className={`contact ${showInvitation ? "" : "contact--compact"}`}>
      {showInvitation && (
        <>
          <div className="contact__top"><img src="/media/henry-logo-white.png" alt="" /><p>Private cinema seating<br />designed for the moment.</p></div>
          <div className="contact__invitation" data-reveal>
            <span>Wejdź do świata</span><h2>HENRY</h2>
            <a href="mailto:info@henryseating.com">info@henryseating.com <span className="diagonal-arrow" aria-hidden="true" /></a>
          </div>
        </>
      )}

      <div className="footer-directory">
        <div className="footer-directory__brand">
          <img src="/media/henry-logo-gold.png" alt="HENRY" />
          <p>Premium Cinema Seating<br />Made in Poland</p>
        </div>
        <div><h3>Kolekcje</h3><a href="/kolekcje/atelier">Atelier</a><a href="/kolekcje/lounge">Lounge</a><a href="/kolekcje/studio">Studio</a></div>
        <div><h3>Dla klienta</h3><a href="/filozofia-henry">O nas</a><a href="/faq">FAQ</a><a href="/blog">Blog</a><a href="/kontakt">Kontakt</a></div>
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
