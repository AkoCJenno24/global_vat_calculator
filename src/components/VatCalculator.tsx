import React, { useState, useEffect } from 'react';
import { RotateCcw, ArrowLeftRight, X, DollarSign, Calculator as CalcIcon } from 'lucide-react';
import { CalculationMode, Country } from '../types';
import { COUNTRIES, DEFAULT_COUNTRY_CODE, getCountryByCode } from '../data/countries';
import { calculateTax } from '../utils/taxCalculations';
import { CountrySelector } from './CountrySelector';
import { TaxRateInput } from './TaxRateInput';
import { CalculationResult } from './CalculationResult';

interface VatCalculatorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export const VatCalculator: React.FC<VatCalculatorProps> = ({
  selectedCountry,
  onSelectCountry,
}) => {
  const [mode, setMode] = useState<CalculationMode>(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('mode');
    return m === 'remove' ? 'remove' : 'add';
  });

  const [amountStr, setAmountStr] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const amt = params.get('amount');
    return amt || '1000';
  });

  const [taxRate, setTaxRate] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const rateParam = params.get('rate');
    if (rateParam !== null && !isNaN(parseFloat(rateParam))) {
      return parseFloat(rateParam);
    }
    return selectedCountry.taxRate;
  });

  const [isCustomRate, setIsCustomRate] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    const rateParam = params.get('rate');
    if (rateParam !== null && !isNaN(parseFloat(rateParam))) {
      return parseFloat(rateParam) !== selectedCountry.taxRate;
    }
    return false;
  });

  // Keep tax rate in sync when selectedCountry changes (unless custom rate is active)
  useEffect(() => {
    if (!isCustomRate) {
      setTaxRate(selectedCountry.taxRate);
    }
  }, [selectedCountry]);

  const handleSelectCountry = (country: Country) => {
    onSelectCountry(country);
    if (!isCustomRate) {
      setTaxRate(country.taxRate);
    }
  };

  const handleTaxRateChange = (newRate: number, isCustom: boolean) => {
    setTaxRate(newRate);
    setIsCustomRate(isCustom);
  };

  const handleResetToDefaultRate = () => {
    setTaxRate(selectedCountry.taxRate);
    setIsCustomRate(false);
  };

  const handleResetAll = () => {
    const defaultCountry = getCountryByCode(DEFAULT_COUNTRY_CODE);
    onSelectCountry(defaultCountry);
    setMode('add');
    setAmountStr('1000');
    setTaxRate(defaultCountry.taxRate);
    setIsCustomRate(false);
  };

  const handleSwapMode = () => {
    setMode((prev) => (prev === 'add' ? 'remove' : 'add'));
  };

  // Sync state to URL without reloading page
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('country', selectedCountry.code);
    params.set('mode', mode);
    if (amountStr) params.set('amount', amountStr);
    if (isCustomRate) params.set('rate', taxRate.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }, [selectedCountry, mode, amountStr, taxRate, isCustomRate]);

  // Compute live calculation
  const parsedAmount = parseFloat(amountStr) || 0;
  const calculation = calculateTax(parsedAmount, taxRate, mode, selectedCountry, isCustomRate);

  return (
    <section className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main Interactive Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200/80 space-y-6">
        
        {/* Country Selector */}
        <CountrySelector
          selectedCountry={selectedCountry}
          onSelectCountry={handleSelectCountry}
        />

        {/* Calculation Mode Toggle Tabs */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
            Calculation Mode
          </label>
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/60">
            <button
              type="button"
              onClick={() => setMode('add')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                mode === 'add'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>+ Add {selectedCountry.taxName}</span>
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline opacity-70">(Tax-Exclusive)</span>
            </button>

            <button
              type="button"
              onClick={() => setMode('remove')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                mode === 'remove'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>- Remove {selectedCountry.taxName}</span>
              <span className="text-[10px] uppercase tracking-wider hidden sm:inline opacity-70">(Tax-Inclusive)</span>
            </button>
          </div>
        </div>

        {/* Amount Input Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="amount-input" className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
              {mode === 'add' ? 'Net Amount (Price before tax)' : 'Gross Amount (Price including tax)'}
            </label>
            {amountStr && (
              <button
                type="button"
                onClick={() => setAmountStr('')}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="relative flex items-center">
            {/* Currency Symbol Badge */}
            <div className="absolute left-3.5 flex items-center justify-center min-w-[2.25rem] px-2 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-sm border border-slate-200/80 pointer-events-none select-none">
              {selectedCountry.currencySymbol}
            </div>

            <input
              id="amount-input"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*"
              value={amountStr}
              onChange={(e) => {
                const val = e.target.value;
                // Allow empty or valid number with optional single decimal point
                if (val === '' || /^\d*\.?\d*$/.test(val)) {
                  setAmountStr(val);
                }
              }}
              placeholder="0.00"
              className="w-full pl-16 pr-10 py-3.5 text-xl sm:text-2xl font-bold font-mono text-slate-900 bg-slate-50/50 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-inner transition-all"
            />

            {amountStr && (
              <button
                type="button"
                onClick={() => setAmountStr('')}
                className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
                aria-label="Clear amount input"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tax Rate Input Component */}
        <TaxRateInput
          country={selectedCountry}
          taxRate={taxRate}
          isCustomRate={isCustomRate}
          onTaxRateChange={handleTaxRateChange}
          onResetToDefault={handleResetToDefaultRate}
        />

        {/* Utility Quick Actions Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={handleSwapMode}
            className="flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            Switch to {mode === 'add' ? 'Remove VAT' : 'Add VAT'}
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            className="flex items-center gap-1.5 font-medium text-slate-500 hover:text-slate-700 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </button>
        </div>

      </div>

      {/* Live Calculation Result Component */}
      <CalculationResult result={calculation} />
    </section>
  );
};
