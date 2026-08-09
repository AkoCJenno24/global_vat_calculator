import React, { useEffect } from 'react';
import { VatCalculator } from '../components/VatCalculator';
import { EducationalSection } from '../components/EducationalSection';
import { FAQ } from '../components/FAQ';
import { Disclaimer } from '../components/Disclaimer';
import { AdBanner, AdResponsive } from '../components/AdBanner';
import { Country } from '../types';
import { DEFAULT_COUNTRY_CODE } from '../data/countries';

interface HomeProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export const Home: React.FC<HomeProps> = ({ selectedCountry, onSelectCountry }) => {
  // Update document title and dynamic meta description
  useEffect(() => {
    const isDefault = selectedCountry.code === DEFAULT_COUNTRY_CODE;
    const title = isDefault
      ? 'VAT Calculator – Add or Remove VAT Online (12% Philippines Default)'
      : `${selectedCountry.name} ${selectedCountry.taxName} Calculator – ${selectedCountry.taxRate}% ${selectedCountry.taxName}`;

    document.title = title;

    // Inject JSON-LD Structured Data
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: `Free online ${selectedCountry.taxName} calculator for ${selectedCountry.name}. Calculate ${selectedCountry.taxName}, add tax to prices, or extract VAT from tax-inclusive amounts automatically using standard ${selectedCountry.currencyCode} (${selectedCountry.currencySymbol}) currency rates.`,
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'json-ld-vat-calc';
    script.text = JSON.stringify(jsonLd);

    const existingScript = document.getElementById('json-ld-vat-calc');
    if (existingScript) {
      existingScript.remove();
    }
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById('json-ld-vat-calc');
      if (s) s.remove();
    };
  }, [selectedCountry]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-emerald-400 text-xs font-semibold shadow-xs">
          <span>{selectedCountry.flag}</span>
          <span>{selectedCountry.name} {selectedCountry.taxName} Calculator ({selectedCountry.taxRate}%)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Global VAT & Tax Calculator
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Fast, simple, and accurate online tax calculator for {selectedCountry.name} ({selectedCountry.currencySymbol}). Add tax to a net price or extract {selectedCountry.taxName} from a tax-inclusive total automatically.
        </p>
      </div>

      {/* Main Interactive Calculator Section */}
      <VatCalculator
        selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry}
      />

      {/* Ad Placement 1: Below main calculator */}
      <AdBanner slot="1234567890" label="Advertisement — Mid Page" />

      {/* Educational Guide Section */}
      <EducationalSection country={selectedCountry} />

      {/* Frequently Asked Questions */}
      <FAQ country={selectedCountry} />

      {/* Ad Placement 2: Responsive ad unit before disclaimer */}
      <AdResponsive slot="4567890123" label="Advertisement — Content End" />

      {/* Professional Legal Disclaimer */}
      <Disclaimer />

    </main>
  );
};
