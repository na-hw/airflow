"use client";

import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/constants";
import contactRaw from "@/data/contact.json";
import { useEffect, useState } from "react";
import styles from "./WhatsAppButton.module.css";
import type { Bilingual } from "@/types";

const SHOW_DELAY_MS = 8000;
const SHOW_DURATION_MS = 4000;
const SEEN_KEY = "whatsapp-bubble-seen";

type WhatsappWidgetCopy = { bubble: string; ariaLabel: string };

export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const t = (contactRaw as unknown as Bilingual<{ whatsappWidget: WhatsappWidgetCopy }>)[lang].whatsappWidget;
  const [showBubble, setShowBubble] = useState(false);

  // A single, delayed hint per visit: repeating it would nag and, on phones,
  // keep covering the content under it.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      // Storage unavailable: still show the hint once for this page view.
    }

    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    const showTimeout = setTimeout(() => {
      setShowBubble(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
      hideTimeout = setTimeout(() => setShowBubble(false), SHOW_DURATION_MS);
    }, SHOW_DELAY_MS);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className={styles.wrapper} data-floating-action>
      <a
        className={`${styles.bubble} ${showBubble ? styles.bubbleVisible : ""}`}
        href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.bubble}
      </a>
      <a
        className={styles.btn}
        href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.ariaLabel}
      >
        <Icon name="whatsapp" size={26} />
      </a>
    </div>
  );
}
