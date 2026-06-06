/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ContrastHeader from './components/ContrastHeader';
import ContrastCalculator from './components/ContrastCalculator';
import ContrastPreview from './components/ContrastPreview';
import SmartSuggestions from './components/SmartSuggestions';
import EducationalInfo from './components/EducationalInfo';
import FAQModule from './components/FAQModule';
import AdSensePlaceholder from './components/AdSensePlaceholder';
import PolicyManager from './components/PolicyManager';
import { verifyContrast } from './utils/contrast';

export default function App() {
  const [foreground, setForeground] = useState('#6366F1');
  const [background, setBackground] = useState('#FFFFFF');

  const result = verifyContrast(foreground, background);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Dynamic Navigation and Brand header */}
      <ContrastHeader />

      {/* Main Workspace Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* AdSense Top Leaderboard Zone */}
        <AdSensePlaceholder slotId="top-leaderboard-banner" format="leaderboard" className="mb-2" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Inputs, Controls and Presets (left column) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 justify-between animate-fade-in">
            <ContrastCalculator
              foreground={foreground}
              background={background}
              onForegroundChange={setForeground}
              onBackgroundChange={setBackground}
              result={result}
            />
          </div>

          {/* Real-time Render Sandbox (right column) */}
          <div className="lg:col-span-7 flex flex-col">
            <ContrastPreview foreground={foreground} background={background} ratio={result.ratio} />
          </div>
        </div>

        {/* Smart Accessibility Assistant Recommendations (Full span) */}
        <SmartSuggestions
          foreground={foreground}
          background={background}
          onForegroundChange={setForeground}
          onBackgroundChange={setBackground}
        />

        {/* AdSense Content Native Inline Zone */}
        <AdSensePlaceholder slotId="native-mid-content" format="native-inline" />

        {/* Academic study of WCAG Contrast Principles & Math */}
        <EducationalInfo />

        {/* Interactive accordion FAQ section */}
        <FAQModule />
      </main>

      {/* Humble, clean footer */}
      <footer className="border-t border-slate-200/50 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
            WCAG 2.1 Accessibility Laboratory &copy; {new Date().getFullYear()} &bull; Professional Compliance Utility
          </p>
          
          {/* Legal Compliance and Cookie Management Center */}
          <PolicyManager />
        </div>
      </footer>
    </div>
  );
}
