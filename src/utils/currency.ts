/**
 * Currency formatting utility using native Intl.NumberFormat with intelligent fallbacks
 */

// Currencies that conventionally do not use decimal places
const ZERO_DECIMAL_CURRENCIES = new Set(['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'UGX', 'PYG', 'RWF', 'BIF']);

export function formatCurrency(
  amount: number,
  currencyCode: string,
  currencySymbol: string,
  forceDecimals?: number
): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currencyCode.toUpperCase());
  const fractionDigits = forceDecimals !== undefined ? forceDecimals : isZeroDecimal ? 0 : 2;

  try {
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(safeAmount);

    // If symbol starts with letters (e.g. "SAR", "RM", "AED", "CHF"), place space between symbol and number
    const isTextSymbol = /^[A-Z]{2,4}$/.test(currencySymbol) || currencySymbol.length > 2;

    if (isTextSymbol) {
      return `${currencySymbol} ${formattedNumber}`;
    }

    return `${currencySymbol}${formattedNumber}`;
  } catch {
    // Fallback if Intl fails
    const fixedStr = safeAmount.toFixed(fractionDigits);
    return `${currencySymbol}${fixedStr}`;
  }
}

export function formatNumberOnly(amount: number, forceDecimals?: number): string {
  const safeAmount = isNaN(amount) ? 0 : amount;
  const fractionDigits = forceDecimals !== undefined ? forceDecimals : 2;

  try {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(safeAmount);
  } catch {
    return safeAmount.toFixed(fractionDigits);
  }
}
