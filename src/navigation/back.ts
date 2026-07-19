import { Href, router } from 'expo-router';

/** Returns through history when possible, or opens a stable parent for direct/deep links. */
export function backOrReplace(fallback: Href) {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
