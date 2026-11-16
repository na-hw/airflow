import type { Lang } from '@/context/LanguageContext';

/** Content authored in both site languages, keyed by language code. */
export type Bilingual<T> = Record<Lang, T>;

// ─── Navigation ──────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  children?: NavChild[];
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavData {
  logo: { text: string; tagline: string; href: string };
  topbar: { phone: string; email: string; address: string };
  items: NavItem[];
  cta: { label: string; href: string };
  languageLabel: string;
  languages: { code: string; label: string; active: boolean }[];
}

// ─── Hero ─────────────────────────────────────────────────────
export interface HeroStat {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface HeroButton {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'outline' | 'ghost';
  icon?: string;
}

export interface HeroData {
  badge: string;
  title: { main: string; highlight: string };
  subtitle: string;
  buttons: HeroButton[];
  capabilities: string[];
  stats: HeroStat[];
  ariaLabel: string;
}

// ─── Partners ─────────────────────────────────────────────────
export interface Partner {
  id: string;
  name: string;
  logo: string;
  /** Partner website; logos without one render as plain images. */
  href?: string;
}

export interface PartnersData {
  title: string;
  items: Partner[];
}

// ─── Why Us ───────────────────────────────────────────────────
export interface WhyUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyUsData {
  section: { tag: string; title: string; subtitle: string };
  items: WhyUsItem[];
}

// ─── Products ─────────────────────────────────────────────────
export interface ProductTab {
  id: string;
  label: string;
  active: boolean;
}

export interface Product {
  id: string;
  category: string;
  image: string;
  name: string;
  series: string;
  model: string;
  href: string;
  badge: string | null;
}

export interface ProductsData {
  section: {
    tag: string;
    title: string;
    subtitle: string;
    viewAll: { label: string; href: string };
  };
  bestSellers: {
    tag: string;
    title: string;
    subtitle: string;
  };
  categoryCta: string;
  viewDetails: string;
  viewDetailsPlain: string;
  nav: { prev: string; next: string };
  tabs: ProductTab[];
  items: Product[];
}

export interface ProductCategory {
  id: string;
  label: string;
  image?: string;
}

export interface ProductCategoriesData {
  section: ProductsData['section'];
  categoryCta: string;
  categories: ProductCategory[];
}

export interface BestSellersData {
  section: ProductsData['bestSellers'];
  nav: ProductsData['nav'];
  items: Product[];
}

// ─── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string;
  image: string;
  /** Display label, in the page language. */
  category: string;
  /** Language-neutral key used by filters and `/projects?category=` links. */
  categoryId: string;
  title: string;
  location: string;
  href: string;
  featured: boolean;
}

export interface ProjectsData {
  section: {
    tag: string;
    title: string;
    subtitle: string;
    viewAll: { label: string; href: string };
  };
  nav: { prev: string; next: string };
  card: { viewDetails: string; viewCaseStudy: string };
  items: Project[];
}

// ─── Statistics ───────────────────────────────────────────────
export interface StatItem {
  id: string;
  icon: string;
  value: number;
  suffix: string;
  label: string;
  numericValue: number;
}

export interface StatisticsData {
  items: StatItem[];
}

// ─── Resources ────────────────────────────────────────────────
export interface Resource {
  id: string;
  icon: string;
  type: string;
  title: string;
  description: string;
  href: string;
  size: string | null;
}

export interface ResourcesData {
  section: {
    tag: string;
    title: string;
    subtitle: string;
    viewAll: { label: string; href: string };
  };
  items: Resource[];
}

// ─── Contact ──────────────────────────────────────────────────
export interface ContactField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

export interface ContactData {
  section: { tag: string; title: string; subtitle: string };
  contactDetails: ContactInfo[];
  fields: ContactField[];
  projectTypes: string[];
  submit: {
    label: string;
    loading: string;
    success: string;
    error: string;
    newMessage: string;
  };
}

// ─── Footer ───────────────────────────────────────────────────
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface Social {
  id: string;
  icon: string;
  href: string;
  label: string;
}

export interface FooterData {
  company: { name: string; subtitle: string; tagline: string; socials: Social[] };
  columns: FooterColumn[];
  contact: { title: string; items: ContactInfo[] };
  copyright: string;
}

// ─── Shared ───────────────────────────────────────────────────
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTextColor = 'default' | 'white' | 'light' | 'accent';

export type CardVariant = 'default' | 'elevated' | 'outline';
export type CardPadding = 'sm' | 'md' | 'lg';
