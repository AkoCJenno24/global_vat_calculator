import React from 'react';
import { ADSENSE_CLIENT_ID } from '../config/ads';

interface AdProps {
  slot?: string;
  className?: string;
  label?: string;
}

export const AdBanner: React.FC<AdProps> = ({ slot = "1234567890", className = "", label = "Advertisement" }) => {
  if (ADSENSE_CLIENT_ID) {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden min-h-[90px] w-full ${className}`}>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{label}</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '90px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center min-h-[100px] w-full transition-colors ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</span>
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500/70"></span>
        AdSense Placement Reserved (Leaderboard Banner)
      </div>
      <p className="text-[11px] text-slate-400 mt-1 max-w-md">
        Configure <code className="bg-slate-200/80 px-1 py-0.5 rounded text-slate-600 font-mono text-[10px]">ADSENSE_CLIENT_ID</code> to enable live monetization.
      </p>
    </div>
  );
};

export const AdRectangle: React.FC<AdProps> = ({ slot = "3456789012", className = "", label = "Advertisement" }) => {
  if (ADSENSE_CLIENT_ID) {
    return (
      <div className={`my-6 flex flex-col items-center justify-center overflow-hidden min-h-[250px] w-full max-w-[300px] mx-auto ${className}`}>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{label}</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: '300px', height: '250px' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
        />
      </div>
    );
  }

  return (
    <div className={`my-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-6 text-center min-h-[220px] max-w-sm mx-auto w-full ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</span>
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span className="inline-block h-2 w-2 rounded-full bg-blue-500/70"></span>
        AdSense Rectangle Placement (300 x 250)
      </div>
      <p className="text-[11px] text-slate-400 mt-2">
        Non-intrusive placement optimized for content sidebars & dividers.
      </p>
    </div>
  );
};

export const AdResponsive: React.FC<AdProps> = ({ slot = "4567890123", className = "", label = "Advertisement" }) => {
  if (ADSENSE_CLIENT_ID) {
    return (
      <div className={`my-8 flex flex-col items-center justify-center overflow-hidden min-h-[120px] w-full ${className}`}>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">{label}</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className={`my-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center min-h-[110px] w-full ${className}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</span>
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
        <span className="inline-block h-2 w-2 rounded-full bg-indigo-500/70"></span>
        Responsive Ad Unit
      </div>
      <p className="text-[11px] text-slate-400 mt-1 max-w-lg">
        Automatically adapts to mobile screen widths without causing Cumulative Layout Shift (CLS).
      </p>
    </div>
  );
};
