'use client';

import { useState } from 'react';
import Container from '@/components/shared/Container/Container';
import SectionTitle from '@/components/shared/SectionTitle/SectionTitle';
import Button from '@/components/shared/Button/Button';
import Badge from '@/components/shared/Badge/Badge';
import Card from '@/components/shared/Card/Card';
import Modal from '@/components/shared/Modal/Modal';
import Tabs from '@/components/shared/Tabs/Tabs';
import Accordion from '@/components/shared/Accordion/Accordion';
import Table from '@/components/shared/Table/Table';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import FormField from '@/components/shared/FormField/FormField';
import FormSelect from '@/components/shared/FormField/FormSelect';
import styles from './DesignSystemContent.module.css';

const COLOR_TOKENS = [
  { name: 'Primary', token: '--color-primary' },
  { name: 'Primary Light', token: '--color-primary-light' },
  { name: 'Secondary', token: '--color-secondary' },
  { name: 'Accent', token: '--color-accent' },
  { name: 'Background', token: '--color-bg' },
  { name: 'Background Secondary', token: '--color-bg-secondary' },
  { name: 'Surface', token: '--color-surface' },
  { name: 'Border', token: '--color-border' },
  { name: 'Text', token: '--color-text-primary' },
  { name: 'Muted', token: '--color-text-muted' },
  { name: 'Success', token: '--color-success' },
  { name: 'Warning', token: '--color-warning' },
  { name: 'Danger', token: '--color-danger' },
];

const TYPE_TOKENS = [
  { role: 'H1', textToken: '--text-h1', weightToken: '--weight-h1', sample: 'سیستم توزیع هوا' },
  { role: 'H2', textToken: '--text-h2', weightToken: '--weight-h2', sample: 'سیستم توزیع هوا' },
  { role: 'H3', textToken: '--text-h3', weightToken: '--weight-h3', sample: 'سیستم توزیع هوا' },
  { role: 'Body', textToken: '--text-body', weightToken: '--weight-body', sample: 'این یک متن نمونه برای بدنه محتوا است.' },
  { role: 'Caption', textToken: '--text-caption', weightToken: '--weight-caption', sample: 'این یک متن نمونه برای توضیحات کوچک است.' },
  { role: 'Label', textToken: '--text-label', weightToken: '--weight-label', sample: 'برچسب فرم' },
];

const SPACE_TOKENS = [
  { px: 4, token: '--space-1' },
  { px: 8, token: '--space-2' },
  { px: 12, token: '--space-3' },
  { px: 16, token: '--space-4' },
  { px: 24, token: '--space-6' },
  { px: 32, token: '--space-8' },
  { px: 48, token: '--space-12' },
  { px: 64, token: '--space-16' },
  { px: 96, token: '--space-24' },
];

const TABLE_COLUMNS = [
  { key: 'name', label: 'نام' },
  { key: 'category', label: 'دسته‌بندی' },
  { key: 'status', label: 'وضعیت', align: 'end' as const },
];

const TABLE_ROWS = [
  { name: 'دریچه خطی', category: 'دریچه‌ها', status: <Badge variant="success" size="sm">موجود</Badge> },
  { name: 'دمپر موتوری', category: 'دمپرها', status: <Badge variant="warning" size="sm">محدود</Badge> },
  { name: 'فیلتر هوا', category: 'فیلترها', status: <Badge variant="success" size="sm">موجود</Badge> },
];

const ACCORDION_ITEMS = [
  { id: '1', title: 'این کامپوننت چگونه کار می‌کند؟', content: 'هر آیتم می‌تواند به‌صورت مستقل یا گروهی باز و بسته شود.' },
  { id: '2', title: 'آیا از توکن‌های طراحی استفاده می‌کند؟', content: 'بله، تمام رنگ‌ها، فاصله‌ها و تایپوگرافی از variables.css خوانده می‌شوند.' },
  { id: '3', title: 'آیا در هر دو تم کار می‌کند؟', content: 'بله، در تم روشن و تیره به‌درستی نمایش داده می‌شود.' },
];

