export const normalizeValue = (value) => {
  return value === null || value === "null" || value === '' || value === undefined || value === "undefined" ? "" : value;
};