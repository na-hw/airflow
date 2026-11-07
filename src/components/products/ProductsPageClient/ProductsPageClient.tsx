"use client";

import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Button from "@/components/shared/Button/Button";
import Container from "@/components/shared/Container/Container";
import type { TabItem } from "@/components/shared/FilterTabs/FilterTabs";
import FilterTabs from "@/components/shared/FilterTabs/FilterTabs";
import PageBanner from "@/components/shared/PageBanner/PageBanner";
import ProductSearchBar from "@/components/products/ProductSearchBar/ProductSearchBar";
import { useLanguage } from "@/context/LanguageContext";
import type { ProductCardTilesById } from "@/lib/productCardInfo";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import type { ProductItem } from "./ProductCard";
import ProductCard from "./ProductCard";
import styles from "./ProductsPageClient.module.css";

const EMPTY_COPY = {
  fa: "محصولی با این مشخصات یافت نشد.",
  en: "No products match your search.",
} as const;

interface Cta {
  title: string;
  subtitle: string;
  button: { label: string; href: string };
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  pageTitle: string;
  tabs: TabItem[];
  items: ProductItem[];
  cta: Cta;
  cardTiles: ProductCardTilesById;
}

export default function ProductsPageClient({
  breadcrumb,
  pageTitle,
  tabs,
  items,
  cta,
  cardTiles,
}: Props) {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const initialTab =
    categoryParam && tabs.some((t) => t.id === categoryParam)
      ? categoryParam
      : "all";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleTabChange = useCallback(
    (tabId: string) => {
      setActiveTab(tabId);

      const params = new URLSearchParams(searchParams.toString());

      if (tabId === "all") {
        params.delete("category");
      } else {
        params.set("category", tabId);
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // Both filters run in one pass over `items`, and the memo depends only on
  // primitives plus the `items` prop — deriving `byCategory` outside the memo
  // would allocate a fresh array each render and defeat it.
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = useMemo(() => {
    const matchesCategory = (p: ProductItem) =>
      activeTab === "all" || p.category === activeTab;
    const matchesQuery = (p: ProductItem) =>
      !normalizedQuery ||
      `${p.name} ${p.model} ${p.series} ${p.id}`
        .toLocaleLowerCase()
        .includes(normalizedQuery);

    return items.filter((p) => matchesCategory(p) && matchesQuery(p));
  }, [items, activeTab, normalizedQuery]);

  return (
    <>
      {/* Page Banner */}
      <PageBanner
        breadcrumb={breadcrumb}
        title={pageTitle}
        image="/images/banners/hvac_showroom_high_quality.webp"
        variant="wide"
      />

      {/* Products Grid */}
      <section className={styles.section}>
        <Container>
          {/* Search */}
          <ProductSearchBar value={query} onChange={setQuery} />

          {/* Tabs */}
          <FilterTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={handleTabChange}
          />

          {/* Grid */}
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <p className={styles.empty}>{EMPTY_COPY[lang]}</p>
              ) : (
                filtered.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} tiles={cardTiles[product.id] ?? []} />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* CTA Banner */}
      <div className={styles.cta}>
        <Container>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>{cta.title}</h2>
              <p className={styles.ctaSubtitle}>{cta.subtitle}</p>
            </div>
            <Button href={cta.button.href} variant="primary" size="lg">
              {cta.button.label}
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
