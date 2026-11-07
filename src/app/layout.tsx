import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_CONFIG } from '@/constants';
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
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['HVAC', 'دریچه هوا', 'دمپر', 'تهویه مطبوع', 'ایرفلو سیستم', 'توزیع هوا', 'سیستم تهویه'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable} suppressHydrationWarning>
      <body>
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
        <Script
          id="image-protect"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){
              document.addEventListener('contextmenu', function(e){ if(e.target && e.target.tagName === 'IMG') e.preventDefault(); });
              document.addEventListener('dragstart', function(e){ if(e.target && e.target.tagName === 'IMG') e.preventDefault(); });
              document.addEventListener('keydown', function(e){
                var k = e.key;
                if (k === 'F12') { e.preventDefault(); return; }
                if (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'i' || k === 'J' || k === 'j' || k === 'C' || k === 'c')) { e.preventDefault(); return; }
                if (e.ctrlKey && (k === 'u' || k === 'U')) { e.preventDefault(); return; }
              });
            })();`,
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
