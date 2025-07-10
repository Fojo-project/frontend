// utils/textFormatter.ts

export function formatText(
  text: string,
  options?: {
    prefix?: string;
    suffix?: string;
    limitWords?: number;
    limitChars?: number;
  }
) {
  if (!text) return '';

  let formatted = text.trim();

  formatted =
    formatted.charAt(0).toUpperCase() + formatted.slice(1).toLowerCase();
  if (options?.limitWords) {
    const words = formatted.split(' ').slice(0, options.limitWords);
    formatted = words.join(' ');
  }

  if (options?.limitChars) {
    formatted = formatted.slice(0, options.limitChars);
  }

  const prefix = options?.prefix ?? '';
  const suffix = options?.suffix ?? '';

  return `${prefix}${formatted}${suffix}`;
}
