import Icon from "@/components/shared/Icon/Icon";
import type { Resource } from "@/types";
import Link from "next/link";
import styles from "./ResourceCard.module.css";

interface ResourceCardProps {
  resource: Resource;
}

// Downloadability is determined by the href pointing at an actual file
// (rather than by the localized `type` label, which varies by language).
const DOWNLOADABLE_FILE_PATTERN = /\.(pdf|zip|dwg)$/i;

export default function ResourceCard({ resource }: ResourceCardProps) {
  const isFile = DOWNLOADABLE_FILE_PATTERN.test(resource.href);

  const content = (
    <>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>
          <div className={styles.svgWrap}>
            <Icon name={resource.icon} />
          </div>
        </div>
        <span className={styles.typeBadge}>{resource.type}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{resource.title}</h3>
        <p className={styles.cardDesc}>{resource.description}</p>
      </div>
      {resource.size && <span className={styles.size}>{resource.size}</span>}
      {isFile && (
        <div className={styles.downloadIcon}>
          <Icon name="download" size={18} />
        </div>
      )}
    </>
  );

  // Files are plain download links; next/link would try to prefetch them as pages.
  // The id lets other pages link straight to a card, e.g. /resources#catalog.
  return isFile ? (
    <a id={resource.id} href={resource.href} className={styles.card} download>
      {content}
    </a>
  ) : (
    <Link id={resource.id} href={resource.href} className={styles.card}>
      {content}
    </Link>
  );
}
