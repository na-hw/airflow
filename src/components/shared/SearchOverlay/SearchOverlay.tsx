"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Icon from "@/components/shared/Icon/Icon";
import { getSearchableProducts, searchProducts } from "@/lib/productSearch";
import styles from "./SearchOverlay.module.css";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const COPY = {
  fa: {
    placeholder: "جستجوی محصول یا کد محصول…",
    close: "بستن",
    noResultsTitle: "نتیجه‌ای یافت نشد",
    noResultsHint: "نام محصول، کد محصول یا دسته‌بندی دیگری را جستجو کنید.",
    hint: "برای بستن ESC را بزنید",
    resultsCount: (n: number) => `${n} نتیجه`,
  },
  en: {
    placeholder: "Search product or product code…",
    close: "Close",
    noResultsTitle: "No results found",
    noResultsHint: "Try another product name, code, or category.",
    hint: "Press ESC to close",
    resultsCount: (n: number) => `${n} results`,
  },
} as const;

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { lang } = useLanguage();
  const t = COPY[lang];
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const allProducts = useMemo(() => getSearchableProducts(lang), [lang]);
  const results = useMemo(
    () => searchProducts(allProducts, query),
    [allProducts, query],
  );

  // Every close path goes through here, so the next open starts empty.
  const close = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
    };
  }, [isOpen, close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          onClick={close}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={t.placeholder}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.inputRow}>
              <Icon name="search" size={20} className={styles.inputIcon} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.placeholder}
                className={styles.input}
                aria-label={t.placeholder}
              />
              <button
                type="button"
                className={styles.closeBtn}
                onClick={close}
                aria-label={t.close}
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className={styles.results}>
              {query.trim() === "" ? (
                <p className={styles.hint}>{t.hint}</p>
              ) : results.length === 0 ? (
                <div className={styles.empty}>
                  <Icon name="search" size={28} className={styles.emptyIcon} />
                  <p className={styles.emptyTitle}>{t.noResultsTitle}</p>
                  <p className={styles.emptyHint}>{t.noResultsHint}</p>
                </div>
              ) : (
                <>
                  <p className={styles.resultsCount}>
                    {t.resultsCount(results.length)}
                  </p>
                  <ul className={styles.resultsList}>
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={product.href}
                          className={styles.resultItem}
                          onClick={close}
                        >
                          <span className={styles.resultImgWrap}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className={styles.resultImg}
                            />
                          </span>
                          <span className={styles.resultBody}>
                            <span className={styles.resultName}>
                              {product.name}
                            </span>
                            <span className={styles.resultMeta}>
                              <span className={styles.resultCategory}>
                                {product.categoryLabel}
                              </span>
                              <span className={styles.resultDot} aria-hidden>
                                ·
                              </span>
                              <span className={styles.resultModel}>
                                {product.model}
                              </span>
                            </span>
                          </span>
                          <Icon
                            name="chevron-left"
                            size={16}
                            className={styles.resultArrow}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
