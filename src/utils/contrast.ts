/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RGBA, ContrastResult, ColorSuggestion } from '../types';

// Convert a hex string to RGB
export function hexToRgb(hex: string): RGBA | null {
  // Remove starting '#' if any
  const normalizedHex = hex.trim().replace(/^#/, '');

  if (normalizedHex.length === 3) {
    const r = parseInt(normalizedHex[0] + normalizedHex[0], 16);
    const g = parseInt(normalizedHex[1] + normalizedHex[1], 16);
    const b = parseInt(normalizedHex[2] + normalizedHex[2], 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }

  if (normalizedHex.length === 6) {
    const r = parseInt(normalizedHex.substring(0, 2), 16);
    const g = parseInt(normalizedHex.substring(2, 4), 16);
    const b = parseInt(normalizedHex.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }

  return null;
}

// Convert RGB to HEX string
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const componentToHex = (c: number) => {
    const hex = clamp(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

// Convert HSL back to RGB
export function hslToRgb(h: number, s: number, l: number): RGBA {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = l;
  let g = l;
  let b = l;

  if (s !== 0) {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

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

// Compute the relative luminance of an RGB color
// L = 0.2126 * R + 0.7152 * G + 0.0722 * B
// where R, G, B are calculated using SRGB linearisation formulas.
export function getRelativeLuminance(rgb: RGBA): number {
  const rs = rgb.r / 255;
  const gs = rgb.g / 255;
  const bs = rgb.b / 255;

  const rLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

// Compute contrast ratio between two colors
export function getContrastRatio(color1: RGBA, color2: RGBA): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  // Formula: (L1 + 0.05) / (L2 + 0.05)
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

// Checks the standard guidelines for normal/large text under AA/AAA standards
export function verifyContrast(foreground: string, background: string): ContrastResult {
  const rgbFg = hexToRgb(foreground);
  const rgbBg = hexToRgb(background);

  if (!rgbFg || !rgbBg) {
    return {
      ratio: 1,
      normalTextAA: false,
      normalTextAAA: false,
      largeTextAA: false,
      largeTextAAA: false,
      nonTextAA: false,
    };
  }

  const ratio = getContrastRatio(rgbFg, rgbBg);

  return {
    ratio,
    normalTextAA: ratio >= 4.5,
    normalTextAAA: ratio >= 7.0,
    largeTextAA: ratio >= 3.0,
    largeTextAAA: ratio >= 4.5,
    nonTextAA: ratio >= 3.0,
  };
}

// Suggest colors that pass AA or AAA standards
// It generates alternative lighter/darker variations of the foreground color based on HSL.
export function suggestColors(foreground: string, background: string): ColorSuggestion[] {
  const rgbFg = hexToRgb(foreground);
  const rgbBg = hexToRgb(background);
  const suggestions: ColorSuggestion[] = [];

  if (!rgbFg || !rgbBg) return suggestions;

  const bgLuminance = getRelativeLuminance(rgbBg);
  const isBgLight = bgLuminance > 0.5;

  const fgHsl = rgbToHsl(rgbFg.r, rgbFg.g, rgbFg.b);
  const bgHsl = rgbToHsl(rgbBg.r, rgbBg.g, rgbBg.b);

  // 1. Suggest Foreground Modifiers (adjust lightness)
  // We'll search for the closest lightness coordinate that meets WCAG standards.
  // Standard target contrast ratios: AA (4.5) and AAA (7.0).
  const targets = [
    { target: 4.5, label: 'AA Standard', passKey: 'AA' as const },
    { target: 7.0, label: 'AAA Standard', passKey: 'AAA' as const },
  ];

  targets.forEach(({ target, label, passKey }) => {
    let bestFgL: number | null = null;
    let minDistance = 101;

    // Scan lightnesses
    for (let l = 0; l <= 100; l++) {
      const candidateRgb = hslToRgb(fgHsl.h, fgHsl.s, l);
      const ratio = getContrastRatio(candidateRgb, rgbBg);

      if (ratio >= target) {
        const dist = Math.abs(l - fgHsl.l);
        // We prefer a color close to the original Hue and Saturation, only adjusting lightness.
        // We also want to push it in the right direction:
        // if BG is light, we want FG to be darker (lower lightness) to get more contrast.
        // if BG is dark, we want FG to be lighter (higher lightness).
        if (isBgLight && l > fgHsl.l) continue; // Skip lighter alternatives if they make contrast worse or are counterproductive
        if (!isBgLight && l < fgHsl.l) continue; // Skip darker alternatives if they make contrast worse

        if (dist < minDistance) {
          minDistance = dist;
          bestFgL = l;
        }
      }
    }

    if (bestFgL !== null) {
      const finalRgb = hslToRgb(fgHsl.h, fgHsl.s, bestFgL);
      const finalRatio = getContrastRatio(finalRgb, rgbBg);
      const hex = rgbToHex(finalRgb.r, finalRgb.g, finalRgb.b);
      suggestions.push({
        hex,
        ratio: finalRatio,
        label: `${label} (Text Color)`,
        type: 'foreground',
        passed: passKey,
      });
    }
  });

  // 2. Suggest Background Modifiers (adjust lightness of background, keep original text)
  targets.forEach(({ target, label, passKey }) => {
    let bestBgL: number | null = null;
    let minDistance = 101;

    for (let l = 0; l <= 100; l++) {
      const candidateBgRgb = hslToRgb(bgHsl.h, bgHsl.s, l);
      const ratio = getContrastRatio(rgbFg, candidateBgRgb);

      if (ratio >= target) {
        const dist = Math.abs(l - bgHsl.l);
        // If FG is light, we need BG to be darker
        // If FG is dark, we need BG to be lighter
        const fgLuminance = getRelativeLuminance(rgbFg);
        const isFgLight = fgLuminance > 0.5;

        if (isFgLight && l > bgHsl.l) continue;
        if (!isFgLight && l < bgHsl.l) continue;

        if (dist < minDistance) {
          minDistance = dist;
          bestBgL = l;
        }
      }
    }

    if (bestBgL !== null) {
      const finalBgRgb = hslToRgb(bgHsl.h, bgHsl.s, bestBgL);
      const finalRatio = getContrastRatio(rgbFg, finalBgRgb);
      const hex = rgbToHex(finalBgRgb.r, finalBgRgb.g, finalBgRgb.b);
      suggestions.push({
        hex,
        ratio: finalRatio,
        label: `${label} (Background)`,
        type: 'background',
        passed: passKey,
      });
    }
  });

  return suggestions;
}
