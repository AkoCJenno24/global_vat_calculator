import React, { useState } from 'react';
import { Copy, Check, Share2, Calculator, Info } from 'lucide-react';
import { CalculationResult as ResultType } from '../types';
import { formatCurrency } from '../utils/currency';
import { formatCopyText } from '../utils/taxCalculations';

interface CalculationResultProps {
  result: ResultType;
}

export const CalculationResult: React.FC<CalculationResultProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const { country, netAmount, taxAmount, totalAmount, taxRate, mode, isCustomRate } = result;

  const handleCopy = async () => {
    const copyText = formatCopyText(result);
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = copyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Calculation Breakdown
              {isCustomRate && (
                <span className="text-[10px] uppercase font-semibold tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  Custom
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">
              {country.flag} {country.name} • {mode === 'add' ? 'Adding' : 'Extracting'} {country.taxName} ({taxRate}%)
            </p>
          </div>
        </div>

        {/* Mode Tag */}
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
          {mode === 'add' ? 'Exclusive + Tax' : 'Inclusive - Tax'}
        </span>
      </div>

      {/* Main Figures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Net Amount */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 transition-all">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            Net Amount ({country.taxName}-Exclusive)
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {formatCurrency(netAmount, country.currencyCode, country.currencySymbol)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {mode === 'add' ? 'Base price before tax' : 'Original price extracted'}
          </div>
        </div>

        {/* Tax Amount */}
        <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-500/30 transition-all">
          <div className="text-xs font-medium text-emerald-300/90 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{country.taxName} Amount</span>
            <span className="font-mono text-xs text-emerald-400 font-bold">{taxRate}%</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
            {formatCurrency(taxAmount, country.currencyCode, country.currencySymbol)}
          </div>
          <div className="text-[11px] text-emerald-300/70 mt-1">
            Calculated tax component
          </div>
        </div>

        {/* Total Amount */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 transition-all">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            Total Amount ({country.taxName}-Inclusive)
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
            {formatCurrency(totalAmount, country.currencyCode, country.currencySymbol)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Final amount paid
          </div>
        </div>
      </div>

      {/* Mathematical Formula Explanation Box */}
      <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
        <div className="flex items-center gap-1.5 text-slate-400 font-sans font-semibold mb-1">
          <Info className="h-4 w-4 text-emerald-400" />
          Formula Used:
        </div>
        {mode === 'add' ? (
          <>
            <div>1. {country.taxName} = {formatCurrency(netAmount, country.currencyCode, country.currencySymbol)} × {taxRate}% = {formatCurrency(taxAmount, country.currencyCode, country.currencySymbol)}</div>
            <div>2. Total = {formatCurrency(netAmount, country.currencyCode, country.currencySymbol)} + {formatCurrency(taxAmount, country.currencyCode, country.currencySymbol)} = {formatCurrency(totalAmount, country.currencyCode, country.currencySymbol)}</div>
          </>
        ) : (
          <>
            <div>1. Net Amount = {formatCurrency(totalAmount, country.currencyCode, country.currencySymbol)} ÷ (1 + {taxRate / 100}) = {formatCurrency(netAmount, country.currencyCode, country.currencySymbol)}</div>
            <div>2. {country.taxName} Amount = {formatCurrency(totalAmount, country.currencyCode, country.currencySymbol)} - {formatCurrency(netAmount, country.currencyCode, country.currencySymbol)} = {formatCurrency(taxAmount, country.currencyCode, country.currencySymbol)}</div>
          </>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-500 text-white shadow-md'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-900/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied to Clipboard!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Results
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
        >
          {linkCopied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              Link Copied!
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              Share Link
            </>
          )}
        </button>
      </div>
    </div>
  );
};
