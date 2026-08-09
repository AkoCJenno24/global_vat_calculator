import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Disclaimer: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 text-xs text-slate-600 space-y-2">
      <div className="flex items-center gap-2 font-bold text-slate-800 text-xs sm:text-sm">
        <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0" />
        Legal & Accuracy Disclaimer
      </div>
      <p className="leading-relaxed">
        <strong>Disclaimer:</strong> This calculator is provided for general informational and estimation purposes only. Tax rates and tax rules may change and can vary depending on location, transaction type, exemptions, and other circumstances. The results provided by this calculator should not be considered tax, accounting, or legal advice. Always verify the applicable tax rate and requirements with the relevant tax authority or a qualified tax professional before making business, financial, or tax-related decisions.
      </p>
      <p className="leading-relaxed text-slate-500">
        While we strive to keep the information accurate and up to date, we do not guarantee that the tax rates or calculations reflect the latest applicable laws or regulations.
      </p>
    </div>
  );
};