export default function DesignSystemContent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className={styles.page}>
      <Container size="xl">
        <div className={styles.breadcrumbRow}>
          <Breadcrumb items={[{ label: 'خانه', href: '/' }, { label: 'Design System', href: '/design-system' }]} />
        </div>

        <SectionTitle
          title="Design System"
          subtitle="مرجع زنده‌ی توکن‌ها و کامپوننت‌های مشترک پروژه — منبع واحد برای ساخت هر صفحه‌ی جدید."
          align="start"
        />

        {/* ─── Colors ─────────────────────────────────────── */}
        <section className={styles.section} id="colors">
          <h2 className={styles.sectionHeading}>Colors</h2>
          <div className={styles.colorGrid}>
            {COLOR_TOKENS.map((c) => (
              <div key={c.token} className={styles.colorItem}>
                <div className={styles.swatch} style={{ background: `var(${c.token})` }} />
                <span className={styles.colorName}>{c.name}</span>
                <code className={styles.tokenName}>{c.token}</code>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Typography ─────────────────────────────────── */}
        <section className={styles.section} id="typography">
          <h2 className={styles.sectionHeading}>Typography</h2>
          <div className={styles.typeList}>
            {TYPE_TOKENS.map((t) => (
              <div key={t.role} className={styles.typeRow}>
                <div className={styles.typeMeta}>
                  <Badge variant="neutral" size="sm">{t.role}</Badge>
                  <code className={styles.tokenName}>{t.textToken}</code>
                </div>
                <p
                  className={styles.typeSample}
                  style={{ fontSize: `var(${t.textToken})`, fontWeight: `var(${t.weightToken})` }}
                >
                  {t.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Spacing ────────────────────────────────────── */}
        <section className={styles.section} id="spacing">
          <h2 className={styles.sectionHeading}>Spacing</h2>
          <div className={styles.spaceList}>
            {SPACE_TOKENS.map((s) => (
              <div key={s.token} className={styles.spaceRow}>
                <code className={styles.tokenName}>{s.token}</code>
                <div className={styles.spaceBar} style={{ width: `var(${s.token})` }} />
                <span className={styles.spacePx}>{s.px}px</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Components ─────────────────────────────────── */}
        <section className={styles.section} id="components">
          <h2 className={styles.sectionHeading}>Components</h2>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Button</h3>
            <p className={styles.componentPath}>@/components/shared/Button/Button</p>
            <div className={styles.demoRow}>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className={styles.demoRow}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Badge</h3>
            <p className={styles.componentPath}>@/components/shared/Badge/Badge</p>
            <div className={styles.demoRow}>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Card</h3>
            <p className={styles.componentPath}>@/components/shared/Card/Card</p>
            <div className={styles.cardDemoGrid}>
              <Card variant="default" hoverable>
                <p className={styles.cardDemoText}>Default + hoverable</p>
              </Card>
              <Card variant="elevated">
                <p className={styles.cardDemoText}>Elevated</p>
              </Card>
              <Card variant="outline">
                <p className={styles.cardDemoText}>Outline</p>
              </Card>
            </div>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Input / Select</h3>
            <p className={styles.componentPath}>@/components/shared/FormField/FormField, FormSelect</p>
            <div className={styles.formDemoGrid}>
              <FormField label="نام" placeholder="نام خود را وارد کنید" />
              <FormSelect
                label="دسته‌بندی"
                placeholder="انتخاب کنید"
                options={[{ value: 'a', label: 'گزینه ۱' }, { value: 'b', label: 'گزینه ۲' }]}
              />
            </div>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Modal</h3>
            <p className={styles.componentPath}>@/components/shared/Modal/Modal</p>
            <div className={styles.demoRow}>
              <Button variant="secondary" onClick={() => setModalOpen(true)}>باز کردن Modal</Button>
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="نمونه Modal">
              <p>این یک نمونه محتوای Modal است که از تم و توکن‌های پروژه استفاده می‌کند.</p>
            </Modal>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Tabs</h3>
            <p className={styles.componentPath}>@/components/shared/Tabs/Tabs</p>
            <Tabs tabs={[{ id: 'a', label: 'تب اول' }, { id: 'b', label: 'تب دوم' }]} defaultTab="a">
              {(active) => (
                <p className={styles.cardDemoText}>
                  {active === 'a' ? 'محتوای تب اول' : 'محتوای تب دوم'}
                </p>
              )}
            </Tabs>
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Accordion</h3>
            <p className={styles.componentPath}>@/components/shared/Accordion/Accordion</p>
            <Accordion items={ACCORDION_ITEMS} />
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Table</h3>
            <p className={styles.componentPath}>@/components/shared/Table/Table</p>
            <Table columns={TABLE_COLUMNS} rows={TABLE_ROWS} />
          </div>

          <div className={styles.componentBlock}>
            <h3 className={styles.componentTitle}>Breadcrumb</h3>
            <p className={styles.componentPath}>@/components/shared/Breadcrumb/Breadcrumb</p>
            <Breadcrumb items={[{ label: 'خانه', href: '/' }, { label: 'محصولات', href: '/products' }, { label: 'دریچه خطی', href: '#' }]} />
          </div>
        </section>
      </Container>
    </main>
  );
}
