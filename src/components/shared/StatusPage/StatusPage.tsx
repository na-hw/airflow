import type { ReactNode } from 'react';
import Container from '@/components/shared/Container/Container';
import styles from './StatusPage.module.css';

interface StatusPageProps {
  code: string;
  title: string;
  description: string;
  /** Buttons that lead the visitor back into the site. */
  actions: ReactNode;
}

/** Full-page message for 404 and error states. */
export default function StatusPage({ code, title, description, actions }: StatusPageProps) {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.inner}>
          <p className={styles.code} aria-hidden>
            {code}
          </p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>{actions}</div>
        </div>
      </Container>
    </main>
  );
}
