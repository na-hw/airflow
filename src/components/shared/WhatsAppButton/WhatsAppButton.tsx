"use client";

import Icon from "@/components/shared/Icon/Icon";
import { useLanguage } from "@/context/LanguageContext";
import { SITE_CONFIG } from "@/constants";
import contactRaw from "@/data/contact.json";
import { useEffect, useState } from "react";
import styles from "./WhatsAppButton.module.css";

const SHOW_INTERVAL_MS = 10000;
const SHOW_DURATION_MS = 3000;

type WhatsappWidgetCopy = { bubble: string; ariaLabel: string };
type BillingualContact = { fa: { whatsappWidget: WhatsappWidgetCopy }; en: { whatsappWidget: WhatsappWidgetCopy } };

export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const t = (contactRaw as unknown as BillingualContact)[lang].whatsappWidget;
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setShowBubble(true);
      hideTimeout = setTimeout(() => setShowBubble(false), SHOW_DURATION_MS);
    }, SHOW_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
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
