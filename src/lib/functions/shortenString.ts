export function shortenString(str: string, num = 15) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}
