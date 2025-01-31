export const convertPriceInCentsToPriceString = (
  priceInCents: number
): string => {
  if(!priceInCents){
    return "Valor indisponível";
  }

  const stringifiedPrice = priceInCents.toString();
  return (
    "R$ " +
    stringifiedPrice.slice(0, -2) +
    "," +
    stringifiedPrice.slice(-2, stringifiedPrice.length)
  );
};
