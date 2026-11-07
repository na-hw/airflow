'use client';

import Icon from '@/components/shared/Icon/Icon';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FilterTabs.module.css';

export interface TabItem {
  id: string;
  label: string;
  /** Number of entries in this category, shown in the mobile dropdown. */
  count?: number;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  /** Accessible name for the filter, e.g. "Product category". */
  label: string;
}

/**
 * Category filter. Desktop shows toggle buttons (they narrow one list rather
 * than switch panels, so aria-pressed, not ARIA tabs); phones get a native
 * select, which opens the OS picker and keeps the filter to one compact row.
 * Only one of the two is displayed at a time, via CSS.
 */
export default function FilterTabs({ tabs, activeTab, onChange, label }: FilterTabsProps) {
  const { lang } = useLanguage();
  const formatCount = (n: number) => n.toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US');

  return (
    <>
      <div className={styles.tabs} role="group" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={activeTab === tab.id}
            className={[styles.tab, activeTab === tab.id ? styles.tabActive : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.selectWrap}>
        <Icon name="filter" size={18} className={styles.selectLeadIcon} />
        <select
          className={styles.select}
          value={activeTab}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.count === undefined ? tab.label : `${tab.label} (${formatCount(tab.count)})`}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} className={styles.selectChevron} />
      </div>
    </>
  );
}
