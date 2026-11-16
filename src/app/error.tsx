'use client';

import Button from '@/components/shared/Button/Button';
import StatusPage from '@/components/shared/StatusPage/StatusPage';
import { useLanguage } from '@/context/LanguageContext';

const TEXT = {
  fa: {
    title: 'خطایی رخ داد',
    description: 'متأسفانه در نمایش این صفحه مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
    retry: 'تلاش دوباره',
    home: 'صفحه اصلی',
  },
  en: {
    title: 'Something went wrong',
    description: 'We could not display this page. Please try again.',
    retry: 'Try again',
    home: 'Home',
  },
};

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <StatusPage
      code="!"
      title={t.title}
      description={t.description}
      actions={
        <>
          <Button onClick={() => unstable_retry()}>{t.retry}</Button>
          <Button href="/" variant="outline">
            {t.home}
          </Button>
        </>
      }
    />
  );
}
