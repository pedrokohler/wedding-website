export const convertPriceInCentsToPriceString = (
  priceInCents: number
): string => {
  const stringifiedPrice = priceInCents.toString();
  return (
    "R$ " +
    stringifiedPrice.slice(0, -2) +
    "," +
    stringifiedPrice.slice(-2, stringifiedPrice.length)
  );
};
