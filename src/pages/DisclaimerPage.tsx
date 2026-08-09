import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';
import { Disclaimer } from '../components/Disclaimer';

interface PageProps {
  onNavigate: (view: PageView) => void;
}

export const DisclaimerPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <div className="inline-flex items-center gap-2 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="h-4 w-4" /> Legal Notice
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Official Disclaimer</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: January 2026</p>
        </div>

        <Disclaimer />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700 pt-4">
          <h2 className="text-base font-bold text-slate-900">Tax Rates as Reference Information</h2>
          <p>
            Tax rates configured in our central database are provided solely as standard baseline reference values. In real-world commerce, tax obligations are influenced by numerous dynamic factors, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Specific municipal, state, or regional surcharges (e.g., US local sales tax rates).</li>
            <li>Category-specific reduced rates (e.g., groceries, medical supplies, educational books).</li>
            <li>Zero-rating or exemption qualifications for export transactions or small business thresholds.</li>
            <li>Legislative policy updates enacted by local tax authorities.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
