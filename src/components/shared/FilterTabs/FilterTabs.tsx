'use client';

import styles from './FilterTabs.module.css';

export interface TabItem {
  id: string;
  label: string;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

/**
 * Category filter buttons. They narrow one list rather than switch between
 * panels, so they are toggle buttons (aria-pressed), not ARIA tabs.
 */
export default function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  return (
    <div className={styles.tabs} role="group">
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
  );
}
