export const buildURLQuery = (obj) => {
  const o = Object.fromEntries(Object.entries(obj).filter(([key]) => obj[key] !== ""));
  return Object.entries(o)
    .map(([key, value]) => [encodeURIComponent(key), encodeURIComponent(value)].join("="))
    .join("&");
};
