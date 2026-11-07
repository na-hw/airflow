import type { Lang } from "@/context/LanguageContext";
import type { Bilingual } from "@/types";
import productsDetailRaw from "@/data/products-detail.json";
import productsRaw from "@/data/products.json";

export interface ProductCardTile {
  id: "dimensions" | "application" | "material";
  icon: string;
  /** Bold first line, e.g. "ساخت سفارشی" */
  title: string;
  /** Muted second line, e.g. "در طول‌های بالای 1000 میلی‌متر" */
  detail: string;
}

export interface ProductCardInfo {
  tiles: ProductCardTile[];
}

/**
 * Spec labels that can carry a product's size, in priority order. Products use
 * different labels depending on their shape (round, linear, chimney base…), so
 * the first match wins.
 */
const DIMENSION_LABELS: Record<Lang, string[]> = {
  fa: [
    "ابعاد",
    "قطر یا ابعاد",
    "ابعاد پایه",
    "قطر اتصال",
    "قطر",
    "سایز اتصال",
    "طول",
    "ارتفاع",
  ],
  en: [
    "Dimensions",
    "Diameter or dimensions",
    "Base dimensions",
    "Connection diameter",
    "Diameter",
    "Connection size",
    "Length",
    "Height",
  ],
};

/** Size labels that measure a length rather than a width×height footprint. */
const LINEAR_LABELS: Record<Lang, string[]> = {
  fa: ["طول"],
  en: ["Length"],
};

const APPLICATION_LABELS: Record<Lang, string> = { fa: "کاربرد", en: "Application" };
const MATERIAL_LABELS: Record<Lang, string> = { fa: "جنس", en: "Material" };

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

/**
 * Pulls the smallest listed size out of a spec value such as
 * "۱۰۰×۱۰۰ تا ۱۰۰۰×۶۰۰ mm" or "Custom (100×100 to 1200×1200 mm)".
 * Returns null when the value carries no millimeter figure (e.g. a CFM rating
 * or "Custom, based on duct"), so the raw value is shown instead of an
 * invented measurement.
 */
function extractStartingMillimeters(value: string): string | null {
  if (!/mm/i.test(value)) return null;
  const match = toAsciiDigits(value).match(/\d+(?:[.,]\d+)?/);
  return match ? match[0] : null;
}

interface Spec {
  label: string;
  value: string;
}

/**
 * Indexes a product's specs by label so each lookup is a single map hit
 * instead of a scan. Later duplicates are ignored: the first spec carrying a
 * value wins, matching the previous top-down search order.
 */
function indexSpecsByLabel(specs: Spec[]): Map<string, Spec> {
  const byLabel = new Map<string, Spec>();
  for (const spec of specs) {
    if (spec.value && !byLabel.has(spec.label)) byLabel.set(spec.label, spec);
  }
  return byLabel;
}

/** Returns the first label present in the index, in the labels' priority order. */
function findSpec(byLabel: Map<string, Spec>, labels: string[]): Spec | null {
  for (const label of labels) {
    const spec = byLabel.get(label);
    if (spec) return spec;
  }
  return null;
}

/**
 * Splits a spec value on its own separators so a tile gets a short headline
 * plus a supporting line: "اداری / تجاری / رستوران" becomes "اداری" +
 * "تجاری / رستوران". Values without a separator are kept whole — splitting
 * mid-phrase strands words like "شده" on their own line.
 */
function splitValue(value: string): { title: string; detail: string } {
  const parts = value
    .split(/\s*[/،,]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length > 1) {
    return { title: parts[0], detail: parts.slice(1).join(" / ") };
  }
  return { title: value.trim(), detail: "" };
}

/**
 * Renders the size tile's second line: a templated "from {value} mm" when the
 * spec carries a millimeter figure, otherwise the raw spec value so no
 * measurement is invented.
 */
function formatDimensionDetail(
  dimensions: Spec,
  lang: Lang,
  labels: { sizeFrom: string; sizeFromLength: string },
): string {
  const from = extractStartingMillimeters(dimensions.value);
  if (!from) return dimensions.value;

  const isLinear = LINEAR_LABELS[lang].includes(dimensions.label);
  const template = isLinear ? labels.sizeFromLength : labels.sizeFrom;
  return template.replace("{value}", from);
}

type DetailEntry = { specs?: Spec[] };
type DetailBySlug = Record<string, DetailEntry | undefined>;

/**
 * Builds the info tiles shown under a product card's series name. Every value
 * comes from the product database (products-detail.json) and every label
 * template from products.json, so cards adapt per product automatically.
 * Missing data yields fewer tiles rather than guessed content.
 */
export function getProductCardInfo(productId: string, lang: Lang): ProductCardInfo {
  const specs = (productsDetailRaw[lang] as DetailBySlug)[productId]?.specs;
  if (!specs) return { tiles: [] };

  const byLabel = indexSpecsByLabel(specs);
  const labels = productsRaw[lang].cardInfo;
  const tiles: ProductCardTile[] = [];

  const dimensions = findSpec(byLabel, DIMENSION_LABELS[lang]);
  if (dimensions) {
    tiles.push({
      id: "dimensions",
      icon: "box",
      title: labels.sizeTitle,
      detail: formatDimensionDetail(dimensions, lang, labels),
    });
  }

  // Application and material share one shape: split the value, use the first
  // part in the templated title and keep the rest as the muted detail line.
  const SPLIT_TILES = [
    {
      id: "application",
      icon: "file-text",
      label: APPLICATION_LABELS[lang],
      template: labels.applicationTitle,
    },
    {
      id: "material",
      icon: "shield",
      label: MATERIAL_LABELS[lang],
      template: labels.materialTitle,
    },
  ] as const;

  for (const { id, icon, label, template } of SPLIT_TILES) {
    const spec = findSpec(byLabel, [label]);
    if (!spec) continue;
    const { title, detail } = splitValue(spec.value);
    tiles.push({ id, icon, title: template.replace("{value}", title), detail });
  }

  return { tiles };
}

/** Tiles for every catalog product, keyed by product id, in both languages. */
export type ProductCardTilesById = Record<string, ProductCardTile[]>;

/**
 * Precomputes all card tiles on the server so the products page doesn't ship
 * the full product database to the browser just to derive a few labels.
 */
export function getAllProductCardTiles(): Bilingual<ProductCardTilesById> {
  const build = (lang: Lang): ProductCardTilesById =>
    Object.fromEntries(
      Object.keys(productsDetailRaw[lang]).map((id) => [id, getProductCardInfo(id, lang).tiles]),
    );
  return { fa: build("fa"), en: build("en") };
}
