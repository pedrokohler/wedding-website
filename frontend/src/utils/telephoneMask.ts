export const telephoneMask = (value: string) =>
  value
    .replace(/[^0-9]/g, "")
    .replace(/([0-9]{2})?([987]{1})?([0-9]{4})?-?([0-9]{4})?/, "($1) $2$3-$4")
    .replace(/\s$/, "")
    .replace(/-$/, "")
    .replace(/\)\s$/, "")
    .replace(/\($/, "")
    .replace(/\s-/, "")
    .replace(/\(\)/, "")
    .slice(0, 15);
