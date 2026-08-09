import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { PageView } from '../types';

interface PageProps {
  onNavigate: (view: PageView) => void;
}

export const Terms: React.FC<PageProps> = ({ onNavigate }) => {
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
            <FileText className="h-4 w-4" /> Legal Document
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Terms of Use</h1>
          <p className="text-xs text-slate-400 mt-1">Last Updated: January 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700">
          <p>
            Welcome to Global VAT Calculator. By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of the website.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">1. Use of the Calculator</h2>
          <p>
            Global VAT Calculator provides online tax calculation tools free of charge for general estimation, educational, and personal convenience purposes.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">2. No Financial, Tax, or Legal Advice</h2>
          <p>
            The calculations, rates, and information provided on this website do NOT constitute official legal, accounting, tax, or financial advice. Tax laws, rates, and exemptions vary depending on local jurisdiction, product classification, and entity status. Always consult a qualified tax professional or local tax authority (such as the BIR, HMRC, or IRS) before executing formal business transactions.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">3. Accuracy & Warranty Disclaimer</h2>
          <p>
            This website and its tools are provided "AS IS" and "AS AVAILABLE" without warranty of any kind, express or implied. While we strive to maintain accurate, up-to-date tax rates, we do not guarantee the completeness, reliability, or timeliness of any rate or calculation.
          </p>

          <h2 className="text-base font-bold text-slate-900 pt-2">4. Limitation of Liability</h2>
          <p>
            In no event shall Global VAT Calculator or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from your reliance on or use of any calculation or information provided on this site.
          </p>
        </div>
      </div>
    </div>
  );
};
