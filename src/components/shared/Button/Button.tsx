'use client';

import Link from 'next/link';
import type { ReactNode, Ref } from 'react';
import type { ButtonVariant, ButtonSize, ButtonTextColor } from '@/types';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  textColor?: ButtonTextColor;
  href?: string;
  /** Renders a plain download link instead of a client-side route. */
  download?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const TEXT_COLOR_CLASS: Partial<Record<ButtonTextColor, string>> = {
  white: styles.textWhite,
  light: styles.textLight,
  accent: styles.textAccent,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  textColor = 'default',
  href,
  download,
  loading,
  disabled,
  fullWidth,
  children,
  className = '',
  onClick,
  type = 'button',
  iconStart,
  iconEnd,
  ref,
}: ButtonProps) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    TEXT_COLOR_CLASS[textColor] ?? '',
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading ? <span className={styles.spinner} /> : null}
      {!loading && iconStart ? <span className={styles.icon}>{iconStart}</span> : null}
      {children}
      {!loading && iconEnd ? <span className={styles.icon}>{iconEnd}</span> : null}
    </>
  );

  if (href && download) {
    return (
      <a href={href} download className={cls} onClick={onClick}>
        {content}
      </a>
    );
  }

  if (href) {
    // A disabled link must not navigate, so drop the href and keep it out of the tab order.
    if (disabled) {
      return (
        <a className={cls} aria-disabled="true" role="link" tabIndex={-1}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button ref={ref} type={type} className={cls} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  );
}
