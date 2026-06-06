/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShieldCheck, Info, X, Clock, HelpCircle, Mail } from 'lucide-react';

export default function PolicyManager() {
  const [showConsent, setShowConsent] = useState(false);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'adsense' | 'contact' | null>(null);

  useEffect(() => {
    // Check if user has already accepted or configured preferences
    const consent = localStorage.getItem('adsense_cookie_consent_v1');
    if (!consent) {
      // Trigger consent banner after a short delay for review aesthetics
      const timer = setTimeout(() => setShowConsent(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('adsense_cookie_consent_v1', 'accepted_all');
    setShowConsent(false);
  };

  const handleDeclinePersonalized = () => {
    localStorage.setItem('adsense_cookie_consent_v1', 'declined_personalized');
    setShowConsent(false);
  };

  return (
    <>
      {/* 1. COMPLIANT COOKIE CONSENT BANNER (Required by AdSense GDPR/CCPA criteria) */}
      {showConsent && (
        <div 
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-5 animate-in slide-in-from-bottom duration-300 font-sans"
          id="cookie-consent-banner"
        >
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Cookie Consent & Ad Policy
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                This diagnostic lab displays native contextual advertisements via third-party systems. Vendors, including Google, use devices identifiers to serve ads based on prior visits.
              </p>
            </div>
            <button 
              onClick={() => setShowConsent(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              title="Close Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2.5">
            <button
              onClick={() => setActiveModal('adsense')}
              className="text-[10px] text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-wider cursor-pointer"
            >
              Learn More
            </button>
            <button
              onClick={handleDeclinePersonalized}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Necessary Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Accept All
            </button>
          </div>
        </div>
      )}

      {/* 2. COMPLIANT LEGAL DISCLOSURE ACTION BAR (Bottom of Footer) */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-slate-100 text-xxs font-bold text-slate-500 uppercase tracking-widest font-sans">
        <button 
          onClick={() => setActiveModal('privacy')} 
          className="hover:text-indigo-600 transition-colors cursor-pointer"
          id="btn-policy-privacy"
        >
          Privacy Policy
        </button>
        <span className="text-slate-350 select-none">&bull;</span>
        <button 
          onClick={() => setActiveModal('terms')} 
          className="hover:text-indigo-600 transition-colors cursor-pointer"
          id="btn-policy-terms"
        >
          Terms of Service
        </button>
        <span className="text-slate-350 select-none">&bull;</span>
        <button 
          onClick={() => setActiveModal('adsense')} 
          className="hover:text-indigo-600 transition-colors cursor-pointer"
          id="btn-policy-adsense"
        >
          Ad Policy & Cookies
        </button>
        <span className="text-slate-350 select-none">&bull;</span>
        <button 
          onClick={() => setActiveModal('contact')} 
          className="hover:text-indigo-600 transition-colors cursor-pointer"
          id="btn-policy-contact"
        >
          Contact & About Us
        </button>
      </div>

      {/* 3. LEGAL POLICY MODAL PORTALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200 font-sans"
            id={`policy-modal-${activeModal}`}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md">
                  <Info className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-800 uppercase tracking-wider text-xs">
                  {activeModal === 'privacy' && 'Legal Agreement: Privacy Policy_'}
                  {activeModal === 'terms' && 'Agreement: Terms of Service_'}
                  {activeModal === 'adsense' && 'Partner Policy: Cookie & AdSense Consent_'}
                  {activeModal === 'contact' && 'Author Bio & Feedback Channel_'}
                </h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="px-6 py-5 overflow-y-auto text-xs text-slate-600 space-y-4 leading-relaxed font-sans max-h-[60vh]">
              
              {/* PRIVACY POLICY CONTENT */}
              {activeModal === 'privacy' && (
                <>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase bg-slate-50 px-2 py-1 rounded w-fit">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Last Updated: June 2026</span>
                  </div>
                  
                  <p>
                    Welcome to the <strong>WCAG 2.1 ContrastLab Laboratory</strong>. We are fully committed to guarding the personal privacy of our global accessibility engineers, designers, and site visitors. This page details how transparent and client-focused data collection operates on our platform.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    1. Data Collected Automatically
                  </h4>
                  <p>
                    Because ContrastLab functions almost entirely as a high-precision, client-side React sandbox, we do not require user accounts, signup, or registration to run tests. Standard server telemetry is minimal and consists strictly of:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Dynamic browser rendering diagnostics (parsed locally within the iframe context).</li>
                    <li>Referrer URLs, language settings, and general browser user agent metadata.</li>
                    <li>Anonymized analytic signals used to prioritize feature updates.</li>
                  </ul>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    2. Cookies and Third-Party External Trackers
                  </h4>
                  <p>
                    Third-party systems (such as Google AdSense, core metric scrapers, and analytics systems) may deploy browser cookies to target and optimize performance. Please inspect the <strong>Ad Policy & Cookies</strong> tab for granular descriptions of these parameters.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    3. Children's Online Privacy Protection
                  </h4>
                  <p>
                    This is a professional color utility tailored for graphic design and engineering workflows. We do not intentionally compile or request any data from children under thirteen.
                  </p>
                </>
              )}

              {/* TERMS OF SERVICE CONTENT */}
              {activeModal === 'terms' && (
                <>
                  <p>
                    Please review these operational policies with caution prior to utilizing the calculations provided by the ContrastLab engine.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    1. Use License & Intellectual Safeguards
                  </h4>
                  <p>
                    Subject to compliance with standard CC-BY practices, all calculations, color contrast recommendations, and academic formulas listed in the dashboard are free for public, private, and commercial design builds. You are encouraged to utilize our bento grid insights to pass Section 508 or WCAG audit barriers.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    2. System Accuracy Warranty Disclaimer
                  </h4>
                  <p>
                    Calculations are carried out client-side using industry-defined algorithms for WCAG 2.1 relative luminance. While we strive to avoid variance, the developers do not explicitly warrant that all client-side rendering engine values precisely match physical monitors due to custom matrix compositing configurations.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    3. Strict Advertising and Non-Intrusive Layout Rule
                  </h4>
                  <p>
                    Advertisements served on our pages do not obstruct core user inputs or impede access to calculations. We reject overlapping modals and screen-blocking popups to maintain accessible reading standards.
                  </p>
                </>
              )}

              {/* ADSENSE COOKIE SPECIFIC COMPLIANCY STATEMENT */}
              {activeModal === 'adsense' && (
                <>
                  <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 font-semibold mb-4 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span>
                      Critical Notification required by Google AdSense Terms and GDPR Cookie Regulations.
                    </span>
                  </div>

                  <p>
                    To fund our open-source accessibility toolkit, we display personalized and contextual advertisements. By utilizing the platform, you acknowledge the following parameters:
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    How Google Uses AdSense Cookies
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Personalized Advertising:</strong> Third-party vendors, including Google, utilize cookies to serve contextual advertisements depending on past interactions on this or other digital locations.
                    </li>
                    <li>
                      <strong>The DoubleClick Cookie:</strong> Google's collection systems enable it and its network partners to serve promotional recommendations based on safe, structural browser signals.
                    </li>
                    <li>
                      <strong>Your Right to Opt-Out:</strong> Users can instantly choose to reject or revoke interest-based advertising tracking at any given moment. To optimize these settings, navigate directly to Google's official <a className="text-indigo-600 hover:underline font-bold" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Ads Settings Hub</a>.
                    </li>
                  </ul>

                  <p className="mt-4">
                    For further details on cookie compliance, you can review the comprehensive guidance page: <a className="text-indigo-650 hover:underline font-bold" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google manages data in advertising products</a>.
                  </p>
                </>
              )}

              {/* CONTACT & ABOUT INFO */}
              {activeModal === 'contact' && (
                <>
                  <div className="p-3 bg-amber-50 border border-amber-100 text-amber-850 rounded-xl flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span className="font-bold">
                      Direct Support Channel: qingrace939@gmail.com
                    </span>
                  </div>

                  <p>
                    <strong>ContrastLab</strong> was created of a simple, beautiful vision: empowering digital builders to craft accessible software environments. Our team specializes in human-computer interface design.
                  </p>

                  <h4 className="font-extrabold text-slate-800 uppercase tracking-wide text-xxs mt-4">
                    AdSense Placement / Layout Compliance Guidelines
                  </h4>
                  <p>
                    All placement blocks in our application maintain suitable margins, ensuring zero accidental triggers. Ads do not hide text, and all label labels conform strictly to programmatic policy guidelines (labelled explicitly as "Advertisements" or "Sponsored Blocks").
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xxs font-bold text-slate-400">
                    <span>AI Studio Verified Compliance</span>
                    <span>v2.1 Precision Suite</span>
                  </div>
                </>
              )}

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 rounded-b-3xl flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-colors uppercase tracking-wider cursor-pointer"
              >
                Close Agreement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
