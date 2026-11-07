"use client";

import PageBanner from "@/components/shared/PageBanner/PageBanner";
import type { BreadcrumbItem } from "@/components/shared/Breadcrumb/Breadcrumb";
import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDetailClient.module.css";

interface MetaItem {
  icon: string;
  label: string;
  value: string;
}

interface ProductItem {
  name: string;
  model: string;
  description: string;
  image: string;
  href: string;
}

interface SectionLabels {
  scope: string;
  services: string;
  executionDetails: string;
  about: string;
  productsUsed: string;
}

interface Props {
  breadcrumb: BreadcrumbItem[];
  title: string;
  category: string;
  location: string;
  year: string;
  heroImage: string;
  meta: MetaItem[];
  description: string;
  scope: string;
  products: ProductItem[];
  highlights: string[];
  sectionLabels: SectionLabels;
  serviceItems: string[];
  modelLabel: string;
}

export default function ProjectDetailClient({
  breadcrumb,
  title,
  category,
  location,
  year,
  heroImage,
  meta,
  description,
  scope,
  products,
  highlights,
  sectionLabels,
  serviceItems,
  modelLabel,
}: Props) {
  const infoCards = [
    { icon: "cog", title: sectionLabels.scope, items: highlights },
    {
      icon: "briefcase",
      title: sectionLabels.services,
      items: serviceItems,
    },
    { icon: "file-check", title: sectionLabels.executionDetails, items: [scope, ...highlights] },
  ];

  return (
    <>
      <PageBanner
        breadcrumb={breadcrumb}
        badge={category}
        title={title}
        description={description}
        image={heroImage}
        meta={[
          { icon: "location", value: location },
          { icon: "calendar", value: year },
        ]}
      />

      <section className={styles.metaBar}>
        <Container>
          <div className={styles.metaGrid}>
            {meta.map((m) => (
              <div key={m.label} className={styles.metaCell}>
                <Icon name={m.icon} size={18} className={styles.metaIcon} />
                <div className={styles.metaText}>
                  <span className={styles.metaLabel}>{m.label}</span>
                  <span className={styles.metaValue}>{m.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.about}>
        <Container>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>{sectionLabels.about}</h2>
              <p className={styles.aboutDescription}>{description}</p>
            </div>

            <div className={styles.aboutImage}>
              <Image
                src={heroImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className={styles.aboutImg}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.infoSection}>
        <Container>
          <div className={styles.infoCardsGrid}>
            {infoCards.map((card) => (
              <div key={card.title} className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <span className={styles.infoCardIconWrap}>
                    <Icon name={card.icon} size={18} />
                  </span>
                  <h3 className={styles.infoCardTitle}>{card.title}</h3>
                </div>
                <ul className={styles.infoCardList}>
                  {card.items.map((item) => (
                    <li key={item} className={styles.infoCardItem}>
                      <Icon
                        name="chevron-left"
                        size={14}
                        className={styles.infoCardBullet}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.productsSection}>
        <Container>
          <h2 className={styles.sectionTitle}>{sectionLabels.productsUsed}</h2>

          <div className={styles.productsGrid}>
            {products.map((p) => (
              <Link key={p.model} href={p.href} className={styles.productCard}>
                <div className={styles.productImageWrap}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productBody}>
                  <h3 className={styles.productName}>{p.name}</h3>
                  <span className={styles.productModel}>{modelLabel.replace("{model}", p.model)}</span>
                  <p className={styles.productDescription}>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
