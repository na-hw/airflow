'use client';

import Button from '@/components/shared/Button/Button';
import StatusPage from '@/components/shared/StatusPage/StatusPage';
import { useLanguage } from '@/context/LanguageContext';

const TEXT = {
  fa: {
    title: 'صفحه پیدا نشد',
    description: 'صفحه‌ای که دنبال آن هستید وجود ندارد یا جابه‌جا شده است.',
    home: 'بازگشت به صفحه اصلی',
    products: 'مشاهده محصولات',
  },
  en: {
    title: 'Page not found',
    description: "The page you're looking for doesn't exist or has been moved.",
    home: 'Back to home',
    products: 'View products',
  },
};

export default function NotFound() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <StatusPage
      code="404"
      title={t.title}
      description={t.description}
      actions={
        <>
          <Button href="/">{t.home}</Button>
          <Button href="/products" variant="outline">
            {t.products}
          </Button>
        </>
      }
    />
  );
}
