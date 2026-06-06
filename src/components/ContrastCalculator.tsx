/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ContrastResult } from '../types';
import { Check, X, Sliders, Palette, RefreshCw } from 'lucide-react';

interface ContrastCalculatorProps {
  foreground: string;
  background: string;
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
  result: ContrastResult;
}

const PRESET_PALETTES = [
  { fg: '#1E293B', bg: '#F8FAFC', name: 'Slate on White' },
  { fg: '#0F172A', bg: '#F1F5F9', name: 'Navy on Silver' },
  { fg: '#6366F1', bg: '#FFFFFF', name: 'Indigo on White' },
  { fg: '#10B981', bg: '#064E3B', name: 'Green on Forest' },
  { fg: '#F59E0B', bg: '#1E1B4B', name: 'Amber on Navy' },
  { fg: '#F43F5E', bg: '#FFF1F2', name: 'Rose on Pink' },
  { fg: '#FFFFFF', bg: '#111827', name: 'White on Slate' },
  { fg: '#D1D5DB', bg: '#374151', name: 'Gray on Charcoal' },
];

export default function ContrastCalculator({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
  result,
}: ContrastCalculatorProps) {
  const [fgInput, setFgInput] = useState(foreground);
  const [bgInput, setBgInput] = useState(background);

  useEffect(() => {
    setFgInput(foreground);
  }, [foreground]);

  useEffect(() => {
    setBgInput(background);
  }, [background]);

  const handleFgHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFgInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
      onForegroundChange(val);
    }
  };

  const handleBgHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBgInput(val);
    if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
      onBackgroundChange(val);
    }
  };

  const swapColors = () => {
    onForegroundChange(background);
    onBackgroundChange(foreground);
  };

  const scoreColor = (ratio: number) => {
    if (ratio >= 7.0) return { text: 'AAA EXCELLENT', color: 'text-emerald-700 bg-emerald-100 border-emerald-200' };
    if (ratio >= 4.5) return { text: 'AA COMPLIANT', color: 'text-indigo-700 bg-indigo-100 border-indigo-200' };
    if (ratio >= 3.0) return { text: 'LARGE TEXT ONLY', color: 'text-amber-700 bg-amber-100 border-amber-200' };
    return { text: 'FAIL / LOW CONTRAST', color: 'text-rose-700 bg-rose-100 border-rose-200' };
  };

  const currentScore = scoreColor(result.ratio);
  const gaugePercent = Math.min(100, Math.max(0, ((result.ratio - 1) / 20) * 100));

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col h-full gap-6" id="contrast-calculator-panel">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-slate-800 uppercase tracking-widest text-xs flex items-center gap-2">
          <Sliders className="w-4 h-4 text-slate-505" />
          Color Configuration
        </h2>
        <button
          onClick={swapColors}
          className="text-indigo-600 text-xs font-semibold hover:text-indigo-800 transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Swap Colors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Foreground (Text) */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
          <label htmlFor="fg-color" className="block text-xs font-bold text-slate-500 mb-2 uppercase">
            Foreground (Text)
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg border shadow-inner overflow-hidden cursor-pointer">
              <input
                type="color"
                value={foreground}
                onChange={(e) => onForegroundChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full transition-transform hover:scale-105" style={{ backgroundColor: foreground }} />
            </div>
            <input
              id="fg-color"
              type="text"
              value={fgInput}
              onChange={handleFgHexChange}
              placeholder="#000000"
              maxLength={7}
              className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-mono flex-grow focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Background */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col">
          <label htmlFor="bg-color" className="block text-xs font-bold text-slate-500 mb-2 uppercase">
            Background
          </label>
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg border shadow-inner overflow-hidden cursor-pointer">
              <input
                type="color"
                value={background}
                onChange={(e) => onBackgroundChange(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full h-full transition-transform hover:scale-105" style={{ backgroundColor: background }} />
            </div>
            <input
              id="bg-color"
              type="text"
              value={bgInput}
              onChange={handleBgHexChange}
              placeholder="#FFFFFF"
              maxLength={7}
              className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm font-mono flex-grow focus:outline-hidden focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Hero Bento Gauge - Contrast Ratio Stat */}
      <div className="flex-grow flex flex-col items-center justify-center border-y border-dashed border-slate-200 py-6 my-1 bg-slate-50/50 rounded-2xl">
        <div className="text-5xl font-black text-slate-900 font-sans tracking-tight">
          {result.ratio.toFixed(2)}
          <span className="text-2xl font-semibold text-slate-400 font-sans ml-0.5">:1</span>
        </div>
        <div className={`mt-2.5 px-3 py-1 rounded-full text-xs font-bold border ${currentScore.color}`}>
          {currentScore.text}
        </div>

        {/* Level Indicator bar */}
        <div className="w-4/5 max-w-xs mt-4">
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-350 ${
                result.ratio >= 7.0
                  ? 'bg-emerald-500'
                  : result.ratio >= 4.5
                  ? 'bg-indigo-500'
                  : result.ratio >= 3.0
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${gaugePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* WCAG Compliance Checks in clean, low-profile list */}
      <div className="space-y-2.5">
        <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">
          Standard Compliance Matrix
        </h3>

        {[
          { label: 'Normal Text (AA)', pass: result.normalTextAA, threshold: 'Min 4.5:1' },
          { label: 'Large Text (AA)', pass: result.largeTextAA, threshold: 'Min 3.0:1' },
          { label: 'Normal Text (AAA)', pass: result.normalTextAAA, threshold: 'Min 7.0:1' },
          { label: 'Large Text (AAA)', pass: result.largeTextAAA, threshold: 'Min 4.5:1' },
          { label: 'Graphical UI & Icons (AA)', pass: result.nonTextAA, threshold: 'Min 3.0:1' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {item.pass ? (
                <div className="p-1 bg-emerald-50 text-emerald-600 rounded-md">
                  <Check className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1 bg-rose-50 text-rose-500 rounded-md">
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="text-xs font-bold text-slate-700">{item.label}</span>
            </div>
            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">
              {item.threshold}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Select Preset Swatches */}
      <div className="pt-3 border-t border-slate-100">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
          <Palette className="w-3 h-3" /> Quick Access Contrast Palettes
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PRESET_PALETTES.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                onForegroundChange(preset.fg);
                onBackgroundChange(preset.bg);
              }}
              className="text-left border border-slate-250/60 rounded-xl p-1.5 hover:border-indigo-400 hover:bg-slate-50 transition-all font-sans cursor-pointer group"
              title={preset.name}
            >
              <div className="h-4 rounded-md flex overflow-hidden border border-slate-200">
                <div className="w-1/2" style={{ backgroundColor: preset.fg }} />
                <div className="w-1/2" style={{ backgroundColor: preset.bg }} />
              </div>
              <span className="text-[9px] text-slate-500 font-bold truncate block mt-1 tracking-tight group-hover:text-indigo-600">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
