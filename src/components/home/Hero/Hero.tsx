"use client";

import AnimatedCounter from "@/components/shared/AnimatedCounter/AnimatedCounter";
import Button from "@/components/shared/Button/Button";
import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import type { HeroData } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Hero.module.css";

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

interface HeroProps {
  data: HeroData;
}

function formatStatValue(display: number, sample: string, locale: string) {
  if (sample.includes("M")) {
    return `${(display / 1000000).toLocaleString(locale, { maximumFractionDigits: 1 })}M`;
  }
  return display.toLocaleString(locale);
}

export default function Hero({ data }: HeroProps) {
  const { lang } = useLanguage();
  const { ref: statsRef, inView: statsInView } =
    useInViewOnce<HTMLDivElement>();

  return (
    <section className={styles.hero} aria-label={data.ariaLabel}>
      {/* ── Full-screen background image ── */}
      <div className={styles.bgWrap} aria-hidden>
        <Image
          src="/images/banners/hero-bg-home.webp"
          alt=""
          fill
          priority
          quality={90}
          className={`${styles.bgImg} ${styles.bgImgDesktop}`}
          sizes="100vw"
        />
        <Image
          src="/images/banners/hero-bg-home-mobile.webp"
          alt=""
          fill
          priority
          quality={90}
          className={`${styles.bgImg} ${styles.bgImgMobile}`}
          sizes="100vw"
        />
        {/* dark overlay so text stays readable */}
        <div className={styles.bgOverlay} />
        {/* subtle blue gradient on the left where text lives */}
        <div className={styles.bgGradLeft} />
        {/* glow at bottom */}
        <div className={styles.bgGlow} />
      </div>

      {/* ── Content ── */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.h1 className={styles.title} {...fadeUp(0.25)}>
            {data.title.main}
            <span className={styles.titleHighlight}>
              {data.title.highlight}
            </span>
          </motion.h1>

          <motion.p className={styles.subtitle} {...fadeUp(0.35)}>
            {data.subtitle}
          </motion.p>

          <motion.div className={styles.buttons} {...fadeUp(0.45)}>
            {data.buttons.map((btn) => (
              <Button
                key={btn.id}
                href={btn.href}
                variant={btn.variant}
                size="lg"
                iconStart={
                  btn.variant === "outline" ? (
                    <Icon name={btn.icon ?? "play"} size={18} />
                  ) : undefined
                }
                iconEnd={
                  btn.variant === "primary" ? (
                    <Icon
                      name={lang === "fa" ? "arrow-left" : "arrow-right"}
                      size={18}
                    />
                  ) : undefined
                }
              >
                {btn.label}
              </Button>
            ))}
          </motion.div>

          <motion.div className={styles.capabilities} {...fadeUp(0.52)}>
            {data.capabilities.map((cap, i) => (
              <span key={cap} className={styles.capabilityItemGroup}>
                {i > 0 && <span className={styles.capabilityDot} />}
                <span className={styles.capabilityItem}>{cap}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Stats row ── */}
        <motion.div className={styles.statsRow} ref={statsRef} {...fadeUp(0.6)}>
          {data.stats.map((stat, i) => (
            <div key={stat.id} className={styles.stat}>
              {i > 0 && <div className={styles.statDivider} />}
              <span className={styles.statValueRow}>
                <AnimatedCounter
                  value={stat.numericValue}
                  active={statsInView}
                  className={styles.statValue}
                  formatValue={(display) =>
                    formatStatValue(
                      display,
                      stat.value,
                      lang === "fa" ? "fa-IR" : "en-US",
                    )
                  }
                />
                <span className={styles.statSuffix}>{stat.suffix}</span>
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
