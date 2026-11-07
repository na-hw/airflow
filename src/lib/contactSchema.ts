import { z } from 'zod';
import type { Lang } from '@/context/LanguageContext';

type MessageKey = 'name' | 'email' | 'phone' | 'projectType' | 'message' | 'tooLong';

const messages: Record<Lang, Record<MessageKey, string>> = {
  fa: {
    name:        'نام باید حداقل ۲ کاراکتر باشد',
    email:       'ایمیل معتبر نیست',
    phone:       'شماره تلفن معتبر نیست',
    projectType: 'لطفاً نوع پروژه را انتخاب کنید',
    message:     'پیام باید حداقل ۱۰ کاراکتر باشد',
    tooLong:     'متن وارد شده بیش از حد طولانی است',
  },
  en: {
    name:        'Name must be at least 2 characters',
    email:       'Invalid email address',
    phone:       'Invalid phone number',
    projectType: 'Please select a project type',
    message:     'Message must be at least 10 characters',
    tooLong:     'This entry is too long',
  },
};

/** Upper bounds keep the outgoing email small and block payload abuse. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  company: 120,
  projectType: 100,
  message: 5000,
} as const;

export function getContactSchema(lang: Lang) {
  const m = messages[lang];
  return z.object({
    name:        z.string().trim().min(2, m.name).max(CONTACT_LIMITS.name, m.tooLong),
    email:       z.email(m.email).max(CONTACT_LIMITS.email, m.tooLong),
    phone:       z
      .string()
      .trim()
      .min(10, m.phone)
      .max(CONTACT_LIMITS.phone, m.phone)
      .regex(/^[\d\s\-+()۰-۹]+$/, m.phone),
    company:     z.string().trim().max(CONTACT_LIMITS.company, m.tooLong).optional(),
    projectType: z.string().trim().min(1, m.projectType).max(CONTACT_LIMITS.projectType, m.tooLong),
    message:     z.string().trim().min(10, m.message).max(CONTACT_LIMITS.message, m.tooLong),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof getContactSchema>>;
