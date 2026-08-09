import React from 'react';
import { Calculator, Globe, HelpCircle, FileText, ShieldCheck } from 'lucide-react';
import { Country, PageView } from '../types';

interface HeaderProps {
  activeView: PageView;
  selectedCountry: Country;
  onNavigate: (view: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, selectedCountry, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="h-10 w-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold shadow-md group-hover:bg-slate-800 transition-colors">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-slate-900 tracking-tight block leading-tight">
              Global VAT Calculator
            </span>
            <span className="text-[11px] font-medium text-slate-500 block leading-none">
              Free Tax & Currency Tools
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeView === 'home'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Calculator
          </button>

          <a
            href="#how-it-works"
            onClick={(e) => {
              if (activeView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            How It Works
          </a>

          <a
            href="#faq"
            onClick={(e) => {
              if (activeView !== 'home') {
                e.preventDefault();
                onNavigate('home');
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            FAQ
          </a>

          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeView === 'privacy'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Privacy Policy
          </button>
        </nav>

        {/* Dynamic Country Badge */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold">
            <span>{selectedCountry.flag} {selectedCountry.name} {selectedCountry.taxRate}% {selectedCountry.taxName}</span>
          </div>

          {/* Mobile view quick switcher */}
          {activeView !== 'home' && (
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="md:hidden px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Back to Calculator
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
