import Icon from "@/components/shared/Icon/Icon";
import { toTelHref } from "@/lib/digits";
import styles from "./ContactDetail.module.css";

interface ContactDetailProps {
  icon: string;
  label: string;
  value: string;
  href?: string;
}

/** Phone numbers and emails become tap-to-call / tap-to-mail links. */
function hrefFor(icon: string, value: string): string | undefined {
  if (icon === "phone") return toTelHref(value);
  if (icon === "mail") return `mailto:${value}`;
  return undefined;
}

export default function ContactDetail({ icon, label, value, href: hrefProp }: ContactDetailProps) {
  const href = hrefProp ?? hrefFor(icon, value);
  const external = href?.startsWith("http");
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {};

  return (
    <Wrapper className={styles.contactItem} {...wrapperProps}>
      <div className={styles.contactIcon}>
        <div className={styles.iconSvg}>
          <Icon name={icon} />
        </div>
      </div>
      <div>
        <span className={styles.contactLabel}>{label}</span>
        <span className={styles.contactValue}>{value}</span>
      </div>
    </Wrapper>
  );
}
