import React, { useState, useEffect } from 'react';
import { PageView, Country } from './types';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { Footer } from './components/Footer';
import { DEFAULT_COUNTRY_CODE, getCountryByCode } from './data/countries';

export default function App() {
  const [activeView, setActiveView] = useState<PageView>('home');
  const [selectedCountry, setSelectedCountry] = useState<Country>(() => {
    const params = new URLSearchParams(window.location.search);
    const countryCode = params.get('country') || DEFAULT_COUNTRY_CODE;
    return getCountryByCode(countryCode);
  });

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* Header Bar */}
      <Header
        activeView={activeView}
        selectedCountry={selectedCountry}
        onNavigate={setActiveView}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {activeView === 'home' && (
          <Home
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
        )}
        {activeView === 'privacy' && <Privacy onNavigate={setActiveView} />}
        {activeView === 'terms' && <Terms onNavigate={setActiveView} />}
        {activeView === 'disclaimer' && <DisclaimerPage onNavigate={setActiveView} />}
      </div>

      {/* Professional Footer */}
      <Footer onNavigate={setActiveView} />
    </div>
  );
}
