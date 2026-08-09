export type CalculationMode = 'add' | 'remove';

export interface Country {
  code: string;
  name: string;
  taxName: string; // VAT, GST, Sales Tax, MwSt, TVA, etc.
  taxRate: number; // Standard rate as percentage (e.g. 12)
  currencyCode: string; // PHP, USD, EUR, etc.
  currencySymbol: string; // ₱, $, £, €, etc.
  flag: string; // Emoji or code
  region: 'Asia-Pacific' | 'Europe' | 'Americas' | 'Middle East & Africa';
  notes?: string;
  reducedRates?: number[];
  taxAuthority?: string;
}

export interface CalculationResult {
  netAmount: number;
  taxAmount: number;
  totalAmount: number;
  taxRate: number;
  isCustomRate: boolean;
  mode: CalculationMode;
  country: Country;
}

export type PageView = 'home' | 'privacy' | 'terms' | 'disclaimer';
