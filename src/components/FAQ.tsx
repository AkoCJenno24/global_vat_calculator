import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { Country } from '../types';

interface FAQProps {
  country: Country;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: React.FC<FAQProps> = ({ country }) => {
  const [openId, setOpenId] = useState<string | null>('q1');
  const [searchQuery, setSearchQuery] = useState('');

  const rateDecimal = (country.taxRate / 100).toFixed(2);
  const factor = (1 + country.taxRate / 100).toFixed(2);
  const sample1000Tax = (1000 * (country.taxRate / 100)).toFixed(2);
  const sample1000Total = (1000 + parseFloat(sample1000Tax)).toFixed(2);

  const faqs: FAQItem[] = [
    {
      id: 'q1',
      question: `What is ${country.taxName} (${country.name})?`,
      answer:
        `${country.taxName} (${country.name}) is an indirect tax levied on goods and services. Standard rates in ${country.name} are set at ${country.taxRate}%, with tax collected at each stage of the supply chain or point of sale.`,
    },
    {
      id: 'q2',
      question: `How do I add ${country.taxName} to a price in ${country.name}?`,
      answer:
        `To add ${country.taxName} to a net price in ${country.name}, multiply the net amount by your country's tax rate (${country.taxRate}%), then add that tax amount to the original price. Formula: Total = Net Price × (1 + ${country.taxRate} / 100). For example, ${country.currencySymbol}1,000 × ${factor} = ${country.currencySymbol}${sample1000Total}.`,
    },
    {
      id: 'q3',
      question: `How do I remove ${country.taxName} from a tax-inclusive price?`,
      answer:
        `To extract ${country.taxName} from a tax-inclusive total, divide the gross total price by ${factor} (for ${country.taxRate}% ${country.taxName}). Formula: Net Amount = Total Price ÷ ${factor}. The ${country.taxName} amount is simply Total Price minus Net Amount.`,
    },
    {
      id: 'q4',
      question: `What is the ${country.taxName} rate in ${country.name}?`,
      answer: `The standard ${country.taxName} rate in ${country.name} is ${country.taxRate}%${country.taxAuthority ? `, administered by the ${country.taxAuthority}` : ''}. ${country.notes || 'Certain essential goods or services may be subject to reduced or zero tax rates.'}`,
    },
    {
      id: 'q5',
      question: 'Does every country use the same tax rate?',
      answer:
        'No. Over 170 countries use VAT or GST (Goods and Services Tax) with standard rates ranging from 5% to 27%. The United States uses state/local Sales Tax instead of a federal VAT. Our calculator includes built-in preset rates for top global economies.',
    },
    {
      id: 'q6',
      question: `Can I change or customize the ${country.taxName} rate in this calculator?`,
      answer:
        `Yes! While our calculator automatically loads the standard reference tax rate for ${country.name} (${country.taxRate}%), you can easily modify the percentage input field or select from common preset rate pills to match your custom invoice or exemption requirements.`,
    },
    {
      id: 'q7',
      question: 'Is this tax calculator accurate?',
      answer:
        'Yes. Our calculator uses mathematically exact floating-point rounding functions designed specifically for financial operations, supporting proper decimal precision for currencies worldwide. However, please note that local tax rules, special exemptions, or provincial surcharges may apply to your specific transaction.',
    },
    {
      id: 'q8',
      question: 'What is the difference between VAT, GST, and Sales Tax?',
      answer:
        'VAT (Value Added Tax) and GST (Goods and Services Tax) are practically identical multi-stage consumption taxes assessed at each production milestone. Sales Tax, by contrast, is a single-stage tax levied strictly at the final retail point of sale to the end consumer.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full max-w-4xl mx-auto space-y-6 py-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
          Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          VAT & Tax Calculation FAQ
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto">
          Get quick answers to common questions about calculating VAT, GST, and sales tax.
        </p>
      </div>

      {/* Optional Search inside FAQ */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter questions..."
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-2xs"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-6">
            No questions matching "{searchQuery}"
          </p>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </section>
  );
};
