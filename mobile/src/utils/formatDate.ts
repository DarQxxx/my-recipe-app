export function formatDate(rawDate: string): string {
  const date = new Date(rawDate);
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
