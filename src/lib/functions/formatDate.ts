export function formatDate(
  isoDateString: Date | string | null,
  format: "long" | "yyyy-mm-dd" = "long",
  locale = "ja-JP"
): string {
  if (!isoDateString) return "";

  const date = new Date(isoDateString);

  if (format === "long") {
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo",
    });
  } else {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
}
