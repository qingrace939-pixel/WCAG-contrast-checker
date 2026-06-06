/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Eye, ShieldAlert, Smartphone, Heading, SquarePlay, Sparkles } from 'lucide-react';

interface ContrastPreviewProps {
  foreground: string;
  background: string;
  ratio: number;
}

type VisionType = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

const VISION_PRESETS: { value: VisionType; label: string; desc: string }[] = [
  { value: 'normal', label: 'Ordinary Vision', desc: 'True representation of specified RGB colors.' },
  { value: 'protanopia', label: 'Protanopia', desc: 'Red-blind. Difficult to distinguish red/green.' },
  { value: 'deuteranopia', label: 'Deuteranopia', desc: 'Green-blind. Most common color vision deficiency.' },
  { value: 'tritanopia', label: 'Tritanopia', desc: 'Blue-blind. Rare inability to perceive blue pigments.' },
  { value: 'achromatopsia', label: 'Achromatopsia', desc: 'Total color blindness. Full grayscale view.' },
];

export default function ContrastPreview({ foreground, background, ratio }: ContrastPreviewProps) {
  const [selectedVision, setSelectedVision] = useState<VisionType>('normal');

  const getFilterStyle = (): string => {
    switch (selectedVision) {
      case 'protanopia':
        return 'url(#protanopia)';
      case 'deuteranopia':
        return 'url(#deuteranopia)';
      case 'tritanopia':
        return 'url(#tritanopia)';
      case 'achromatopsia':
        return 'url(#achromatopsia)';
      default:
        return 'none';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 flex flex-col h-full gap-5" id="contrast-preview-panel">
      {/* Hidden SVG Filters for color blindness emulation */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix
              type="matrix"
              values="0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-slate-550" />
          Visual Rendering Preview
        </h2>

        {/* Emulate drop down */}
        <div className="flex items-center space-x-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> Simulation:
          </span>
          <select
            value={selectedVision}
            onChange={(e) => setSelectedVision(e.target.value as VisionType)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-slate-705 font-semibold focus:ring-1 focus:ring-indigo-550 cursor-pointer"
          >
            {VISION_PRESETS.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedVision !== 'normal' && (
        <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xxs text-amber-850 leading-relaxed font-sans">
          <strong>{VISION_PRESETS.find((v) => v.value === selectedVision)?.label} active:</strong>{' '}
          {VISION_PRESETS.find((v) => v.value === selectedVision)?.desc} Recommended for strict accessibility testing.
        </div>
      )}

      {/* Main Preview Container with CSS Filter applied */}
      <div
        className="flex-1 rounded-2xl p-6 border border-slate-100/80 transition-all shadow-inner relative flex flex-col gap-5 min-h-[350px]"
        style={{
          backgroundColor: background,
          color: foreground,
          filter: getFilterStyle(),
        }}
        id="contrast-preview-workspace"
      >
        {/* Component 1: Large Heading Element */}
        <div className="space-y-1.5Packed">
          <div className="flex items-center space-x-1.5 opacity-75">
            <Heading className="w-3.5 h-3.5" />
            <span className="text-[9px] font-extrabold uppercase tracking-widest">Display Headline Level 1</span>
          </div>
          <h3 className="text-2xl font-black tracking-tight leading-tight">
            Crafting Highly Accessible Graphical Experiences
          </h3>
          <p className="text-xs opacity-90 leading-relaxed max-w-xl">
            This paragraph demonstrates small general text (at normal weight). It uses the computed colors to verify compliant reading levels. Keep text legible!
          </p>
        </div>

        {/* Component 2: Inline CTA Buttons */}
        <div className="space-y-2">
          <span className="text-[9px] font-extrabold uppercase tracking-widest opacity-75 block flex items-center gap-1">
            <SquarePlay className="w-3 h-3" /> Actions & Elements
          </span>
          <div className="flex flex-wrap gap-2.5">
            {/* Styled with Foreground as background, and Background as text */}
            <button
              className="px-4 py-2 rounded-lg text-xs font-bold shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 border"
              style={{
                backgroundColor: foreground,
                color: background,
                borderColor: background,
              }}
            >
              Action Button
            </button>

            {/* Custom outline button */}
            <button
              className="px-4 py-2 rounded-lg text-xs font-bold hover:bg-black/5 active:scale-95 transition-all flex items-center gap-1.5 border"
              style={{
                borderColor: foreground,
                color: foreground,
              }}
            >
              Secondary Option
            </button>
          </div>
        </div>

        {/* Component 3: Input Field Mockup */}
        <div className="space-y-1.5">
          <label className="block text-[9px] font-extrabold uppercase tracking-widest opacity-75">
            Sample input field state
          </label>
          <div className="max-w-md">
            <div
              className="rounded-lg p-2 flex items-center justify-between text-xs font-mono border"
              style={{ borderColor: foreground }}
            >
              <span className="opacity-70 font-sans">Enter text here...</span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm border" style={{ borderColor: foreground, color: foreground }}>
                Active focus
              </span>
            </div>
          </div>
        </div>

        {/* Component 4: Notice / Micro-block */}
        <div
          className="rounded-xl p-3.5 border text-xs leading-relaxed max-w-lg mt-auto bg-white/5 shadow-xs"
          style={{ borderColor: `${foreground}22` }}
        >
          <div className="flex items-center space-x-2 font-bold mb-1">
            <Sparkles className="w-4 h-4 opacity-80" />
            <span>Success Criterion 1.4.11 Note</span>
          </div>
          <span className="opacity-95">
            For UI components and graphical objects, a contrast ratio of at least{' '}
            <strong className="underline">3:1</strong> is mandatory against surrounding colors or border strokes.
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xxs text-slate-400 font-mono">
        <span>Preview is simulated client-side.</span>
        <span>Ratio check: {ratio} : 1</span>
      </div>
    </div>
  );
}
