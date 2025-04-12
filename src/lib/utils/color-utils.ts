/**
 * Converts a hex color to HSL
 * @param hex - The hex color code (e.g., "#000000")
 * @returns An object with h, s, l values
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace('#', '');

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find min and max values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to hex color
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex color code
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Generates an array of color shades from a base color
 * @param hex - The base hex color code (e.g., "#000000")
 * @param numberOfShades - Number of shades to generate (excluding the base color)
 * @returns Array of hex color codes sorted from lightest to darkest
 */
export function generateColorShades(
  hex: string,
  numberOfShades: number
): string[] {
  const { h, s } = hexToHSL(hex);
  const shades: string[] = [];

  // Generate shades with varying lightness
  for (let i = 0; i <= numberOfShades; i++) {
    // Calculate lightness value (0 to 100)
    // We start from 100 (lightest) and go down to 0 (darkest)
    const lightness = 100 - i * (100 / numberOfShades);
    shades.push(hslToHex(h, s, lightness));
  }

  return shades;
}
