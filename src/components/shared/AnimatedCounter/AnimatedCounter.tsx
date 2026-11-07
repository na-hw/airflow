"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./AnimatedCounter.module.css";

const DURATION_MS = 2000;

interface AnimatedCounterProps {
  value: number;
  active: boolean;
  className?: string;
  formatValue?: (display: number) => string;
}

export default function AnimatedCounter({ value, active, className, formatValue }: AnimatedCounterProps) {
  const { lang } = useLanguage();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let frame = 0;
    const step = (ts: number) => {
      start ??= ts;
      const progress = Math.min((ts - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  const text = formatValue
    ? formatValue(display)
    : display >= 1000
      ? `${(display / 1000).toFixed(display % 1000 === 0 ? 0 : 1)}K`
      : display.toLocaleString(lang === "fa" ? "fa-IR" : "en-US");

  return <span className={className ?? styles.value}>{text}</span>;
}
