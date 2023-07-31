export function formatDate(isoDateString: Date, locale = "ja-JP") {
  const date = new Date(isoDateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  });
}
