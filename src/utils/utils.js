/* eslint-disable no-bitwise */
export function blackOrWhiteTick(color) {
  const newColor = color.replace(/^(rgb|rgba)\(/, '')
    .replace(/\)$/, '')
    .replace(/\s/g, '')
    .split(',');
  const r = newColor[0];
  const g = newColor[1];
  const b = newColor[2];
  return ((r * 299) + (g * 587) + (b * 114)) / 1000 > 130 ? '#000000' : '#ffffff';
}

export function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgb(${r}, ${g}, ${b})`;
}
