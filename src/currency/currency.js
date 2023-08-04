
export const currencyTHB = (usd) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(usd)
}

export const formatCurrency = (amount, currencyCode) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};
