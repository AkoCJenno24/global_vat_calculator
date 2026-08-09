import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

interface PageProps {
  onNavigate: (view: PageView) => void;
}

export const Privacy: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Calculator
      </button>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <Shield className="h-4 w-4" /> Legal Document
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: January 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
          <p>
            At Global VAT Calculator, we respect your privacy. This Privacy Policy describes how we handle information when you visit and use our online tax calculation tools.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">1. No Personal Data Collection</h2>
          <p>
            Our application performs all VAT, GST, and tax calculations entirely within your web browser (client-side). We do not require account creation, registration, or submission of personal identifying information (PII) such as your name, email address, or phone number.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">2. Local Storage & URL Parameters</h2>
          <p>
            We may use standard browser mechanisms (such as URL search parameters or standard local storage) to retain your selected country and calculation preferences locally on your device for your convenience during your browsing session.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">3. Google AdSense & Cookies</h2>
          <p>
            We may partner with Google AdSense to serve ads on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites on the Internet.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
            <li>You may opt out of personalized advertising by visiting Google's Ads Settings page.</li>
          </ul>

          <h2 className="text-base font-bold text-slate-900 pt-2">4. Log Files & Analytics</h2>
          <p>
            Like most web servers, standard log files may automatically record anonymous technical metadata (such as IP addresses, browser type, referring pages, and access timestamps) for security monitoring and system performance troubleshooting.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">5. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Any changes will be reflected on this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  );
};
