import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_CONFIG } from '@/constants';
import { toJsonLd } from '@/lib/seo';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ScrollToTop from '@/components/shared/ScrollToTop/ScrollToTop';
import WhatsAppButton from '@/components/shared/WhatsAppButton/WhatsAppButton';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import MotionPreferences from '@/components/layout/MotionPreferences/MotionPreferences';

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['HVAC', 'دریچه هوا', 'دمپر', 'تهویه مطبوع', 'ایرفلو سیستم', 'توزیع هوا', 'سیستم تهویه'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  icons: { icon: SITE_CONFIG.logo },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [{ url: SITE_CONFIG.ogImage, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

/** Lets search engines show the company's contact details and logo. */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_CONFIG.name,
  alternateName: 'Airflow System',
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
  description: SITE_CONFIG.description,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.phone,
  address: { '@type': 'PostalAddress', ...SITE_CONFIG.address },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(organizationJsonLd) }}
        />
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <Script
          id="lang-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem('lang');var en=l==='en';document.documentElement.setAttribute('lang',en?'en':'fa');document.documentElement.setAttribute('dir',en?'ltr':'rtl');}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <MotionPreferences>
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
              <WhatsAppButton />
            </MotionPreferences>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
