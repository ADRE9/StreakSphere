import Color from 'color';

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
  const baseColor = Color(hex);
  const shades: string[] = [];

  // Generate shades with varying lightness
  for (let i = 0; i <= numberOfShades; i++) {
    // Calculate lightness value (0 to 100)
    // We start from 100 (lightest) and go down to 0 (darkest)
    const lightness = 100 - i * (100 / numberOfShades);
    const shade = baseColor.lightness(lightness);
    shades.push(shade.hex());
  }

  return shades;
}
