"use client";

import Badge from "@/components/shared/Badge/Badge";
import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import productsRaw from "@/data/products.json";
import type { ProductCardTile } from "@/lib/productCardInfo";
import type { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  /**
   * `compact`: photo-led card for the home page carousel.
   * `detailed`: catalog card with spec tiles for the products grid.
   */
  variant?: "compact" | "detailed";
  tiles?: ProductCardTile[];
}

const IMAGE_SIZES = {
  compact: "220px",
  detailed: "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw",
};

export default function ProductCard({ product, variant = "detailed", tiles = [] }: ProductCardProps) {
  const { lang, dir } = useLanguage();
  const { detailsCta } = productsRaw[lang].cardInfo;
  const [imgError, setImgError] = useState(false);
  const showPlaceholder = !product.image || imgError;
  const compact = variant === "compact";

  const series = <span className={styles.series}>{product.series}</span>;

  return (
    <Link href={product.href} className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.imgWrap}>
        {showPlaceholder ? (
          <div className={styles.placeholder} aria-hidden>
            <Image src="/images/product-card-placeholder.svg" alt="" fill unoptimized />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.img}
            sizes={IMAGE_SIZES[variant]}
            onError={() => setImgError(true)}
          />
        )}
        {product.badge && (
          <div className={styles.badge}>
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
        {compact && <div className={styles.overlay} aria-hidden />}
      </div>
      <div className={styles.body}>
        {compact && series}
        <h3 className={styles.name}>{product.name}</h3>
        {!compact && series}
        {tiles.length > 0 && (
          <ul className={styles.tiles}>
            {tiles.map((tile) => (
              <li key={tile.id} className={styles.tile}>
                <Icon name={tile.icon} size={22} className={styles.tileIcon} />
                <span className={styles.tileTitle}>{tile.title}</span>
                {tile.detail && <span className={styles.tileDetail}>{tile.detail}</span>}
              </li>
            ))}
          </ul>
        )}
        <span className={styles.cta}>
          {detailsCta}
          <Icon name={dir === "rtl" ? "chevron-left" : "chevron-right"} size={compact ? 15 : 16} />
        </span>
      </div>
    </Link>
  );
}
