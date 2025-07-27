import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLOR_PALETTE = [
  "bg-red-100 text-red-800",
  "bg-blue-100 text-blue-800",
  "bg-green-100 text-green-800",
  "bg-yellow-100 text-yellow-800",
  "bg-indigo-100 text-indigo-800",
  "bg-purple-100 text-purple-800",
  "bg-pink-100 text-pink-800",
];

/**
 * Generates a consistent color class from a predefined palette based on the input string.
 * @param category - The string to hash (e.g., category name).
 * @returns A string of Tailwind CSS classes for background and text color.
 */
export function getCategoryColor(category: string): string {
  // Simple hash function to get a number from the string
  const hashCode = category
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use modulo to pick a color from the palette
  const colorIndex = hashCode % COLOR_PALETTE.length;

  return COLOR_PALETTE[colorIndex];
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD", // Assumed base currency of returned data
  });
}
