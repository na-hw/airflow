# ایرفلو سیستم — Airflow System

Unternehmenswebsite für **ایرفلو سیستم** (Airflow System), einen iranischen Hersteller von HVAC-Komponenten (Lüftungsgitter, Dämper, Luftverteilungssysteme) mit über 18 Jahren Erfahrung.

Die Website ist vollständig auf Persisch (Farsi) mit RTL-Layout aufgebaut und richtet sich an den iranischen B2B-Markt.

---

## Tech-Stack

| Technologie | Version | Zweck |
|---|---|---|
| Next.js | 16.2.9 | Framework (App Router) |
| React | 19 | UI |
| TypeScript | 5 | Typsicherheit (strict mode) |
| CSS Modules | — | Komponentenstyling |
| Framer Motion | 12 | Animationen |
| Swiper.js | 12 | Slider/Karussell |
| React Hook Form + Zod | 7 / 4 | Kontaktformular + Validierung |
| Vazirmatn (next/font) | — | Persische Schriftart |
| Tailwind CSS | 4 | Utility-Klassen |

---

## Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Homepage
│   ├── about/              # Über uns
│   ├── products/           # Produktliste + Detailseite ([slug])
│   ├── projects/           # Referenzprojekte + Detail ([slug])
│   ├── resources/          # Downloads / Ressourcen
│   └── api/contact/        # Kontaktformular-Endpoint (Versand via Resend)
├── components/
│   ├── home/               # Sektionen der Homepage
│   │   ├── Hero/
│   │   ├── Partners/
│   │   ├── WhyUs/
│   │   ├── Products/
│   │   ├── Projects/
│   │   ├── Statistics/
│   │   ├── Resources/
│   │   └── ContactForm/
│   ├── layout/             # Header / Footer
│   ├── about/              # About-Sektionen
│   ├── products/           # Produkt-Seiten-Komponenten
│   ├── projects/           # Projekt-Seiten-Komponenten
│   └── shared/             # Wiederverwendbare UI-Elemente
│       ├── Button/         # Button + Link, Varianten: primary/outline/ghost/accent, textColor-Prop
│       ├── AnimatedCounter/
│       ├── Badge/
│       ├── Breadcrumb/
│       ├── FilterTabs/
│       ├── Icon/
│       ├── ImageGallery/
│       ├── ProjectCard/
│       ├── ResourceCard/
│       ├── ScrollToTop/
│       ├── SectionTitle/
│       └── Tabs/
├── data/                   # Alle Inhalte als JSON (kein CMS)
│   ├── hero.json
│   ├── navigation.json
│   ├── products.json
│   ├── products-detail.json
│   ├── projects.json
│   ├── resources.json
│   └── ...
├── types/                  # TypeScript-Interfaces
├── constants/              # SITE_CONFIG, Animationskonstanten
├── context/                # ThemeContext (Dark/Light), LanguageContext (FA/EN)
├── hooks/                  # Custom React Hooks
├── lib/                    # Hilfsfunktionen (+ Unit-Tests in lib/__tests__)
├── styles/                 # CSS-Variablen / Design-Tokens
└── proxy.ts                # Hotlink-Schutz für /images (Referer-Prüfung)
```

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Die App läuft standardmäßig auf [http://localhost:3000](http://localhost:3000). Falls Port 3000 belegt ist, wird Port 3001 verwendet.

```bash
npm run build    # Produktions-Build
npm run start    # Produktionsserver starten
npm run lint     # ESLint ausführen
npm test         # Unit-Tests (Node-Testrunner, keine Zusatz-Abhängigkeit)
```

### Umgebungsvariablen (`.env.local`)

| Variable | Pflicht | Zweck |
|---|---|---|
| `RESEND_API_KEY` | ja | API-Key für den E-Mail-Versand des Kontaktformulars |
| `CONTACT_TO_EMAIL` | nein | Empfängeradresse der Anfragen (Standard: Entwickleradresse) |
| `CONTACT_FROM_EMAIL` | nein | Absender, z. B. `Airflow <kontakt@airflowsystem.ir>` (verifizierte Domain nötig) |

---

## Inhalte pflegen

Alle Texte und Daten liegen als JSON-Dateien in `src/data/`. Es ist kein CMS notwendig — Änderungen an den JSON-Dateien wirken sich direkt auf die Website aus.

**Wichtig:** JSON-Importe müssen mit `as unknown as Bilingual<Type>` gecastet werden, damit TypeScript Literal-Unions (z. B. `"primary" | "outline"`) nicht zu `string` verbreitert.

Große Datensätze (`products-detail.json`, `projects-detail.json`) werden nur in Server-Komponenten (`page.tsx`) importiert; an den Client geht nur der jeweils benötigte Eintrag. Diese Dateien bitte nicht direkt in `"use client"`-Komponenten importieren.

---

## RTL-Konfiguration

- `<html dir="rtl" lang="fa">` ist in `src/app/layout.tsx` gesetzt
- Schriftart: **Vazirmatn** (Google Fonts, Arabic-Subset)
- Design-Tokens für RTL-Abstände in `src/styles/variables.css`

---

## Kontakt / Deployment

- **Website:** [airflowsystem.ir](https://airflowsystem.ir)
- **Entwickler:** Naser Ahmadi — ahmadi@neoskop.de
- **Deployment:** Vercel (empfohlen) oder beliebiger Node.js-Host
# airflow
