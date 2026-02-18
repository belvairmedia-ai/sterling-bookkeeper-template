/**
 * Preview Guard — expiry helpers for auto-generated preview sites.
 *
 * Preview sites are generated as outreach tools and should not remain
 * accessible indefinitely. The content.json file can include a
 * `preview_expires_at` field (ISO 8601 string) that controls visibility.
 *
 * The database-level counterpart lives in migration 015_suppression_list.sql
 * (expire_preview_sites RPC), which marks rows expired in bulk via cron.
 * This module provides the client-side / SSR check for a single site.
 */

import type { ContentData } from "@/types/content";

/**
 * A minimal extension of ContentData that allows an optional preview
 * expiry timestamp. We use an intersection type so the rest of the
 * ContentData interface stays untouched.
 */
export type PreviewContentData = ContentData & {
  /** ISO 8601 timestamp after which this preview should be treated as expired. */
  preview_expires_at?: string | null;
  /** Whether this is a preview site at all (default: true for generated sites). */
  is_preview?: boolean;
};

/**
 * Returns true if the preview site has passed its expiry date.
 *
 * Rules:
 * - If `content.preview_expires_at` is absent or null → not expired.
 * - If the timestamp is in the past (relative to call time) → expired.
 * - Invalid / unparseable dates are treated as not expired (fail-open).
 *
 * @param content - The parsed content.json object.
 * @returns boolean — true means the site is past its expiry date.
 */
export function isPreviewExpired(content: PreviewContentData): boolean {
  if (!content.preview_expires_at) return false;

  const expiry = new Date(content.preview_expires_at);

  // Guard against unparseable dates (Invalid Date has NaN time)
  if (isNaN(expiry.getTime())) return false;

  return new Date() > expiry;
}

/**
 * Returns the number of days remaining before the preview expires.
 * Returns null if no expiry is set.
 * Returns 0 (or negative) if already expired.
 *
 * @param content - The parsed content.json object.
 */
export function daysUntilExpiry(content: PreviewContentData): number | null {
  if (!content.preview_expires_at) return null;

  const expiry = new Date(content.preview_expires_at);
  if (isNaN(expiry.getTime())) return null;

  const msRemaining = expiry.getTime() - Date.now();
  return Math.floor(msRemaining / (1000 * 60 * 60 * 24));
}
