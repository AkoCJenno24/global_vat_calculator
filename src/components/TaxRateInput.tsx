import React from 'react';
import { Percent, RotateCcw } from 'lucide-react';
import { Country } from '../types';

interface TaxRateInputProps {
  country: Country;
  taxRate: number;
  isCustomRate: boolean;
  onTaxRateChange: (rate: number, isCustom: boolean) => void;
  onResetToDefault: () => void;
}

export const TaxRateInput: React.FC<TaxRateInputProps> = ({
  country,
  taxRate,
  isCustomRate,
  onTaxRateChange,
  onResetToDefault,
}) => {
  // Common rate presets
  const commonPresets = Array.from(
    new Set([0, ...(country.reducedRates || []), country.taxRate])
  ).sort((a, b) => a - b);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="tax-rate-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          {country.taxName} Rate (%)
        </label>

        {isCustomRate ? (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              Custom Rate
            </span>
            <button
              type="button"
              onClick={onResetToDefault}
              className="text-xs text-slate-500 hover:text-emerald-700 flex items-center gap-1 font-medium underline underline-offset-2 cursor-pointer"
              title={`Reset to standard ${country.taxName} rate (${country.taxRate}%)`}
            >
              <RotateCcw className="h-3 w-3" />
              Reset ({country.taxRate}%)
            </button>
          </div>
        ) : (
          <span className="text-xs text-slate-500">
            Standard: <strong className="text-slate-700">{country.taxRate}%</strong>
          </span>
        )}
      </div>

      <div className="relative">
        <input
          id="tax-rate-input"
          type="number"
          step="any"
          min="0"
          max="100"
          value={taxRate === 0 ? '0' : taxRate || ''}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            const newRate = isNaN(val) ? 0 : val;
            const isCustom = newRate !== country.taxRate;
            onTaxRateChange(newRate, isCustom);
          }}
          className={`w-full pl-3.5 pr-9 py-2.5 bg-white border rounded-xl text-base font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs transition-colors ${
            isCustomRate
              ? 'border-amber-400 bg-amber-50/20 text-amber-950'
              : 'border-slate-300 focus:border-emerald-500'
          }`}
          placeholder="0"
        />
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Percent className="h-4 w-4" />
        </div>
      </div>

      {/* Preset Rate Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-xs text-slate-400 font-medium mr-1">Quick select:</span>
        {commonPresets.map((preset) => {
          const isSelected = taxRate === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => {
                onTaxRateChange(preset, preset !== country.taxRate);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {preset}% {preset === country.taxRate ? '(Standard)' : preset === 0 ? '(Exempt)' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
};
