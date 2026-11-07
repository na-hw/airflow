import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem { label: string; href: string; }

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={styles.nav} aria-label="breadcrumb">
      {items.map((crumb, i) => (
        <span key={crumb.href} style={{ display: 'contents' }}>
          {i > 0 && <span className={styles.sep} aria-hidden="true">/</span>}
          {i < items.length - 1
            ? <Link href={crumb.href} className={styles.link}>{crumb.label}</Link>
            : <span className={styles.current} aria-current="page">{crumb.label}</span>}
        </span>
      ))}
    </nav>
  );
}
