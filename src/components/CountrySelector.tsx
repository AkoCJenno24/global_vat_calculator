import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, Globe, X } from 'lucide-react';
import { Country } from '../types';
import { COUNTRIES } from '../data/countries';

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onSelectCountry,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const regions = ['All', 'Asia-Pacific', 'Europe', 'Americas', 'Middle East & Africa'];

  // Filter countries based on query & region
  const filteredCountries = COUNTRIES.filter((c) => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.code.toLowerCase().includes(query) ||
      c.currencyCode.toLowerCase().includes(query) ||
      c.taxName.toLowerCase().includes(query);
    return matchesRegion && matchesQuery;
  });

  // Open modal & focus search input
  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery('');
    setFocusedIndex(0);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (country: Country) => {
    onSelectCountry(country);
    handleClose();
  };

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev < filteredCountries.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCountries[focusedIndex]) {
          handleSelect(filteredCountries[focusedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCountries, focusedIndex]);

  // Scroll focused item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [focusedIndex, isOpen]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full">
      <label htmlFor="country-selector-btn" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
        Select Country / Region
      </label>

      {/* Main Selector Button */}
      <button
        id="country-selector-btn"
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-3 bg-white hover:bg-slate-50/80 border border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 rounded-xl px-4 py-3 shadow-xs transition-all cursor-pointer text-left group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl leading-none select-none flex-shrink-0" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 truncate text-base">
                {selectedCountry.name}
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 font-mono">
                {selectedCountry.currencyCode}
              </span>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <span>Default {selectedCountry.taxName}: <strong className="font-semibold text-slate-700">{selectedCountry.taxRate}%</strong></span>
              <span>•</span>
              <span>Symbol: {selectedCountry.currencySymbol}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 flex-shrink-0">
          <span className="text-xs font-medium hidden sm:inline text-slate-500">Change</span>
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Country Selection Modal / Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Select Country"
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-slate-900">Select Country & Tax Rate</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-100 bg-white space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(0);
                  }}
                  placeholder="Search by country, currency (e.g. PHP), or tax..."
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Regional Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {regions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => {
                      setSelectedRegion(region);
                      setFocusedIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                      selectedRegion === region
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            {/* Countries List */}
            <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1 max-h-[50vh]">
              {filteredCountries.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-medium">No countries found for "{searchQuery}"</p>
                  <p className="text-xs">Try searching for a different country name or currency code.</p>
                </div>
              ) : (
                filteredCountries.map((country, idx) => {
                  const isSelected = country.code === selectedCountry.code;
                  const isFocused = idx === focusedIndex;

                  return (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleSelect(country)}
                      onMouseEnter={() => setFocusedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-950 font-medium'
                          : isFocused
                          ? 'bg-slate-100 text-slate-900'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl leading-none select-none flex-shrink-0" role="img" aria-label={country.name}>
                          {country.flag}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm truncate">{country.name}</span>
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                              {country.currencyCode}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">
                            {country.taxName}: <strong className="text-slate-700">{country.taxRate}%</strong> ({country.currencySymbol})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100/80 px-2 py-1 rounded-md">
                            <Check className="h-3.5 w-3.5" /> Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Modal Footer Helper */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredCountries.length} countries</span>
              <span className="hidden sm:inline">Use ↑ ↓ arrows to navigate, Enter to select</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
