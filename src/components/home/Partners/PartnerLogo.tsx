import Logo from "@/components/layout/Logo/Logo";
import styles from "./Partners.module.css";

interface PartnerLogoProps {
  name: string;
  src: string;
  href?: string;
}

export default function PartnerLogo({ name, src, href }: PartnerLogoProps) {
  return <Logo name={name} src={src} href={href} className={styles.logoBox} />;
}
