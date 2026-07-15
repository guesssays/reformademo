// lib/avif.js
export function asAvif(src) {
  if (!src) return null;
  const isRaster = /\.(jpe?g|png)$/i.test(src);
  if (!isRaster) return null;              // svg/webp/etc — не трогаем
  return src
    .replace(/\/images\//, "/images-avif/")
    .replace(/\.(jpe?g|png)$/i, ".avif");
}
