/**
 * Lightweight value helpers shared across components.
 */

/** True for null, undefined, empty strings/arrays/objects and NaN numbers. */
export function empty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'boolean') return false;
  if (typeof value === 'number') return Number.isNaN(value);
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value as object).length === 0;
  return false;
}

/** Converts newlines to <br /> tags. */
export function nl2br(value: string): string {
  if (typeof value !== 'string') return '';
  return value.replace(/(\r\n|\n\r|\r|\n)/g, '<br />');
}

/** Inclusive numeric range check. */
export function numberBetween(value: unknown, min: number, max: number): boolean {
  const num = Number(value);
  return !Number.isNaN(num) && num >= min && num <= max;
}
