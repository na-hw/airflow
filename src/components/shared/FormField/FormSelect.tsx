import Field, { fieldErrorId } from "@/components/shared/Field/Field";
import Icon from "@/components/shared/Icon/Icon";
import { useId } from "react";
import styles from "./formField.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export default function FormSelect({
  label,
  error,
  required,
  options,
  placeholder,
  className,
  defaultValue = "",
  id: idProp,
  ref,
  ...props
}: FormSelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <Field id={id} label={label} error={error} required={required}>
      <div className={styles.selectWrapper}>
        <select
          ref={ref}
          defaultValue={defaultValue}
          className={[styles.input, styles.select, error && styles.inputError, className]
            .filter(Boolean)
            .join(" ")}
          {...props}
          id={id}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? fieldErrorId(id) : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} className={styles.selectIcon} />
      </div>
    </Field>
  );
}
