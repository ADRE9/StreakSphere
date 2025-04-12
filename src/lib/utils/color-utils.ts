import chroma from 'chroma-js';

/**
 * Generates an array of color shades from a base color by varying saturation
 * @param hex - The base hex color code (e.g., "#000000")
 * @param numberOfShades - Number of shades to generate (excluding the base color)
 * @returns Array of hex color codes sorted from most saturated to least saturated
 */
export function generateColorShades(
  hex: string,
  numberOfShades: number
): string[] {
  // Create a color scale from the base color to its desaturated version
  const light = chroma(hex).brighten(4).hex();
  const base = chroma(hex).brighten(2).hex();
  const dark = chroma(hex).hex();

  // Generate evenly spaced colors along the scale
  return chroma
    .scale([light, base, dark])
    .mode('lab') // Better perceptual scaling
    .colors(numberOfShades + 1);
}
