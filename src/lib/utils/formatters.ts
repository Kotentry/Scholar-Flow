export function formatNumber(value: number, options?: {
  decimals?: number;
  prefix?: string;
  suffix?: string;
}): string {
  const {
    decimals = 2,
    prefix = '',
    suffix = '',
  } = options || {};

  const formattedNumber = value.toLocaleString('en-GH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return `${prefix}${formattedNumber}${suffix}`;
}

export function formatPercentage(value: number, decimals = 2): string {
  return formatNumber(value, { decimals, suffix: '%' });
}

export function formatCurrency(value: number, decimals = 2): string {
  return formatNumber(value, { decimals, prefix: 'GHS ' });
}
