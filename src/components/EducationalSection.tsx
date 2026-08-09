import React from 'react';
import { BookOpen, Calculator, CheckCircle2, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { Country } from '../types';
import { formatCurrency } from '../utils/currency';

interface EducationalSectionProps {
  country: Country;
}

export const EducationalSection: React.FC<EducationalSectionProps> = ({ country }) => {
  const sampleNet = 1000;
  const sampleTax = Math.round((sampleNet * (country.taxRate / 100) + Number.EPSILON) * 100) / 100;
  const sampleGross = Math.round((sampleNet + sampleTax + Number.EPSILON) * 100) / 100;

  const fmtNet = formatCurrency(sampleNet, country.currencyCode, country.currencySymbol);
  const fmtTax = formatCurrency(sampleTax, country.currencyCode, country.currencySymbol);
  const fmtGross = formatCurrency(sampleGross, country.currencyCode, country.currencySymbol);

  const rateFactor = (1 + country.taxRate / 100).toFixed(2);

  return (
    <section id="how-it-works" className="w-full max-w-4xl mx-auto space-y-8 py-6">
      
      {/* Title & Introduction */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
          Educational Guide
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How {country.name} {country.taxName} Is Calculated
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          The standard {country.taxName} rate used in this calculator for {country.name} is{' '}
          <strong className="text-slate-900 font-bold">{country.taxRate}%</strong>. Learn how to add or remove tax step-by-step for invoicing and pricing.
        </p>
      </div>

      {/* Two Columns: Adding Tax vs Removing Tax */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Adding Tax */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Adding {country.taxName} (Tax-Exclusive Price)
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When you start with a net price (excluding tax) and need to find the final total price including {country.taxName}, use these simple formulas:
          </p>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 font-mono text-xs text-slate-800 space-y-1">
            <div className="font-bold text-emerald-700">{country.taxName} Amount = Net Amount × ({country.taxRate} ÷ 100)</div>
            <div className="font-bold text-slate-900">Total Amount = Net Amount + {country.taxName} Amount</div>
          </div>

          {/* Practical Example */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Practical Example ({country.name}):
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an item or service has a net price of <strong className="text-slate-900">{fmtNet}</strong> and the {country.taxName} rate is <strong className="text-slate-900">{country.taxRate}%</strong>:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc font-mono">
              <li>{fmtNet} × {country.taxRate}% = <strong className="text-emerald-600">{fmtTax}</strong> ({country.taxName})</li>
              <li>{fmtNet} + {fmtTax} = <strong className="text-slate-900">{fmtGross}</strong> (Total)</li>
            </ul>
          </div>
        </div>

        {/* Card 2: Removing Tax */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Removing {country.taxName} (Tax-Inclusive Price)
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            When you have a total price that already includes {country.taxName} and need to extract the original net price or tax portion:
          </p>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 font-mono text-xs text-slate-800 space-y-1">
            <div className="font-bold text-blue-700">Net Amount = Total Amount ÷ {rateFactor}</div>
            <div className="font-bold text-slate-900">{country.taxName} Amount = Total Amount - Net Amount</div>
          </div>

          {/* Practical Example */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Practical Example ({country.name}):
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If a store receipt shows a total of <strong className="text-slate-900">{fmtGross}</strong> including <strong className="text-slate-900">{country.taxRate}%</strong> {country.taxName}:
            </p>
            <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc font-mono">
              <li>{fmtGross} ÷ {rateFactor} = <strong className="text-slate-900">{fmtNet}</strong> (Original Net Price)</li>
              <li>{fmtGross} - {fmtNet} = <strong className="text-blue-600">{fmtTax}</strong> ({country.taxName})</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Key Terms Terminology Guide */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Understanding Key Pricing Terminology
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
          <div className="p-3 bg-white rounded-xl border border-slate-200/60">
            <strong className="block text-slate-900 font-bold mb-1">Tax-Exclusive Price (Net)</strong>
            The price of a product or service before any sales tax, VAT, or GST is added. Commonly used in B2B invoicing and wholesale trade.
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/60">
            <strong className="block text-slate-900 font-bold mb-1">Tax-Inclusive Price (Gross)</strong>
            The final price tag shown to consumers, which already includes the applicable sales tax or VAT percentage.
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/60">
            <strong className="block text-slate-900 font-bold mb-1">{country.taxName} Amount</strong>
            The exact monetary value paid strictly to the government tax authority for that specific transaction.
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/60">
            <strong className="block text-slate-900 font-bold mb-1">Standard vs. Reduced Tax Rates</strong>
            Most countries set a primary standard rate ({country.taxRate}% in {country.name}), but essential goods like food, books, or medical supplies may enjoy reduced or zero rates.
          </div>
        </div>

        {/* Specific Country Notes */}
        {country.notes && (
          <div className="p-4 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 space-y-1">
            <strong className="font-bold block text-amber-950">
              📌 Specific Country Note for {country.name}:
            </strong>
            <p className="leading-relaxed">{country.notes}</p>
            {country.taxAuthority && (
              <p className="text-[11px] text-amber-800 font-medium pt-1">
                Tax Authority: {country.taxAuthority}
              </p>
            )}
          </div>
        )}
      </div>

    </section>
  );
};
