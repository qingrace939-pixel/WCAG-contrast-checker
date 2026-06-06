/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info } from 'lucide-react';

interface AdSensePlaceholderProps {
  slotId: string;
  format: 'leaderboard' | 'rectangle' | 'native-inline';
  className?: string;
}

export default function AdSensePlaceholder({ slotId, format, className = '' }: AdSensePlaceholderProps) {
  const getFormatStyles = () => {
    switch (format) {
      case 'leaderboard':
        return {
          dimensions: 'min-h-[90px] w-full',
          label: 'Responsive Leaderboard Banner (728 × 90 recommended)',
          aspect: 'py-4 px-6 md:py-6',
        };
      case 'rectangle':
        return {
          dimensions: 'min-h-[250px] w-full',
          label: 'Medium Rectangle Ad Zone (300 × 250 ideal for side rails)',
          aspect: 'p-6',
        };
      case 'native-inline':
        return {
          dimensions: 'min-h-[120px] w-full',
          label: 'Native Content Recommendation Block (Asymmetrical responsive fluid)',
          aspect: 'p-5',
        };
    }
  };

  const info = getFormatStyles();

  return (
    <div
      className={`bg-slate-50 border border-dashed border-slate-250 rounded-2xl flex flex-col justify-center items-center relative text-center group ${info.dimensions} ${info.aspect} ${className}`}
      id={`adsense-slot-${slotId}`}
    >
      {/* Top right tag */}
      <span className="absolute top-2 right-3 text-[8px] font-extrabold uppercase tracking-widest text-slate-400 select-none bg-slate-100/80 px-1.5 py-0.5 rounded leading-none">
        AdSense Slot
      </span>

      <div className="flex flex-col items-center justify-center max-w-md pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center mb-2.5">
          <span className="text-[10px] font-black text-slate-400 font-mono">Ad</span>
        </div>
        <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest">
          {info.label}
        </p>
        <p className="text-[9px] text-slate-400 font-mono mt-1">
          [Slot ID: {slotId}] &bull; placeholder ready for google_ad_client script
        </p>
      </div>

      {/* Disclosures & Regulatory policies */}
      <div className="absolute bottom-2 left-3 flex items-center space-x-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <Info className="w-3 h-3 text-slate-400" />
        <span className="text-[8px] text-slate-400 font-sans uppercase font-bold tracking-wider">
          Sponsored / Interest-Based Ads Policy
        </span>
      </div>
    </div>
  );
}
