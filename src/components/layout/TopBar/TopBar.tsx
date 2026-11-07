import Icon from '@/components/shared/Icon/Icon';
import { toTelHref } from '@/lib/digits';
import styles from './TopBar.module.css';

interface TopBarProps {
  phone: string;
  email: string;
  address: string;
  scrolled: boolean;
}

export default function TopBar({ phone, email, address, scrolled }: TopBarProps) {
  return (
    <div className={[styles.topBar, scrolled ? styles.topBarHidden : ''].filter(Boolean).join(' ')}>
      <div className={styles.topBarInner}>
        <div className={styles.topBarInfo}>
          <span className={styles.topBarItem}>
            <Icon name="phone" size={14} />
            <a href={toTelHref(phone)}>{phone}</a>
          </span>
          <span className={styles.topBarItem}>
            <Icon name="mail" size={14} />
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        </div>
        <div className={styles.topBarAddress}>
          <Icon name="location" size={14} />
          <span>{address}</span>
        </div>
      </div>
    </div>
  );
}
