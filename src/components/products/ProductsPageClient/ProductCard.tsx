"use client";

import { useState } from "react";
import Badge from "@/components/shared/Badge/Badge";
import { useLanguage } from "@/context/LanguageContext";
import productsRaw from "@/data/products.json";
import type { ProductCardTile } from "@/lib/productCardInfo";
import Icon from "@/components/shared/Icon/Icon";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductsPageClient.module.css";

export interface ProductItem {
  id: string;
  category: string;
  image: string;
  name: string;
  series: string;
  model: string;
  href: string;
  badge: string | null;
}

interface ProductCardProps {
  product: ProductItem;
  tiles: ProductCardTile[];
}

export default function ProductCard({ product, tiles }: ProductCardProps) {
  const { lang } = useLanguage();
  const { detailsCta } = productsRaw[lang].cardInfo;
  const [imgError, setImgError] = useState(false);

  const showPlaceholder = !product.image || imgError;

  return (
    <Link href={product.href} className={styles.card}>
      <div className={styles.cardImgWrap}>
        {showPlaceholder ? (
          <div className={styles.placeholder} aria-hidden>
            <Image
              src="/images/product-card-placeholder.svg"
              alt=""
              fill
              unoptimized
            />
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={styles.cardImg}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        )}
        {product.badge && (
          <div className={styles.cardBadge}>
            <Badge variant="accent">{product.badge}</Badge>
          </div>
        )}
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{product.name}</h3>
        <span className={styles.cardSeries}>{product.series}</span>
        {tiles.length > 0 && (
          <ul className={styles.cardTiles}>
            {tiles.map((tile) => (
              <li key={tile.id} className={styles.cardTile}>
                <Icon name={tile.icon} size={22} className={styles.cardTileIcon} />
                <span className={styles.cardTileTitle}>{tile.title}</span>
                {tile.detail && (
                  <span className={styles.cardTileDetail}>{tile.detail}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <span className={styles.cardBtn}>
          {detailsCta}
          <Icon name={lang === "fa" ? "chevron-left" : "chevron-right"} size={16} />
        </span>
      </div>
    </Link>
  );
}
