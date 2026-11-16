# ایرفلو سیستم — Airflow System

Unternehmenswebsite für **ایرفلو سیستم** (Airflow System), einen iranischen Hersteller von HVAC-Komponenten (Lüftungsgitter, Dämper, Luftverteilungssysteme) mit über 18 Jahren Erfahrung.

Die Website richtet sich an den iranischen B2B-Markt und ist **Persisch-first** (RTL). Eine englische Fassung lässt sich per Sprachumschalter einblenden, damit Kunden aus dem Ausland Inhalte lesen und Kontakt aufnehmen können.

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16.2.9 | Framework (App Router, Turbopack) |
| React | 19 | UI |
| TypeScript | 5 | Typsicherheit (strict mode) |
| CSS Modules | — | Komponentenstyling mit Design-Tokens |
| Framer Motion | 12 | Animationen (respektiert `prefers-reduced-motion`) |
| Swiper.js | 12 | Slider/Karussell |
| React Hook Form + Zod | 7 / 4 | Kontaktformular + Validierung (Schema geteilt mit der API) |
| Resend | 6 | E-Mail-Versand des Kontaktformulars |
| Vazirmatn (next/font) | — | Persische Schriftart |

---

## Projektstruktur

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Homepage
│   ├── about/                # Über uns
│   ├── products/             # Produktliste (Filter via ?category=) + Detailseite ([slug])
│   ├── projects/             # Referenzprojekte + Detailseite ([slug])
│   ├── resources/            # Downloads / Ressourcen
│   ├── design-system/        # Komponenten-Showcase (noindex, in robots.txt gesperrt)
│   ├── api/contact/          # Kontaktformular-Endpoint (Versand via Resend)
│   ├── not-found.tsx         # 404-Seite (FA/EN)
│   ├── error.tsx             # Fehlerseite (FA/EN)
│   ├── sitemap.ts            # /sitemap.xml inkl. aller Produkt- und Projektseiten
│   └── robots.ts             # /robots.txt
├── components/
│   ├── home/                 # Sektionen der Homepage (Hero, Partners, Products, WhyUs,
│   │                         #   Projects, Statistics, Resources, ContactForm)
│   ├── layout/               # Header, Footer, TopBar, Navigation, NavItemDesktop/Mobile,
│   │                         #   HeaderActions, LanguageSwitch, ThemeToggle, Logo, MotionPreferences
│   ├── about/                # AboutIntro, AboutValues
│   ├── products/             # ProductsPageClient, ProductDetailClient, ProductSearchBar
│   ├── projects/             # ProjectsPageClient, ProjectDetailClient
│   └── shared/               # Wiederverwendbare UI-Elemente, u. a.:
│       ├── Button/           # Button/Link; Varianten primary/secondary/outline/ghost/danger/accent,
│       │                     #   `download` für Datei-Links
│       ├── ProductCard/      # Produktkarte, Varianten `compact` (Karussell) / `detailed` (Grid)
│       ├── Accordion/        # Varianten `divided` / `cards` (z. B. Produkt-FAQ)
│       ├── Field/, FormField/# Label + Fehlermeldung / Input, Textarea, Select
│       ├── Tabs/, FilterTabs/, Modal/, Table/, Card/, Badge/, Breadcrumb/
│       ├── PageBanner/, SectionTitle/, Container/, StatusPage/
│       ├── SearchTrigger/, SearchOverlay/   # Produktsuche im Header
│       └── ContactDetail/, WhatsAppButton/, ScrollToTop/, ImageGallery/, Icon/ …
├── data/                     # Alle Inhalte als JSON (kein CMS), jeweils { fa, en }
├── types/                    # TypeScript-Interfaces
├── constants/                # SITE_CONFIG (Name, URL, Kontakt, Share-Bild)
├── context/                  # ThemeContext (Dark/Light), LanguageContext (FA/EN)
├── hooks/                    # useInViewOnce, useMediaQuery
├── lib/                      # Hilfsfunktionen (+ Unit-Tests in lib/__tests__)
│   ├── seo.ts                # pageMetadata() und JSON-LD-Serialisierung
│   ├── contactSchema.ts      # Zod-Schema + Honeypot-Prüfung
│   ├── rateLimit.ts, hotlink.ts, digits.ts, productSearch.ts, productCardInfo.ts …
├── styles/                   # Design-Tokens, Breakpoints, Animationen
└── proxy.ts                  # Hotlink-Schutz für /images (Referer-Prüfung)
```

Icons liegen als SVG-Sprite in `public/icons/sprite.svg` und werden über `<Icon name="…" />` eingebunden.

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Die App läuft standardmäßig auf [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # Produktions-Build
npm run start    # Produktionsserver starten
npm run lint     # ESLint ausführen
npm test         # Unit-Tests (Node-Testrunner, keine Zusatz-Abhängigkeit)
```

