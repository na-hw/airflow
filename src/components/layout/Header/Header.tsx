"use client";

import HeaderActions from "@/components/layout/HeaderActions/HeaderActions";
import LanguageSwitch from "@/components/layout/LanguageSwitch/LanguageSwitch";
import Logo from "@/components/layout/Logo/Logo";
import Navigation from "@/components/layout/Navigation/Navigation";
import NavItemMobile from "@/components/layout/NavItemMobile/NavItemMobile";
import TopBar from "@/components/layout/TopBar/TopBar";
import Button from "@/components/shared/Button/Button";
import { SCROLL_THRESHOLD } from "@/constants";
import { useLanguage } from "@/context/LanguageContext";
import navRaw from "@/data/navigation.json";
import type { Bilingual, NavData } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";


export default function Header() {
  const { lang } = useLanguage();
  const data = (navRaw as unknown as Bilingual<NavData>)[lang];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const lightBanner =
    pathname === "/about" ||
    pathname === "/products" ||
    pathname.startsWith("/projects");

  const closeMobileMenu = () => {
    document.body.style.overflow = "";
    setMobileOpen(false);
  };

  const scrollToHash = (hash: string) => {
    if (pathname !== "/") {
      router.push(`/${hash}`);
      return;
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  const scrollToCta: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    scrollToHash(data.cta.href);
  };

  const handleMobileCta: React.MouseEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    closeMobileMenu();
    setTimeout(() => scrollToHash(data.cta.href), 50);
  };

  const handleNavHashClick =
    (hash: string): React.MouseEventHandler<HTMLElement> =>
    (e) => {
      e.preventDefault();
      scrollToHash(hash);
    };

  const handleMobileNavHashClick =
    (hash: string): React.MouseEventHandler<HTMLElement> =>
    (e) => {
      e.preventDefault();
      closeMobileMenu();
      setTimeout(() => scrollToHash(hash), 50);
    };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobileMenu();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={[
        styles.header,
        scrolled ? styles.scrolled : "",
        mobileOpen ? styles.mobileOpen : "",
        lightBanner ? styles.lightBanner : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-mobile-open={String(mobileOpen)}
    >
      {pathname === "/" && (
        <TopBar
          phone={data.topbar.phone}
          email={data.topbar.email}
          address={data.topbar.address}
          scrolled={scrolled}
        />
      )}

      {/* Main Nav */}
      <div className={styles.nav}>
        <div className={styles.navInner}>
          <Logo
            name={data.logo.text}
            subtitle={data.logo.tagline}
            href={data.logo.href}
            scrolled={scrolled}
            isHome={pathname === "/"}
          />
          <nav aria-label={lang === "fa" ? "ناوبری اصلی" : "Main navigation"}>
            <Navigation
              items={data.items}
              activeDropdown={activeDropdown}
              onDropdownEnter={setActiveDropdown}
              onDropdownLeave={() => setActiveDropdown(null)}
              isActive={isActive}
              isHome={pathname === "/"}
              scrolled={scrolled}
              lightBanner={lightBanner}
              onHashClick={handleNavHashClick}
            />
          </nav>
          <HeaderActions
            cta={data.cta}
            mobileOpen={mobileOpen}
            onHamburgerClick={() => setMobileOpen(!mobileOpen)}
            onCtaClick={scrollToCta}
            hamburgerLabel={lang === "fa" ? "منو" : "Menu"}
            scrolled={scrolled}
            isHome={pathname === "/"}
          />
        </div>

        {/* Mobile Menu — outside navInner so it expands below the nav bar */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.mobileMenuInner}>
                <ul className={styles.mobileNavList}>
                  {data.items.map((item, i) => (
                    <NavItemMobile
                      key={item.id}
                      item={item}
                      index={i}
                      isActive={isActive(item.href)}
                      onClose={closeMobileMenu}
                      onHashClick={handleMobileNavHashClick}
                    />
                  ))}
                </ul>
                <div className={styles.mobileLang}>
                  <span className={styles.mobileLangLabel}>
                    {data.languageLabel}
                  </span>
                  <LanguageSwitch size="lg" onSelect={closeMobileMenu} />
                </div>
                <Button
                  href={data.cta.href}
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleMobileCta}
                  className={styles.mobileCta}
                >
                  {data.cta.label}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
