'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ScrollToTop.module.css';

const LABEL = { fa: 'بازگشت به بالا', en: 'Back to top' };

export default function ScrollToTop() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      className={`${styles.btn} ${visible ? styles.visible : ''}`}
      onClick={scrollUp}
      aria-label={LABEL[lang]}
      data-floating-action
    >
      <Icon name="chevron-up" size={20} />
    </button>
  );
}
