import type { ReactNode } from 'react';
import styles from './Table.module.css';

export interface TableColumn {
  key: string;
  label: string;
  align?: 'start' | 'center' | 'end';
}

interface TableProps {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  className?: string;
}

const ALIGN_CLASS: Record<NonNullable<TableColumn['align']>, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
};

export default function Table({ columns, rows, className = '' }: TableProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={ALIGN_CLASS[col.align ?? 'start']}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} className={ALIGN_CLASS[col.align ?? 'start']}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
