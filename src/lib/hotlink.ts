/** Extra hosts that may embed our images besides the site's own host. */
const EXTRA_ALLOWED_HOSTS = ["airflowsystem.ir", "www.airflowsystem.ir"];

/**
 * Decides whether an image request may be served, based on its Referer.
 * Requests from the page's own host are always allowed, so every deployment
 * (production, Vercel previews, custom domains) works without maintaining a
 * host list. Missing or malformed referers are allowed too: direct visits,
 * privacy tools and server-side fetches (e.g. the image optimizer) send none.
 */
export function isAllowedImageReferer(referer: string | null, requestHost: string): boolean {
  if (!referer) return true;

  let refererHost: string;
  try {
    refererHost = new URL(referer).hostname;
  } catch {
    return true;
  }

  return refererHost === requestHost || EXTRA_ALLOWED_HOSTS.includes(refererHost);
}
