import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS class names with conflict resolution.
 * Accepts strings, arrays, objects and falsy values.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
