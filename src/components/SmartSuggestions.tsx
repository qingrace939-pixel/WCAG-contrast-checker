/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { suggestColors } from '../utils/contrast';
import { ColorSuggestion } from '../types';
import { Sparkles, ArrowRight, CornerDownRight } from 'lucide-react';

interface SmartSuggestionsProps {
  foreground: string;
  background: string;
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
}

export default function SmartSuggestions({
  foreground,
  background,
  onForegroundChange,
  onBackgroundChange,
}: SmartSuggestionsProps) {
  const suggestions = suggestColors(foreground, background);

  // Filter recommendations
  const fgAA = suggestions.find((s) => s.type === 'foreground' && s.passed === 'AA');
  const fgAAA = suggestions.find((s) => s.type === 'foreground' && s.passed === 'AAA');
  const bgAA = suggestions.find((s) => s.type === 'background' && s.passed === 'AA');
  const bgAAA = suggestions.find((s) => s.type === 'background' && s.passed === 'AAA');

  const handleApply = (suggestion: ColorSuggestion) => {
    if (suggestion.type === 'foreground') {
      onForegroundChange(suggestion.hex);
    } else {
      onBackgroundChange(suggestion.hex);
    }
  };

  const hasSuggestions = suggestions.length > 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6" id="smart-recommendations-panel">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-amber-50 text-indigo-600 rounded-lg">
          <Sparkles className="w-4 h-4 animate-spin text-amber-550" style={{ animationDuration: '8s' }} />
        </div>
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest leading-none">
            Smart Recommendations
          </h2>
          <p className="text-[10px] text-slate-500 font-sans mt-1">
            Instantly adjust contrast values to meet WCAG standards while keeping color hues cohesive.
          </p>
        </div>
      </div>

      {!hasSuggestions ? (
        <div className="text-xs text-emerald-700 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-center font-bold">
          Awesome! No modifications are needed. Your colors already meet top-tier contrast goals.
        </div>
      ) : (
        <div className="space-y-4 font-sans">
          {/* Section 1: Adjusting text colors */}
          {(fgAA || fgAAA) && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5 text-indigo-505" /> Adjust text foreground
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {fgAA && (
                  <button
                    onClick={() => handleApply(fgAA)}
                    className="group text-left p-3.5 border border-slate-100 rounded-2xl hover:border-indigo-400 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded tracking-wide">
                          AA COMPLIANT
                        </span>
                        <span className="text-xs font-extrabold text-indigo-600 font-mono">{fgAA.ratio.toFixed(1)}:1</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-5 h-5 rounded-full border border-slate-200" style={{ backgroundColor: foreground }} />
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <div className="w-5 h-5 rounded-full border border-slate-200" style={{ backgroundColor: fgAA.hex }} />
                        <span className="text-xs font-bold text-slate-700 font-mono">{fgAA.hex}</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2.5 block group-hover:text-indigo-600 font-bold transition-colors">
                      CLICK TO APPLY &rarr;
                    </span>
                  </button>
                )}

                {fgAAA && (
                  <button
                    onClick={() => handleApply(fgAAA)}
                    className="group text-left p-3.5 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded tracking-wide">
                          AAA TARGET
                        </span>
                        <span className="text-xs font-extrabold text-emerald-600 font-mono">{fgAAA.ratio.toFixed(1)}:1</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-5 h-5 rounded-full border border-slate-300" style={{ backgroundColor: foreground }} />
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <div className="w-5 h-5 rounded-full border border-slate-300" style={{ backgroundColor: fgAAA.hex }} />
                        <span className="text-xs font-bold text-slate-700 font-mono">{fgAAA.hex}</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2.5 block group-hover:text-emerald-600 font-bold transition-colors">
                      CLICK TO APPLY &rarr;
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Section 2: Adjusting background colors */}
          {(bgAA || bgAAA) && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                <CornerDownRight className="w-3.5 h-3.5 text-emerald-505" /> Adjust background color
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bgAA && (
                  <button
                    onClick={() => handleApply(bgAA)}
                    className="group text-left p-3.5 border border-slate-100 rounded-2xl hover:border-indigo-400 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded tracking-wide">
                          AA COMPLIANT
                        </span>
                        <span className="text-xs font-extrabold text-indigo-600 font-mono">{bgAA.ratio.toFixed(1)}:1</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-5 h-5 rounded-full border border-slate-350" style={{ backgroundColor: background }} />
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <div className="w-5 h-5 rounded-full border border-slate-350" style={{ backgroundColor: bgAA.hex }} />
                        <span className="text-xs font-bold text-slate-700 font-mono">{bgAA.hex}</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2.5 block group-hover:text-indigo-600 font-bold transition-colors">
                      CLICK TO APPLY &rarr;
                    </span>
                  </button>
                )}

                {bgAAA && (
                  <button
                    onClick={() => handleApply(bgAAA)}
                    className="group text-left p-3.5 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:bg-slate-50 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded tracking-wide">
                          AAA TARGET
                        </span>
                        <span className="text-xs font-extrabold text-emerald-600 font-mono">{bgAAA.ratio.toFixed(1)}:1</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="w-5 h-5 rounded-full border border-slate-350" style={{ backgroundColor: background }} />
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <div className="w-5 h-5 rounded-full border border-slate-350" style={{ backgroundColor: bgAAA.hex }} />
                        <span className="text-xs font-bold text-slate-700 font-mono">{bgAAA.hex}</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-2.5 block group-hover:text-emerald-600 font-bold transition-colors">
                      CLICK TO APPLY &rarr;
                    </span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
