import Container from "@/components/shared/Container/Container";
import Icon from "@/components/shared/Icon/Icon";
import styles from "./AboutValues.module.css";

interface ValueItem {
  id: string;
  icons: string[];
  title: string;
  description: string;
}

interface Props {
  title: string;
  items: ValueItem[];
}

export default function AboutValues({ title, items }: Props) {
  return (
    <section className={styles.section} id="values">
      <Container>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconsRow}>
                {item.icons.map((icon) => (
                  <div key={icon} className={styles.iconWrap}>
                    <div className={styles.iconSvg}>
                      <Icon name={icon} />
                    </div>
                  </div>
                ))}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
