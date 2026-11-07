'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageGallery.module.css';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainWrap}>
        <div className={styles.glow} />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className={styles.mainImage}
          >
            <Image
              src={images[active].src}
              alt={images[active].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 640px"
              className={styles.img}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.thumbnails}>
        {images.map((img, i) => (
          <button
            key={i}
            className={[styles.thumb, active === i ? styles.thumbActive : ''].filter(Boolean).join(' ')}
            onClick={() => setActive(i)}
            aria-label={img.alt}
            aria-pressed={active === i}
          >
            <Image src={img.src} alt="" fill sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
