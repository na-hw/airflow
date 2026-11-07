"use client";

import Button from "@/components/shared/Button/Button";
import ContactDetail from "@/components/shared/ContactDetail/ContactDetail";
import Container from "@/components/shared/Container/Container";
import FormField from "@/components/shared/FormField/FormField";
import FormSelect from "@/components/shared/FormField/FormSelect";
import Icon from "@/components/shared/Icon/Icon";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import {
  CONTACT_LIMITS,
  getContactSchema,
  type ContactFormValues as FormValues,
} from "@/lib/contactSchema";
import { useLanguage } from "@/context/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";

type ContactField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
};

interface ContactFormProps {
  data: {
    section: { tag: string; title: string; subtitle: string };
    contactDetails: { icon: string; label: string; value: string }[];
    fields: ContactField[];
    projectTypes: string[];
    submit: {
      label: string;
      loading: string;
      success: string;
      error: string;
      newMessage: string;
    };
  };
}

export default function ContactForm({ data }: ContactFormProps) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(getContactSchema(lang)),
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const f = (id: string) => data.fields.find((field) => field.id === id)!;
  const projectOptions = data.projectTypes.map((pt) => ({
    value: pt,
    label: pt,
  }));

  return (
    <section
      className={styles.section}
      ref={ref}
      id="contact"
      aria-label={data.section.title}
    >
      <div className={styles.bg} aria-hidden>
        <div className={styles.bgGrad} />
      </div>
      <Container>
        <div className={styles.wrapper}>
          {/* Left: Info */}
          <motion.div
            className={styles.infoCol}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle
              title={data.section.title}
              subtitle={data.section.subtitle}
              align="start"
            />
            <div className={styles.contactDetails}>
              {data.contactDetails.map((detail) => (
                <ContactDetail key={detail.icon} {...detail} />
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.formCard}>
              {status === "success" ? (
                <div className={styles.successMsg} role="status">
                  <Icon
                    name="check-circle"
                    size={56}
                    style={{ color: "var(--color-success)" }}
                  />
                  <p>{data.submit.success}</p>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={() => setStatus("idle")}
                  >
                    {data.submit.newMessage}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className={styles.form}
                >
                  <div className={styles.row}>
                    <FormField
                      label={f("name").label}
                      error={errors.name?.message}
                      required
                      type="text"
                      autoComplete="name"
                      maxLength={CONTACT_LIMITS.name}
                      placeholder={f("name").placeholder}
                      {...register("name")}
                    />
                    <FormField
                      label={f("email").label}
                      error={errors.email?.message}
                      required
                      type="email"
                      autoComplete="email"
                      maxLength={CONTACT_LIMITS.email}
                      placeholder={f("email").placeholder}
                      {...register("email")}
                    />
                  </div>
                  <div className={styles.row}>
                    <FormField
                      label={f("phone").label}
                      error={errors.phone?.message}
                      required
                      type="tel"
                      autoComplete="tel"
                      maxLength={CONTACT_LIMITS.phone}
                      placeholder={f("phone").placeholder}
                      {...register("phone")}
                    />
                    <FormField
                      label={f("company").label}
                      error={errors.company?.message}
                      type="text"
                      autoComplete="organization"
                      maxLength={CONTACT_LIMITS.company}
                      placeholder={f("company").placeholder}
                      {...register("company")}
                    />
                  </div>
                  <FormSelect
                    label={f("projectType").label}
                    error={errors.projectType?.message}
                    required
                    placeholder={f("projectType").placeholder}
                    options={projectOptions}
                    {...register("projectType")}
                  />
                  <FormField
                    multiline
                    label={f("message").label}
                    error={errors.message?.message}
                    required
                    placeholder={f("message").placeholder}
                    rows={4}
                    maxLength={CONTACT_LIMITS.message}
                    {...register("message")}
                  />
                  {status === "error" && (
                    <p className={styles.errorMsg} role="alert">
                      {data.submit.error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={status === "loading"}
                  >
                    {status === "loading"
                      ? data.submit.loading
                      : data.submit.label}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
