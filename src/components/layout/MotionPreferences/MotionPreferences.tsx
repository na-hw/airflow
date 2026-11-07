'use client';

import { MotionConfig } from 'framer-motion';

/** Honours the OS "reduce motion" setting for every Framer Motion animation. */
export default function MotionPreferences({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
