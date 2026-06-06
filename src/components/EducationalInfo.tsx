/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Info, Percent, Settings } from 'lucide-react';

export default function EducationalInfo() {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-xl p-8 border border-slate-800" id="educational-info-panel">
      {/* Title block */}
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-800">
        <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            WCAG 2.1 Color Contrast: Standards & Scientific Foundations
          </h2>
          <p className="text-xs text-slate-400">
            A comprehensive reference on U.S. Section 508, international accessibility standards, and underlying physics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
        {/* WCAG Standard Clauses */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Info className="w-4 h-4" /> WCAG 2.1 Success Criteria & Regulatory Standard Clauses
          </h3>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">
                Success Criterion 1.4.3: Contrast (Minimum) — Level AA
              </span>
              <p>
                The visual presentation of text and images of text must have a contrast ratio of at least{' '}
                <strong className="text-white">4.5:1</strong>, except for the following:
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-450">
                <li>
                  <strong className="text-slate-200">Large Text:</strong> Large-scale text (at least 18pt/24px or 14pt/18.66px bold) must have a contrast ratio of at least <strong className="text-white">3:1</strong>.
                </li>
                <li>
                  <strong className="text-slate-200">Incidental Text:</strong> Text or images of text that are part of an inactive user interface component, pure decoration, or part of a picture do not have contrast requirements.
                </li>
                <li>
                  <strong className="text-slate-200">Logotypes:</strong> Text that is part of a logo or brand name has no minimum contrast requirement.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">
                Success Criterion 1.4.6: Contrast (Enhanced) — Level AAA
              </span>
              <p>
                The visual presentation of text and images of text has an enhanced contrast ratio of at least{' '}
                <strong className="text-white">7:1</strong>, except for:
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-450">
                <li>
                  <strong className="text-slate-200">Large Text (AAA):</strong> Large-scale text must have a contrast ratio of at least <strong className="text-white">4.5:1</strong>.
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-800">
              <span className="font-bold text-slate-200 block mb-1">
                Success Criterion 1.4.11: Non-Text Contrast — Level AA (WCAG 2.1 Update)
              </span>
              <p>
                The visual presentation of elements other than text must have a contrast ratio of at least{' '}
                <strong className="text-white">3:1</strong> against adjacent colors. This applies to:
              </p>
              <ul className="list-disc pl-4 mt-2 space-y-1 text-slate-450">
                <li>
                  <strong className="text-slate-200">User Interface Components:</strong> Visual information required to identify active user interface components and states (e.g., input borders, select dropdown controls, buttons).
                </li>
                <li>
                  <strong className="text-slate-200">Graphical Objects:</strong> Parts of graphics required to understand the content (e.g., icons, pie chart slices, lines in a graph).
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-indigo-500 pl-3 py-1 text-xxs text-slate-400 italic">
              <strong>U.S. Rehabilitation Act Section 508:</strong> U.S. federal procurement requirements incorporate WCAG 2.0 Level AA to govern and regulate visual readability in government, educational, and public websites.
            </div>
          </div>
        </div>

        {/* Physics & Scientific Formulation */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
            <Percent className="w-4 h-4" /> Mathematical Formula & Human Perception Physics
          </h3>

          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <p>
              The human eye does not perceive all light wavelengths with equal brightness. Humans are highly sensitive to green, moderately sensitive to red, and significantly less sensitive to blue.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono space-y-3 shadow-inner">
              <span className="text-indigo-400 block font-bold text-xxs tracking-wider uppercase">1. Relative Luminance Formula</span>
              <div className="text-xs text-white bg-slate-900 p-2.5 rounded-sm border border-slate-800/80 text-center">
                L = 0.2126 * R<sub>linear</sub> + 0.7152 * G<sub>linear</sub> + 0.0722 * B<sub>linear</sub>
              </div>
              <p className="text-xxs text-slate-400 mt-1 leading-normal text-justify">
                Note the heavy weighting coefficient of <strong className="text-slate-200">0.7152</strong> applied to Green and a mere <strong className="text-slate-200">0.0722</strong> to Blue. This conforms to human spectral sensitivity (photopic vision) standardized by the CIE.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono space-y-3 shadow-inner">
              <span className="text-indigo-400 block font-bold text-xxs tracking-wider uppercase">2. SRGB Linearization Technique</span>
              <p className="text-xxs text-slate-400 leading-normal">
                Standard sRGB channel values (ranging from 0 to 255) must be converted to non-linear fractions and linearized using the following formula:
              </p>
              <div className="text-xxs text-white bg-slate-900 p-2.5 rounded-sm border border-slate-800 text-left space-y-1">
                <div>For a color channel <strong className="text-slate-300">C' = C / 255</strong>:</div>
                <div className="pl-3">If C' &le; 0.03928:</div>
                <div className="pl-6 text-indigo-300">C<sub>linear</sub> = C' / 12.92</div>
                <div className="pl-3">Else:</div>
                <div className="pl-6 text-indigo-300">C<sub>linear</sub> = ((C' + 0.055) / 1.055)<sup>2.4</sup></div>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono space-y-3 shadow-inner">
              <span className="text-indigo-400 block font-bold text-xxs tracking-wider uppercase">3. Contrast Ratio Comparison</span>
              <div className="text-xs text-white bg-slate-900 p-2.5 rounded-sm border border-slate-800/80 text-center">
                Contrast Ratio = (L<sub>1</sub> + 0.05) / (L<sub>2</sub> + 0.05)
              </div>
              <p className="text-xxs text-slate-400 mt-1 leading-normal text-justify">
                Where <strong className="text-slate-200">L<sub>1</sub></strong> is the relative luminance of the lighter color, and <strong className="text-slate-200">L<sub>2</sub></strong> is the relative luminance of the darker color. The constant offset <strong className="text-slate-200">0.05</strong> simulates ambient light striking the display screen, preventing division by zero.
              </p>
              <p className="text-xxs text-indigo-400 leading-snug">
                Ratio ranges strictly between <strong className="text-white">1.0 : 1</strong> (no contrast, same color) and <strong className="text-white">21.0 : 1</strong> (maximum contrast, pure black on pure white).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
