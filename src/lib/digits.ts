const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Converts Persian digits to ASCII, e.g. for `tel:` links and number parsing. */
export function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
}

/** A dialable `tel:` href: ASCII digits only, separators removed. */
export function toTelHref(phone: string): string {
  return `tel:${toAsciiDigits(phone).replace(/[^\d+]/g, "")}`;
}
