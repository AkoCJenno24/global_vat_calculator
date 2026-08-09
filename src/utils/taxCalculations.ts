import { CalculationMode, CalculationResult, Country } from '../types';
import { formatCurrency } from './currency';

/**
 * Calculates VAT/GST or Sales tax amounts cleanly without floating-point precision errors.
 */
export function calculateTax(
  amount: number,
  taxRate: number,
  mode: CalculationMode,
  country: Country,
  isCustomRate: boolean = false
): CalculationResult {
  // Guard against invalid inputs
  const validAmount = isNaN(amount) || amount < 0 ? 0 : amount;
  const validRate = isNaN(taxRate) || taxRate < 0 ? 0 : taxRate;

  let netAmount = 0;
  let taxAmount = 0;
  let totalAmount = 0;

  if (mode === 'add') {
    // Input is Net Amount (Exclusive of tax)
    netAmount = validAmount;
    taxAmount = netAmount * (validRate / 100);
    totalAmount = netAmount + taxAmount;
  } else {
    // Input is Total Gross Amount (Inclusive of tax)
    totalAmount = validAmount;
    if (validRate > 0) {
      netAmount = totalAmount / (1 + validRate / 100);
      taxAmount = totalAmount - netAmount;
    } else {
      netAmount = totalAmount;
      taxAmount = 0;
    }
  }

  // Precision round numbers to 2 decimal places (or integer for non-decimal currencies like JPY)
  const isZeroDecimalCurrency = ['JPY', 'KRW', 'VND', 'IDR', 'CLP'].includes(country.currencyCode);
  const decimals = isZeroDecimalCurrency ? 0 : 2;
  const factor = Math.pow(10, decimals);

  const roundedNet = Math.round((netAmount + Number.EPSILON) * factor) / factor;
  const roundedTax = Math.round((taxAmount + Number.EPSILON) * factor) / factor;
  const roundedTotal = Math.round((totalAmount + Number.EPSILON) * factor) / factor;

  return {
    netAmount: roundedNet,
    taxAmount: roundedTax,
    totalAmount: roundedTotal,
    taxRate: validRate,
    isCustomRate,
    mode,
    country,
  };
}

/**
 * Formats a calculation result into a human-readable text string for copying to clipboard.
 */
export function formatCopyText(result: CalculationResult): string {
  const { country, netAmount, taxAmount, totalAmount, taxRate, mode } = result;
  const netStr = formatCurrency(netAmount, country.currencyCode, country.currencySymbol);
  const taxStr = formatCurrency(taxAmount, country.currencyCode, country.currencySymbol);
  const totalStr = formatCurrency(totalAmount, country.currencyCode, country.currencySymbol);

  const modeLabel = mode === 'add' ? 'Added' : 'Extracted';

  return `${country.name} ${country.taxName} Calculation (${modeLabel})
---------------------------------------
Net Amount (${country.taxName}-Exclusive): ${netStr}
${country.taxName} (${taxRate}%): ${taxStr}
Total Amount (${country.taxName}-Inclusive): ${totalStr}
---------------------------------------
Calculated with Global VAT Calculator (https://globalvatcalculator.com)`;
}
