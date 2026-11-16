import Link from 'next/link';
import type { ReactNode } from 'react';
import type { CardVariant, CardPadding } from '@/types';
import styles from './Card.module.css';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  href?: string;
  children: ReactNode;
  className?: string;
}

const PADDING_CLASS: Record<CardPadding, string> = {
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  href,
  children,
  className = '',
}: CardProps) {
  const cls = [
    styles.card,
    styles[variant],
    PADDING_CLASS[padding],
    hoverable ? styles.hoverable : '',
    className,
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <div className={cls}>{children}</div>;
}
