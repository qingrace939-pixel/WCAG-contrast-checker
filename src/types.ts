/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface ContrastResult {
  ratio: number;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
  nonTextAA: boolean; // WCAG 2.1 Success Criterion 1.4.11
}

export interface ColorSuggestion {
  hex: string;
  ratio: number;
  label: string;
  type: 'foreground' | 'background';
  passed: 'AA' | 'AAA';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  englishQuestion?: string;
  englishAnswer?: string;
}
