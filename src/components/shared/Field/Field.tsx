import styles from "./Field.module.css";

interface FieldProps {
  /** Id of the control this field labels; the error message id derives from it. */
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const fieldErrorId = (id: string) => `${id}-error`;

export default function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span id={fieldErrorId(id)} className={styles.fieldError}>
          {error}
        </span>
      )}
    </div>
  );
}
