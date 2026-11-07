import Field, { fieldErrorId } from "@/components/shared/Field/Field";
import { useId } from "react";
import styles from "./formField.module.css";

type FormFieldProps = {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  ref?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "rows">;

export default function FormField({
  label,
  error,
  required,
  multiline = false,
  rows,
  className,
  ref,
  id: idProp,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const inputClass = [styles.input, error && styles.inputError, className]
    .filter(Boolean)
    .join(" ");

  const a11yProps = {
    id,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? fieldErrorId(id) : undefined,
  };

  return (
    <Field id={id} label={label} error={error} required={required}>
      {multiline ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={`${inputClass} ${styles.textarea}`}
          rows={rows}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          {...a11yProps}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={inputClass}
          {...props}
          {...a11yProps}
        />
      )}
    </Field>
  );
}
