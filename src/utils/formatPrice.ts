export function formatNPR(amount: number): string {
  return `NPR ${amount.toLocaleString('en-US')}`;
}

export function calculateDiscountPercent(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
