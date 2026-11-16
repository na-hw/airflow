"use client";

import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import type { BestSellersData } from "@/types";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import styles from "./Products.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BestSellersProps {
  data: BestSellersData;
}

export default function BestSellers({ data }: BestSellersProps) {
  const bestSellersRef = useRef<HTMLElement>(null);
  const bestSellersInView = useInView(bestSellersRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      className={styles.sectionAlt}
      ref={bestSellersRef}
      aria-label={data.section.title}
    >
      <Container>
        <div className={styles.header}>
          <SectionTitle
            title={data.section.title}
            subtitle={data.section.subtitle}
            align="start"
          />
        </div>

        {/* Swiper */}
        <motion.div
          className={styles.sliderWrap}
          initial={{ opacity: 0 }}
          animate={bestSellersInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            navigation={{
              nextEl: ".products-next",
              prevEl: ".products-prev",
            }}
            pagination={{ clickable: true, el: ".products-pagination" }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={data.items.length > 4}
            breakpoints={{
              480: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
            }}
            className={styles.swiper}
          >
            {data.items.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} variant="compact" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav */}
          <button
            className={`${styles.navBtn} ${styles.navPrev} products-prev`}
            aria-label={data.nav.prev}
          >
            <Icon name="chevron-right" size={20} />
          </button>
          <button
            className={`${styles.navBtn} ${styles.navNext} products-next`}
            aria-label={data.nav.next}
          >
            <Icon name="chevron-left" size={20} />
          </button>

          <div className={`products-pagination ${styles.pagination}`} />
        </motion.div>
      </Container>
    </section>
  );
}
