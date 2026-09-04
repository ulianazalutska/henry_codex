# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This working directory is **not** itself a single app — it's a workspace containing raw design assets plus one real codebase:

- `files-mentioned-by-the-user-asset/outputs/henry-home-prototype/` — the actual Next.js/vinext site. **All commands below run from this directory, not the repo root.**
- `asset/` — raw source material (product photos, PDFs, videos, reference screenshots) organized by collection/section (Kolekcja Atelier, Kolekcja Studio, Kolekcja Lounge, Personalizacja, Kontakt, Filozofia Henry, Projekty Indywidualne, reference, Materials, etc.). These are inputs, not code — never reference them directly from app code.
- `files-mentioned-by-the-user-asset/work/` — scratch tooling and versioned tarball snapshots of the site (`henry-site-v*.tar.gz`), video-frame extraction scripts, contact sheets. Not part of the live app.
- `https-chatgpt-com-share-*/` — unrelated ChatGPT export, not part of this project.

The rest of this document describes `henry-home-prototype`.

## Project

A dark, cinematic multi-page showroom website for HENRY, a Polish premium armchair brand — not an e-commerce store. Built on `vinext` (Cloudflare's React Server Components framework) with an App Router-style structure under `app/`.

Site content is in **Polish**; communicate with the user in Ukrainian (see `AGENTS.md`, which is the canonical source for working conventions in this project — read it in full before making changes).

## Commands

Run from `files-mentioned-by-the-user-asset/outputs/henry-home-prototype/`:

```bash
npm install
npm run dev      # local dev server at http://localhost:3000
npm run lint     # eslint . (ignores dist, .next)
npm run build    # vinext build — required before npm test
npm test         # npm run build + node --test tests/rendered-html.test.mjs
npm run db:generate  # drizzle-kit generate, only after schema.ts changes
```

- If `dev` reports "Missing script", the command wasn't run from the app folder.
- If vinext reports another dev server is already running, don't start a second one — check the PID/directory and reuse `http://localhost:3000`, or stop only that confirmed process.
- There is no single-test-file runner beyond `node --test tests/rendered-html.test.mjs`; the test suite is small and requires a build first.

## Critical working rules (from `AGENTS.md`)

- Read `PROJECT_HANDOFF.md` (current route/feature status, known issues, backlog) and the relevant parts of `CREATIVE_DIRECTION.md` before changing anything.
- Check `git status --short` first. The working tree often has the user's own in-progress staged/untracked changes (asset uploads, WIP edits) — never discard, reset, or overwrite them.
- Never invent facts about HENRY (products, specs, contact info, company history). Leave an explicit placeholder or ask for material instead.
- Don't add production dependencies if the task is achievable with existing React/CSS/browser APIs — justify any new dependency first.
- Don't commit, push, or deploy unless explicitly asked. Never touch `.openai/hosting.json` or run a deploy without a direct request. Never use destructive git commands on the user's own changes.
- Copy any asset actually used by the site into `public/media/<section>/` with a clear name — never reference `asset/`, `Downloads`, or `Documents` paths from app code.
- After behavior/style changes, manually check the affected route in a browser at desktop and mobile widths — especially the burger menu, scroll behavior, carousels, accordions, footer, and console errors.
- After finishing a page or major status change, update `PROJECT_HANDOFF.md` (route, readiness, assets used, known limitations, next step). Keep `AGENTS.md` itself short and stable; put transient state in `PROJECT_HANDOFF.md`.

## Architecture

- **Routes**: `app/page.tsx` (home), `app/kolekcje/page.tsx` (collections index), `app/kolekcje/[collection]/page.tsx` (collection template — Atelier/Studio/Lounge), `app/kolekcje/[collection]/[product]/page.tsx` (product template, dynamic for all 14 models), `app/kontakt/`, `app/personalizacja/`, `app/filozofia-henry/`, `app/faq/`.
- **Shared chrome**: every finished page must use `app/components/site-navigation.tsx` (three-panel sliding burger: sections → Atelier/Studio/Lounge → models of the active collection) and `app/components/site-footer.tsx` (same social SVG icons everywhere), unless the user explicitly asks for an exception.
- **Product experience**: `app/components/product-experience.tsx` drives the shared product-page behavior (infinite drag/swipe carousel showing neighbor edges, specs/dimensions/materials blocks, an initially-collapsed technical accordion). Only `/kolekcje/studio/nova-solo` is fully populated with real content today; the other 13 product routes render the same structure with placeholder content — check `PROJECT_HANDOFF.md` for current status before assuming a page is done.
- **Content data**: `app/collections-data.ts` is the single source of truth for collections/models, and drives both the product routes and `app/sitemap.ts`.
- **Styling**: `app/globals.css` holds the shared design system; `app/kontakt/`, `app/personalizacja/`, and `app/filozofia-henry/` additionally use CSS Modules scoped to those pages.
- **Site config**: `app/site-config.ts` sets the production URL (`https://henryseating.com`, overridable via `NEXT_PUBLIC_SITE_URL`).
- **Auth**: `app/chatgpt-auth.ts` provides optional/required "Sign in with ChatGPT" helpers for Sites hosting (`getChatGPTUser`, `requireChatGPTUser`, `chatGPTSignInPath`/`chatGPTSignOutPath`). Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback` — don't implement routes at those paths. Not currently used for any live page; public content should stay anonymous.
- **Cloudflare worker**: `worker/index.ts` is the deployed entry point — handles `/_vinext/image` image optimization, then delegates everything else to vinext's app-router entry. `vite.config.ts` wires up the Cloudflare plugin and simulates D1/R2 bindings declared in `.openai/hosting.json` for local dev (`db/schema.ts` currently empty; `examples/d1/` shows optional D1 usage).
- **Tests**: `tests/rendered-html.test.mjs` runs against the built worker output (`dist/server/index.js`) and currently asserts the starter's default loading-skeleton HTML/CSS — it has not yet been updated to assert on real HENRY page content.

## Design system

- Background `#171615`; section black `#1A1A1A`; footer black `#171512`; text white/`#ADADAD` secondary; gold accent `#D9A341` (warm gold `#C59159`), used sparingly for rules/labels, never as a decorative wash.
- Font: Montserrat only — no serif substitutions.
- Tone: premium private showroom, dark cinematic catalogue, asymmetric editorial grids, generous controlled negative space. Avoid ecommerce cards, heavy borders, decorative gradients, neon.
- Motion: slow and architectural (700–1200ms, `cubic-bezier(.22, 1, .36, 1)`), opacity/transform/clip-path only, no bounce; always respect `prefers-reduced-motion`, keyboard focus, semantic HTML, alt text, and mobile layout.
- Carousels: infinite loop, drag/swipe, arrow controls, no native image drag-ghost, and must not hijack normal vertical page scroll.

Full detail lives in `CREATIVE_DIRECTION.md`; where it conflicts with a later decision recorded in `PROJECT_HANDOFF.md` or a direct user instruction, the newer decision wins.
