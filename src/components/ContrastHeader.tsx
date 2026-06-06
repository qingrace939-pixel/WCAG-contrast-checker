/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Sparkles, LayoutGrid } from 'lucide-react';

export default function ContrastHeader() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <LayoutGrid className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
              ContrastLab <span className="text-indigo-600 font-medium text-lg ml-1">WCAG 2.1 Audit Tool</span>
            </h1>
          </div>
          <p className="text-slate-500 text-xs mt-1.5 font-sans">
            Precision Accessibility Testing Suite & Bento Grid Audit Center
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-250 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>AA COMPLIANT</span>
          </div>
          <div className="bg-slate-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AAA TARGET</span>
          </div>
        </div>
      </div>
    </header>
  );
}

