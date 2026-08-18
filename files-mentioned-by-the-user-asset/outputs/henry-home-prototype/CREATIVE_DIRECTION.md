# HENRY Home Prototype — Creative Direction & Design System

## Source review

This direction is based only on the supplied HENRY logo files, layout cues, three editorial/architecture references, the palette/type PDF, sixteen product/interior/material visualizations, and the 17.13-second cinematic film. No replacement brand imagery or stock photography is introduced.

The references consistently privilege asymmetry, unusually large negative space, mixed image scales, thin rules, restrained navigation, editorial typography, and full-bleed architectural crops. The supplied HENRY imagery is darker, warmer, and more cinematic than the references, so the final language combines their disciplined editorial grids with HENRY's walnut, leather, black, and amber-light material world.

## Overall art direction

The homepage is a private-showroom journey, not a storefront. It begins in near darkness, moves physically through the supplied cinema film, then opens into alternating editorial spreads. Collections are presented as atmospheres; personalization as material authorship; bespoke work as architectural collaboration; philosophy as a quiet closing essay.

Luxury is communicated through scale, silence, material detail, and controlled motion. Avoid cards, commerce patterns, ornamental gradients, stock imagery, inflated claims, and invented product names beyond the supplied collection labels.

## Typography

- Primary family: **Montserrat**, as specified in the supplied brand reference.
- Display treatment: Montserrat Light/Regular, uppercase where architectural authority is useful; tighter line-height and slightly negative tracking at large sizes.
- Editorial counterpoint: Montserrat Light italic only for short, poetic phrases; do not introduce an unrelated serif.
- Hero mark: use the supplied HENRY image logo rather than recreating it typographically.
- Desktop display scale: `clamp(4.5rem, 10vw, 10rem)`.
- Section headlines: `clamp(3rem, 7vw, 7.5rem)`.
- Body: 15–18px, 1.55–1.7 line-height, line lengths capped near 58 characters.
- Utility labels: 11–12px uppercase with 0.14–0.2em tracking.

## Color system

Colors follow the supplied PDF:

- Near-black background: `#171615`.
- Section black: `#1A1A1A`.
- Footer black: `#171512`.
- Primary text: `#FFFFFF`.
- Secondary text: `#ADADAD`.
- Gold accent: `#D9A341`.
- Warm gold text: `#C59159`.
- Muted footer text: `#5E564F`.
Gold is a precision accent for rules, progress, and small labels—not a decorative wash. The HOME prototype now stays entirely within the requested `#171615` / `#1A1A1A` dark field.

## Grid and spacing

- Desktop: 12-column grid with 32px gutters and 48–72px outer margins.
- Tablet: 8 columns, 24px gutters, 28–36px outer margins.
- Mobile: 4 columns, 16px gutters, 18–22px outer margins.
- Section vertical spacing: 14–22vh on desktop, 96–144px on mobile.
- Major compositions should intentionally leave 25–45% of the viewport empty.
- Use thin 1px rules to mark transitions, echoing the reference sites.

## Image system

- Cinematic hero: full viewport, 16:9 source cropped with `object-fit: cover`; protect center-door and final-logo framing.
- Collection worlds: wide 3:2 and 16:10 crops with occasional portrait counter-images.
- Product studies: 4:3 or 3:2, never boxed as ecommerce cards.
- Material/detail studies: 1:1 and tall 4:5 crops for intimate tactility.
- Bespoke project imagery: large 16:10 architectural panels with smaller offset fragments.
- All non-critical imagery loads lazily; dark neutral placeholders prevent flashes.

## Hero behavior

The 17.13-second supplied film maps to a tall sticky scroll stage. Scroll progress moves video time in both directions: corridor → doors → theater → seating → HENRY brand frame. The final frame rests briefly before the section releases.

- Desktop scroll length: approximately 500vh.
- Mobile/tablet scroll length: approximately 400vh with lighter smoothing.
- A minimal progress rail and short instruction make the interaction legible without competing with the film.
- Five short editorial statements punctuate the journey without covering the architecture.
- The final film frame scales down, rotates and recedes before releasing into the brand story.
- Navigation is transparent/white over the film, then becomes a dark solid bar after the hero.
- Reduced-motion mode shows the film's opening frame with normal controls available and removes scroll scrubbing/parallax.

## Navigation

- Left: burger plus “Menu”.
- Center: supplied HENRY logo.
- Right: language selector.
- The menu opens as a full-screen near-black editorial overlay with large collection and service links.
- Keyboard focus is trapped within the overlay; Escape closes it; all controls have explicit labels.
- Navigation becomes smaller and more opaque beyond the cinematic entrance.

## Animation language

- Pace: slow, weighted, and architectural; 700–1200ms for major transitions.
- Easing: restrained cubic curves such as `cubic-bezier(.22, 1, .36, 1)`.
- Core effects: opacity, transform, clip-path only where stable, small scale shifts, and opposing text/image parallax.
- No bounce, elastic motion, particle effects, excessive cursor effects, or continuous decorative animation.
- Scroll reveals begin subtly (20–48px offset) and never obscure essential content.
- `prefers-reduced-motion` removes scrubbing, parallax, and reveal travel.

## Section rhythm

1. **Cinematic entrance** — pinned, scroll-controlled video and minimal chrome.
2. **Brand story** — centered logo and long-form copy whose words move from grey to white as the visitor scrolls.
3. **Istota HENRY** — oversized statement, one immersive cinema interior, and a compact proof-point rail.
4. **Kolekcje** — horizontal-feeling sequence of Atelier, Studio, Lounge; every world links to its future collection route.
5. **Projekty indywidualne** — architectural portfolio composition whose images unfold outward from the center.
6. **Filozofia HENRY** — sparse magazine-like essay with one quiet product portrait and a dedicated route CTA.
7. **Kontakt** — oversized HENRY invitation followed by the complete structured footer supplied in the latest reference.

## Content and accessibility principles

- Polish is the default language, matching the supplied copy; the selector may expose an English label without inventing a full translation system in this prototype.
- Semantic landmarks, headings in order, descriptive image alt text, visible keyboard focus, sufficient contrast, and touch targets at least 44px.
- No autoplay audio; the source video remains muted and inline.
- The homepage remains comprehensible if JavaScript or motion is unavailable.