Bei jedem Push auf `main` und bei Pull Requests prüft GitHub Actions (`.github/workflows/ci.yml`) Lint, Typen, Tests und Build.

### Umgebungsvariablen (`.env.local`)

| Variable | Pflicht | Zweck |
|---|---|---|
| `RESEND_API_KEY` | ja | API-Key für den E-Mail-Versand des Kontaktformulars |
| `CONTACT_TO_EMAIL` | ja | Empfängeradresse der Anfragen. Ohne sie antwortet die API mit Fehler 500. |
| `CONTACT_FROM_EMAIL` | nein | Absender, z. B. `Airflow <kontakt@airflowsystem.ir>` (verifizierte Domain nötig) |

---

## Inhalte pflegen

Alle Texte und Daten liegen als JSON-Dateien in `src/data/`, jeweils mit einem `fa`- und einem `en`-Block. Es ist kein CMS notwendig.

- **JSON-Importe** werden mit `as unknown as Bilingual<Type>` gecastet, damit TypeScript Literal-Unions (z. B. `"primary" | "outline"`) nicht zu `string` verbreitert.
- **Große Datensätze** (`products-detail.json`, `projects-detail.json`) werden nur in Server-Komponenten (`page.tsx`) importiert; an den Client geht nur der jeweils benötigte Eintrag. Diese Dateien bitte nicht in `"use client"`-Komponenten importieren.
- **Neues Produkt / Projekt:** Eintrag in `products-detail.json` bzw. `projects-detail.json` (beide Sprachen) und in der jeweiligen Listen-Datei anlegen. Seite, Metadaten, JSON-LD und Sitemap-Eintrag entstehen automatisch.
- **Downloads:** Die Dateien, auf die `resources.json` und die Produktseiten verlinken (`/resources/catalog.pdf`, `installation-guide.pdf`, `standards.pdf`, `cad-files.zip`, `bim-models.zip`), gehören nach `public/resources/`. **Dieser Ordner fehlt noch**; bis die Dateien dort liegen, liefern die Links 404.
- **Kontaktdaten:** Telefon, E-Mail und Adresse stehen in `contact.json`, `navigation.json` und `footer.json` sowie für die strukturierten Daten in `SITE_CONFIG`. Bei Änderungen alle Stellen anpassen. Englische Telefonnummern im internationalen Format (`+98 …`) angeben.

---

## Sprache & RTL

- Persisch ist Standard: Der Server rendert immer die persische Fassung, Suchmaschinen indexieren nur diese. Alle Metadaten sind persisch.
- Die gewählte Sprache wird in `localStorage` gespeichert. Ein Inline-Skript im Root-Layout setzt `lang`/`dir` vor dem ersten Paint; die Inhalte wechseln direkt nach der Hydration. Englische Besucher sehen dabei kurz die persische Fassung. Das ist bewusst so, weil Englisch nur ergänzend angeboten wird.
- Neue Styles bitte mit logischen CSS-Properties schreiben (`inset-inline-start`, `margin-inline`, `text-align: start`), dann funktionieren sie in beiden Richtungen ohne `[dir="ltr"]`-Overrides.

---

## SEO

- `metadataBase`, persische Titel/Beschreibungen, Canonical-URL und Open-Graph-/Twitter-Bild pro Seite über `pageMetadata()` in `src/lib/seo.ts`.
- JSON-LD: `Organization` im Root-Layout, `Product` auf jeder Produktseite.
- `/sitemap.xml` und `/robots.txt` werden aus `src/app/sitemap.ts` bzw. `robots.ts` erzeugt.

---

## Sicherheit

- Security-Header (`nosniff`, `frame-ancestors`, `Permissions-Policy` …) und Redirects in `next.config.ts`.
- Hotlink-Schutz für `/images` in `src/proxy.ts`.
- Kontakt-API: serverseitige Zod-Validierung, HTML-Escaping der Mail, Honeypot-Feld gegen Bots und In-Memory-Rate-Limit (3 Anfragen / 10 Min. pro IP). Das Rate-Limit gilt pro Server-Instanz und ist auf Serverless-Hosts nur ein Best-Effort-Schutz.

---

## Kontakt / Deployment

- **Website:** [airflowsystem.ir](https://airflowsystem.ir)
- **Entwickler:** Naser Ahmadi — ahmadi@neoskop.de
- **Deployment:** Vercel (empfohlen) oder beliebiger Node.js-Host
