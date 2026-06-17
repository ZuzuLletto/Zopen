export const formatZCoins = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const calculateSellPrice = (price: number): number => {
  return Math.floor(price * 0.8);
};
